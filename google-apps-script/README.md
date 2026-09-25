# Recurso descargable — guía paso a paso (sin experiencia previa)

Esto arma un mini "panel de control" para elegir cuál de hasta 3 PDF se ofrece en el sitio, usando una planilla de Google con casillas de verificación. Tildás una casilla y el sitio cambia solo, sin tocar código.

## Paso 1 — Crear la planilla

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una planilla en blanco.
2. Ponele un nombre, por ejemplo "HR Strategy Partners — Recurso descargable".
3. Vas a tener 2 hojas (las pestañas de abajo, donde dice "Hoja 1"). Renombrá "Hoja 1" a `Recursos`, y creá una segunda hoja (botón `+` abajo a la izquierda) llamada `Leads`.

## Paso 2 — Armar la hoja "Recursos"

En la hoja `Recursos`, en la fila 1, escribí estos encabezados (una palabra por columna, de A a F):

```
id	activo	titulo	descripcion	drive_file_id	boton
```

Debajo, una fila por cada PDF que quieran ofrecer (hasta 3):

```
calculadora-gastos		Aprendé a organizarte con la calculadora de gastos	Descargá la planilla que usamos para ordenar los costos de contratación.		Descargar gratis
checklist-onboarding		Checklist de onboarding	Los pasos para sumar a alguien nuevo sin que se pierda nada.		Descargar gratis
guia-liderazgo		Guía de liderazgo para managers nuevos	Cómo pasar de "hacer" a "liderar" en los primeros 90 días.		Descargar gratis
```

(Dejá la columna `activo` y `drive_file_id` vacías por ahora, las llenamos en los pasos siguientes.)

### Convertir la columna "activo" en casillas de verificación

1. Seleccioná las celdas de la columna `activo`, filas 2 a 4 (las 3 filas de recursos).
2. Menú **Insertar → Casilla de verificación**.
3. Ahora cada fila tiene un ☐ tildable en vez de texto.
4. Tildá **una sola** para arrancar (la que quieran mostrar primero) — más adelante el script se encarga de que solo una quede tildada a la vez, no hace falta destildar las otras a mano.

## Paso 3 — Subir los PDF a Drive y completar `drive_file_id`

Por cada PDF:

