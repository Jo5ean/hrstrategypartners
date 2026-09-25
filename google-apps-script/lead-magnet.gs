// Google Apps Script — recurso descargable con formulario de contacto.
//
// doGet   → devuelve título/descripción/botón del recurso activo (lee la hoja "Recursos").
// doPost  → recibe nombre+email, guarda el lead en "Leads", devuelve el link de descarga
//           del archivo de Drive correspondiente al recurso activo.
// onEdit  → hace que la casilla "activo" sea excluyente: tildar una destilda las otras.
//
// Ver google-apps-script/README.md para los pasos de instalación y despliegue.

const SHEET_ID = 'PEGAR_ID_DEL_GOOGLE_SHEET_ACA';
const LEADS_SHEET_NAME = 'Leads';
const RECURSOS_SHEET_NAME = 'Recursos';
const COL_ACTIVO = 'activo'; // nombre de la columna con las casillas

// --- Lectura del recurso activo ------------------------------------------

// Columnas esperadas en la hoja "Recursos" (fila 1 = encabezados):
// id | activo | titulo | descripcion | drive_file_id | boton | imagen_drive_id
function getRecursoActivo_() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(RECURSOS_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0].map((h) => h.toString().trim().toLowerCase());
  const col = (name) => headers.indexOf(name);

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row[col(COL_ACTIVO)] === true) {
      const imagenColIndex = col('imagen_drive_id');
      const imagenDriveId = imagenColIndex >= 0 ? String(row[imagenColIndex] || '').trim() : '';

      return {
        id: String(row[col('id')] || '').trim(),
        titulo: String(row[col('titulo')] || '').trim(),
        descripcion: String(row[col('descripcion')] || '').trim(),
        driveFileId: String(row[col('drive_file_id')] || '').trim(),
        boton: String(row[col('boton')] || 'Descargar gratis').trim(),
        imagenUrl: imagenDriveId ? 'https://lh3.googleusercontent.com/d/' + imagenDriveId : ''
      };
    }
  }
  return null;
}

function jsonOutput_(obj) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(obj));
  return output;
}

function doGet(e) {
  try {
    const recurso = getRecursoActivo_();
    if (!recurso) return jsonOutput_({ ok: false, error: 'No hay ningún recurso activo en la hoja Recursos.' });
    return jsonOutput_({ ok: true, recurso: recurso });
  } catch (err) {
    return jsonOutput_({ ok: false, error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const nombre = (data.nombre || '').toString().trim();
    const email = (data.email || '').toString().trim();
    const telefono = (data.telefono || '').toString().trim();

    const nombreValido = nombre.length >= 2 && /[a-zA-ZÀ-ÿ]/.test(nombre);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const telefonoValido = telefono === '' || /^[+]?[\d\s()-]{6,20}$/.test(telefono);

    if (!nombreValido || !emailValido || !telefonoValido) {
      return jsonOutput_({ ok: false, error: 'Datos inválidos: revisá nombre, email y teléfono.' });
    }

    const recurso = getRecursoActivo_();
    if (!recurso || !recurso.driveFileId) {
      return jsonOutput_({ ok: false, error: 'No hay ningún recurso activo para descargar.' });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(LEADS_SHEET_NAME);
    sheet.appendRow([new Date(), nombre, email, telefono, recurso.id]);

    const file = DriveApp.getFileById(recurso.driveFileId);
    const url = 'https://drive.google.com/uc?export=download&id=' + recurso.driveFileId;

    return jsonOutput_({ ok: true, url: url, filename: file.getName() });
  } catch (err) {
    return jsonOutput_({ ok: false, error: err.message });
  }
}

// --- Casilla "activo" excluyente (tildar una destilda las demás) --------
//
// Este es un trigger instalable: hay que activarlo una vez a mano
// (ver paso 4 del README). No hace falta llamarlo, se ejecuta solo
// cada vez que alguien edita la hoja.
function onEditRecursos(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== RECURSOS_SHEET_NAME) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map((h) => h.toString().trim().toLowerCase());
  const colActivo = headers.indexOf(COL_ACTIVO) + 1;
  if (colActivo === 0) return;

  const editedCol = e.range.getColumn();
  const editedRow = e.range.getRow();
  if (editedCol !== colActivo || editedRow === 1) return;
  if (e.value !== 'TRUE') return; // solo actuamos cuando se tilda, no cuando se destilda

  const lastRow = sheet.getLastRow();
  for (let r = 2; r <= lastRow; r++) {
    if (r !== editedRow) sheet.getRange(r, colActivo).setValue(false);
  }
}