1. Subilo a una carpeta de [Google Drive](https://drive.google.com).
2. Click derecho sobre el archivo → **Compartir** → cambiar a **"Cualquier persona con el enlace"** → rol **Lector**.
3. Click derecho → **Obtener enlace**, vas a ver algo como:
   `https://drive.google.com/file/d/1AbC2dEfGhIjKlmNoPqRsTuVwXyZ/view`
4. Copiá solo la parte del medio (`1AbC2dEfGhIjKlmNoPqRsTuVwXyZ`) y pegala en la columna `drive_file_id` de la fila que corresponde en "Recursos".

Para actualizar el PDF más adelante sin romper el link: click derecho sobre el archivo en Drive → **Administrar versiones** → **Subir nueva versión**. Nunca crear un archivo nuevo para reemplazar uno viejo, porque cambia el ID y hay que volver a pegarlo en la planilla.

## Paso 4 — Crear el Apps Script

1. Desde la misma planilla: menú **Extensiones → Apps Script**. Se abre una pestaña nueva.
2. Va a haber un archivo `Code.gs` con contenido de ejemplo — borralo todo.
3. Abrí el archivo `lead-magnet.gs` de esta carpeta del proyecto, copiá **todo** su contenido, y pegalo en `Code.gs`.
4. Arriba del todo del script vas a ver `const SHEET_ID = 'PEGAR_ID_DEL_GOOGLE_SHEET_ACA';`. Reemplazá eso por el ID de tu planilla: lo sacás de la URL de la planilla, la parte larga entre `/d/` y `/edit`:
   `https://docs.google.com/spreadsheets/d/ESTE-ES-EL-ID/edit`
5. Arriba a la izquierda, dale nombre al proyecto (ej. "Lead Magnet HR Strategy Partners") y guardalo (ícono de disquete o Ctrl+S).

### Activar que el checkbox sea único (una sola tildada a la vez)

1. En el editor de Apps Script, en el menú de la izquierda hacé click en el ícono de reloj (**Activadores** / *Triggers*).
2. **+ Agregar activador** (botón azul abajo a la derecha).
3. Configurar así:
   - Función a ejecutar: `onEditRecursos`
   - Fuente del evento: **Desde la hoja de cálculo**
   - Tipo de evento: **Al editar**
4. Guardar. La primera vez va a pedir que autorices permisos — aceptar con tu cuenta de Google.

Listo — a partir de ahora, tildar una casilla en la columna `activo` destilda automáticamente las otras dos.

## Paso 5 — Publicar el script como aplicación web

1. En el editor de Apps Script, arriba a la derecha: **Implementar → Nueva implementación**.
2. Click en el engranaje al lado de "Seleccionar tipo" → **Aplicación web**.
3. "Ejecutar como": vos (tu cuenta).
4. "Quién tiene acceso": **Cualquier usuario**.
5. **Implementar**. Va a pedir autorizar permisos otra vez la primera vez — aceptar.
6. Te da una URL que termina en `/exec`. Copiala completa.

## Paso 6 — Conectar con el sitio

Pasame esa URL y la pego en `src/components/RecursoDescargable.astro`, en la constante `APPS_SCRIPT_URL`. Mientras esa constante esté vacía, o mientras no haya ninguna casilla tildada en "Recursos", la sección completa queda oculta en el sitio — no se ve rota ni vacía.

## Cómo se usa después de configurado

- **Cambiar cuál PDF se ofrece:** tildar la casilla de la fila que querés mostrar. Automático, sin tocar código.
- **Agregar un cuarto recurso:** agregar una fila más en "Recursos" con los mismos datos (id, título, descripción, drive_file_id) — la casilla de "activo" para esa fila nueva hay que agregarla igual que en el Paso 2 (Insertar → Casilla de verificación, solo esa celda).
- **Ver quién descargó qué:** la hoja "Leads" se llena sola, en tiempo real, con fecha, nombre, email, teléfono (si lo dejó) y qué recurso pidió.

## Actualización: se agregó el campo de teléfono

Si ya tenías esto andando antes de este cambio, hay que hacer 2 cosas:

1. En la hoja "Leads", agregá una columna `Telefono` entre `Email` y `Recurso` (para que el orden coincida con lo que graba el script).
2. En el editor de Apps Script, reemplazá todo el contenido de `Code.gs` por el `lead-magnet.gs` actualizado de esta carpeta, y volvé a hacer **Implementar → Administrar implementaciones → editar (lápiz) → Nueva versión → Implementar** (Paso 4/5 de más arriba). La URL no cambia.

## Actualización: la imagen del recurso también se puede cambiar

Por defecto la sección muestra un ícono genérico. Si quieren poner una imagen propia (foto, portada del PDF, ilustración):

1. En la hoja "Recursos", agregá una columna más: `imagen_drive_id`.
2. Subí la imagen a Drive (mismo proceso que el PDF): click derecho → Compartir → **"Cualquier persona con el enlace"** → **Lector**.
3. Copiá el ID desde la URL (`.../file/d/ESTE-ES-EL-ID/view`) y pegalo en `imagen_drive_id`, en la fila del recurso correspondiente.
4. Si esa columna queda vacía para un recurso, se muestra el ícono genérico — no rompe nada.

Repetí el mismo paso de "Nueva versión" del código si todavía no actualizaste el script con este cambio (ver arriba).
- **Si el código del script cambia** (no las filas, el código en sí): hay que ir a Implementar → Administrar implementaciones → editar (ícono de lápiz) → Versión → Nueva versión → Implementar, para que el cambio llegue a la URL ya publicada.
