# Texto generado con IA: detección y escritura

**Tomo 3 · señales medidas, criterio de edición y método · julio 2026**

*Tercer companion de la serie. El tomo 1 cubrió sitios y landings; el tomo 2, paneles de administración. Este cubre el texto: cómo se detecta, por qué falla la detección automática, y cómo se escribe (con o sin IA) para que el resultado no sea promedio.*

---

## Nota sobre fuentes y rigor (leer primero)

Buena noticia metodológica: **este es el dominio con mejor evidencia de los tres.** Para diseño existe un estudio de 1.590 páginas; para texto existe uno de **más de 15 millones de abstracts**, publicado en *Science Advances*, con datos y código abiertos. Los niveles:

1. **Evidencia dura.** Kobak, González-Márquez, Horvát y Lause, *Delving into LLM-assisted writing in biomedical publications through excess vocabulary* (Science Advances, julio 2025; preprint arXiv 2406.07016). Método elegante: adaptaron el concepto de **exceso de mortalidad** de la pandemia al vocabulario. Extrapolaron las frecuencias de palabras pre-ChatGPT (2021–2022) a 2024 y midieron el exceso. Sin necesidad de un corpus etiquetado de textos humanos vs. generados, que es justamente lo que arruina a los detectores. Resultado: **al menos el 13,5% de los abstracts de 2024 fueron procesados con LLM**, con subcorpus llegando al 40%; identificaron unas 900 palabras en exceso; y el impacto sobre la escritura científica superó al de eventos como la pandemia. Datos y listas completas publicados en GitHub (berenslab/llm-excess-vocab). Sobre detectores: Liang et al. (Stanford, 2023), siete detectores contra 91 ensayos TOEFL escritos por humanos no nativos, **61,22% de falsos positivos**; 18 de 91 marcados unánimemente por los siete; 89 de 91 marcados por al menos uno.

2. **Consenso profesional / catálogo comunitario.** *Wikipedia:Signs of AI writing*, mantenida por el WikiProject AI Cleanup: unas 15.000 palabras que catalogan patrones observados sobre miles de casos reales de texto generado. Es el inventario público más completo que existe, y su propia advertencia es ejemplar (la cito en la sección 5). Más las políticas de spam y las Search Quality Rater Guidelines de Google, que definen el marco comercial.

3. **Criterio profesional (mío, marcado).** Todo el capítulo de español rioplatense —que es donde la literatura en inglés no te sirve—, los pesos de las señales, el protocolo de edición y las recomendaciones de método.

La regla transversal, otra vez, y acá con respaldo explícito de las fuentes: **ninguna señal aislada prueba nada.** La página de Wikipedia lo dice de entrada: no es una prohibición de palabras ni de puntuación, nadie te va a quitar los em-dashes, y no todo texto con estos indicadores es generado —los modelos se entrenaron sobre escritura humana, incluida la de los propios editores—. Es un catálogo de patrones frecuentes, para leer en conjunto, nunca como disparador único.

---

## 1. Por qué el texto delata más que el diseño

En el tomo 1 vimos que la convergencia visual es medible. En texto el fenómeno es más fuerte por una razón estructural: **el lenguaje tiene distribuciones estadísticas mucho más densas que el diseño.** Un modelo predice el token más probable dado el contexto; sobre millones de tokens, esa preferencia se vuelve una firma. Por eso el método de Kobak funciona: no hace falta detectar nada, alcanza con mirar el corpus agregado y ver qué palabras se dispararon de golpe después de noviembre de 2022.

Dos consecuencias prácticas. Primera: **a nivel agregado la detección es sólida** (miles de textos: la estadística no miente). Segunda: **a nivel individual es mala**, y esa asimetría es la que casi nadie entiende. Podés afirmar con confianza que el 13,5% de un corpus pasó por un LLM y no poder decir cuál de dos textos concretos lo hizo. Todo el capítulo 5 sale de ahí.

Y una tercera, más incómoda: el texto generado ya no es raro, es **ambiente**. En una revista científica seria, uno de cada siete resúmenes. Lo que significa que "esto parece escrito con IA" dejó de ser una acusación útil, y lo que importa pasó a ser otra cosa: si el texto dice algo específico y verdadero, o si es relleno fluido.

---

## 2. Señales léxicas: qué palabras y por qué

### 2.1 El hallazgo de Kobak

Lo importante del estudio no es la lista de palabras: es **qué tipo de palabras** se dispararon. Antes de los LLM, los cambios de vocabulario en la literatura biomédica eran de **sustantivos de contenido** (nombres de virus, técnicas, enfermedades: "SARS-CoV-2", "pandemia"). Después de ChatGPT, el exceso se concentró en **palabras de estilo**: verbos y adjetivos que no aportan contenido, solo tono. Ese giro —de contenido a estilo— es la firma real, y es mucho más robusta que cualquier término individual.

Los ejemplos canónicos del paper en inglés: *delve*, *underscore*, *showcasing*, *pivotal*, *intricate*, *realm*, *meticulous*, *commendable*, *noteworthy*, *comprehensive*, *crucial*, *garnered*, *align*, *encompass*.

### 2.2 El equivalente en español (criterio mío, verificable a ojo)

Acá la literatura no te sirve: el estudio es sobre inglés. Esta lista la armé por observación, y es doblemente útil porque en un texto en español estas palabras suelen ser además **calcos de traducción**, o sea que delatan dos veces.

**Verbos de estilo:** profundizar (en el sentido de *delve*), subrayar/destacar como muletilla, aprovechar (*leverage*), impulsar, potenciar, elevar, optimizar, desbloquear (*unlock*), abarcar, garantizar, transformar, revolucionar, empoderar.

**Adjetivos inflados:** robusto, integral, holístico, innovador, vanguardista, de vanguardia, clave, fundamental, crucial, meticuloso, exhaustivo, versátil, dinámico, sólido, escalable (fuera de contexto técnico), sin fisuras / sin costuras (*seamless*).

**Sustantivos de relleno:** panorama (*landscape*), ámbito/reino (*realm*), ecosistema, sinergia, viaje/travesía (*journey*), tapiz, testimonio (en el sentido de *a testament to*), pilar, hito, universo, mundo (como "el mundo del marketing digital").

**Conectores y muletillas de bisagra:** "en la era digital", "en el panorama actual", "en un mundo cada vez más...", "no solo... sino también", "es importante destacar que", "cabe mencionar que", "en resumen", "en definitiva", "en última instancia", "vale la pena señalar".

**Aperturas y cierres:** "En el vertiginoso mundo de X...", "Ya sea que seas... o...", "En conclusión, X no es solo Y, sino Z", "El futuro de X está aquí".

### 2.3 El matiz que importa más que la lista

**Estas listas caducan, y rápido.** *Delve* está prácticamente muerto como señal: se volvió tan famoso que los modelos aprendieron a evitarlo y los usuarios a borrarlo. Lo mismo va a pasar con cada palabra que se popularice como tell. Por eso el hallazgo estructural de Kobak (contenido → estilo) vale más que cualquier vocabulario: **lo que no caduca es la preferencia por palabras que suenan bien y no dicen nada.**

Corolario para tu criterio: el peso de una palabra suelta es **bajo**. El peso de un texto donde la mitad de los adjetivos son inflados y ninguno es concreto es **alto**.

---

## 3. Señales sintácticas y estructurales

Acá está lo que más delata, y lo que menos caduca, porque son patrones de composición y no palabras que se puedan buscar y reemplazar. Todas las que marco como catálogo vienen de *Signs of AI writing*; los pesos son míos.

### 3.1 Sintaxis

| Señal | Cómo se ve | Peso |
|---|---|---|
| **Paralelismo negativo** | "No es solo X, es Y". "No solo... sino también...". "No se trata de X; se trata de Y". El catálogo de Wikipedia lo describe como uno de los más característicos: el modelo escribe como si estuviera corrigiendo una idea incompleta del lector, generando contraste donde no hacía falta | Alto |
| **Regla de tres compulsiva** | "Rápido, simple y seguro". "Profesionales, expertos y creativos". Funciona en oratoria; como estructura por defecto de cada frase, es muletilla | Alto |
| **"Desde X hasta Y"** | "Desde la planificación estratégica hasta el soporte de implementación": suena abarcador, no comunica nada material | Medio-alto |
| **Participio final que explica la importancia** | "...consolidando su posición en el mercado", "...marcando un hito en la industria", "...reflejando su influencia duradera". Cierres que le dicen al lector qué debe concluir | Alto |
| **Uniformidad de longitud de oración** | Todas las frases entre 15 y 25 palabras, ritmo parejo. La escritura humana varía mucho más (frases de tres palabras al lado de una de cuarenta) | Medio-alto |
| **Simetría de párrafo** | Todos los párrafos de tres a cuatro oraciones, todas las secciones del mismo largo | Medio-alto |
| **Editorializaciones de importancia** | "Es importante destacar que", "cabe señalar que", "no se puede subestimar" | Medio |

### 3.2 Estructura del texto

| Señal | Por qué delata | Peso |
|---|---|---|
| **Estructura formulaica rígida** | Intro → tres secciones simétricas → "Desafíos" → "Perspectivas futuras" → conclusión que resume lo dicho. El catálogo señala explícitamente las secciones tipo "Challenges" y "Future prospects" como firma | Alto |
| **Conclusión que repite el cuerpo** | Recapitula lo que el lector acaba de leer, como si no lo hubiera retenido tres párrafos. No agrega nada | Alto |
| **Bullets everywhere** | Todo listado, nada en prosa continua; y bullets que son oraciones completas con negrita al principio de cada uno | Medio-alto |
| **Negritas de énfasis dispersas** | Palabras en negrita sin criterio de jerarquía, para simular escaneabilidad | Medio |
| **Titulación paralela mecánica** | Todos los H2 con la misma construcción sintáctica ("Cómo hacer X", "Cómo hacer Y", "Cómo hacer Z") | Medio |
| **Densidad informativa plana** | Cada párrafo aporta lo mismo; no hay picos, no hay una idea que valga más que otra. El equivalente textual del "mismo padding en todas las secciones" del tomo 1 | Alto |
| **Simetría falsa de argumentos** | Toda idea viene con su contra-idea del mismo tamaño; nunca hay una posición asumida | Medio-alto |

### 3.3 Contenido y evidencia (la capa más importante)

Esta es la capa que más pesa y la que menos se mira, porque exige leer con conocimiento del tema y no solo mirar el estilo.

| Señal | Por qué delata | Peso |
|---|---|---|
| **Atribución vaga** | "Los expertos señalan", "estudios recientes demuestran", "según los especialistas", sin nombre, sin institución, sin fecha. El modelo inventa autoridad cuando no tiene fuente | Alto |
| **Fuentes inventadas o mal citadas** | Papers que no existen, DOIs rotos, autores reales con títulos falsos, citas atribuidas a quien no las dijo. Es el problema más grave y el más caro | Alto |
| **Especificidad decorativa** | Cifras exactas que no llevan a ninguna fuente ("el 73% de las empresas..."), fechas redondas, porcentajes que suenan | Alto |
| **Vaguedad total** | Mucho volumen y cero información accionable; el texto podría aplicarse a cualquier empresa del rubro sin cambiar una palabra | Alto |
| **Ausencia de experiencia de primera mano** | Ningún detalle que solo sepa quien estuvo ahí: nombres, errores concretos, números propios, anécdotas | Alto |
| **Equilibrio artificial** | Nunca se moja: todo tiene ventajas y desventajas, todo "depende del contexto" | Medio-alto |
| **Alucinaciones de contexto local** | En textos argentinos: normativa mal citada, organismos con nombres inexistentes, tratamientos fiscales genéricos aplicados a monotributo. Peligrosísimo en contenido de cliente | Alto |
| **Anacronismos y desactualización** | Datos con corte de entrenamiento presentados como actuales; "actualmente" seguido de algo de hace dos años | Medio-alto |

### 3.4 Formato y tipografía del texto

| Señal | Estado real | Peso |
|---|---|---|
| **Em-dashes (—) en exceso** | El catálogo es claro: los humanos profesionales los usan, pero el output LLM los usa **más seguido y en lugares donde un humano pondría coma, paréntesis o dos puntos**. En español además son menos habituales que en inglés, así que su abundancia en un texto en castellano pesa un poco más | Medio (nunca solo) |
| **Comillas curvas y caracteres tipográficamente "perfectos"** en texto informal | Indicio débil; mucha gente los usa bien y siempre los usó | Bajo |
| **Emojis decorativos en encabezados** (🚀 ✨ 💡) | Firma de output de chat pegado sin editar | Medio |
| **Markdown filtrado** | Asteriscos sin renderizar, `###` en un CMS, listas con `-` en un campo de texto plano | Alto (delata copy-paste crudo) |
| **Frases de asistente sobrevivientes** | "Claro, acá tenés...", "Espero que esto te sirva", "Como modelo de lenguaje...", "[Insertá tu nombre acá]" | Alto (flagrante) |

---

## 4. Señales específicas del español rioplatense

Criterio mío, y la parte más útil para tu trabajo porque ninguna fuente en inglés la cubre. En un texto argentino, estas señales pesan más que cualquier em-dash.

| Señal | Por qué delata | Peso |
|---|---|---|
| **Mezcla de voseo y tuteo** | "Registrate y luego tú podrás..." Nadie con oído nativo revisó el texto completo. Es la señal más confiable del dominio | Alto |
| **Español neutro de doblaje** | "Tomar una decisión inteligente", "obtén acceso", "descubre cómo"; el registro pan-hispánico que no habla nadie | Alto |
| **Ausencia de ¿ y ¡ de apertura** | Generación o traducción desde inglés sin revisar | Alto |
| **Title Case En Los Títulos** | No existe en español; delata plantilla o traducción | Alto |
| **Calcos sintácticos del inglés** | "Es por eso que", "en orden de", "hacer sentido", "aplicar para" (un puesto), "remover" por quitar, "asumir" por suponer | Alto |
| **Gerundio de posterioridad** | "Se lanzó en 2020, siendo adquirida en 2023": construcción incorrecta y frecuentísima en traducción automática | Medio-alto |
| **Formato numérico y de fecha en inglés** | 1,000.50 en vez de 1.000,50; MM/DD/YYYY; "$" sin aclarar moneda en un contexto donde importa | Alto |
| **Vocabulario regional ausente o equivocado** | "Coche" en vez de auto, "ordenador", "móvil", "zumo"; o el reverso: neutro donde el cliente usa jerga del rubro (remito, monotributo, CUIT, factura A) | Alto |
| **Localización a medias** | Cuerpo en español y navegación/CTAs en inglés; o precios en dólares para un negocio local | Medio-alto |

---

## 5. Por qué los detectores automáticos no sirven como prueba

Esta sección es corta y contundente porque el dato es contundente.

**El estudio de Stanford (Liang et al., 2023):** siete detectores comerciales evaluaron 91 ensayos TOEFL escritos por humanos no nativos, sin ninguna asistencia de IA. **El 61,22% fue marcado como generado por IA.** Los siete detectores coincidieron erróneamente en 18 de los 91; al menos uno marcó 89 de 91. Sobre escritura de nativos, los mismos detectores casi no se equivocaban.

**Por qué pasa, y por qué no se arregla fácil:** los detectores miden esencialmente **perplejidad** —qué tan predecible es el texto—. La escritura de un no nativo cuidadoso es más predecible: vocabulario más acotado, estructuras más simples, menos giros idiomáticos. Es decir, el método confunde "escrito con cuidado en una segunda lengua" con "escrito por una máquina". El sesgo no es un bug incidental: es consecuencia directa de cómo funciona la medición.

**Qué significa para vos, concretamente.** Sos hispanohablante escribiendo textos técnicos, a veces en inglés. **Estadísticamente, tus textos genuinos tienen alta probabilidad de ser marcados como IA por estas herramientas.** Si un cliente te manda una captura de un detector con 80% de "IA" sobre un texto que escribiste vos, ahora tenés la respuesta: el estudio de Stanford, el número 61,22%, y el hecho de que varias universidades (Vanderbilt, entre otras) desactivaron estas herramientas justamente por eso. Los propios proveedores admiten que sus scores no deben usarse como prueba única.

**El uso legítimo:** triage. Si vas a revisar cien textos de proveedores, un detector te ordena la cola de revisión. Nunca un veredicto, nunca una acusación, nunca una decisión de pago o de nota. La evaluación real es leer el texto contra las señales de la sección 3.3: ¿las fuentes existen? ¿los datos son verificables? ¿hay algo acá que solo sepa alguien que trabajó el tema?

---

## 6. El marco comercial: qué penaliza Google (y qué no)

Importante para tu trabajo con clientes, porque circula mucha mitología.

**Google no penaliza el contenido por ser generado con IA.** La posición oficial es explícita y no cambió: se evalúa la calidad del contenido, no el método de producción. Lo que sí está tipificado como spam es el **scaled content abuse**: producir muchas páginas de poco valor principalmente para manipular rankings, **"sin importar cómo se creó"** — el mismo criterio para contenido humano y generado.

Las Search Quality Rater Guidelines reorganizaron esto: se eliminó la vieja sección de "contenido autogenerado" y en su lugar aparecieron **scaled content abuse** (mucho contenido con poco esfuerzo u originalidad, sin edición ni curaduría manual, con la IA generativa mencionada como una de las herramientas típicas) y una sección **catch-all para contenido principal creado con poco esfuerzo, poca originalidad y poco valor agregado**, orientada al parafraseo de baja calidad. El criterio que atraviesa todo es E-E-A-T: experiencia, expertise, autoridad, confianza.

Los reportes de la industria sobre las actualizaciones de 2026 apuntan todos en la misma dirección (tomalos como orden de magnitud, son análisis de terceros, no datos de Google): sitios que publicaron cientos o miles de artículos generados sin edición reportaron caídas de tráfico del 40–90%, mientras que operaciones de decenas de artículos con edición humana real reportaron subas. **La variable no fue la IA: fue el control de calidad.**

La traducción comercial para tus propuestas: no vendas "contenido escrito por humanos" como diferencial —es inverificable y además no es lo que Google mide—. Vendé **originalidad, expertise verificable y edición**: datos propios, casos concretos del cliente, autoría real con credenciales, revisión experta obligatoria en temas sensibles (salud, finanzas, legales, que es donde las guidelines son más duras). Eso sí es defendible y es lo que efectivamente diferencia.

---

## 7. Los dos umbrales: cuándo importa y cuándo no

Antes de las recomendaciones, el criterio que ordena todo lo demás. No todo texto merece el mismo esfuerzo de edición, y pretender lo contrario es la receta para no hacer ninguno bien.

**Texto de alto riesgo (edición completa, obligatoria):** cualquier cosa publicada con tu nombre o el de un cliente; contenido de dominio donde el error tiene costo (legal, fiscal, médico, técnico); propuestas comerciales; documentación que otros van a ejecutar; copy de un sitio. Acá el texto es tu reputación y la de tu cliente.

**Texto de bajo riesgo (asistencia sin ceremonia):** mensajes internos, borradores para vos mismo, resúmenes de reuniones, primeras versiones que vas a reescribir igual, código y sus comentarios, traducciones que vas a revisar. Acá la IA es una máquina de escribir más rápida y punto.

**El error caro es confundirlos en cualquier dirección:** publicar el borrador crudo (lo primero), o gastar cuarenta minutos puliendo un mensaje de Slack (lo segundo).

---

## 8. Recomendaciones: cómo escribir (con o sin IA)

Esta es la parte que pediste. La organizo por orden de retorno: lo primero mueve más la aguja que lo último.

### 8.1 El principio que ordena todo

**El problema nunca fue el em-dash. El problema es escribir sin tener nada específico que decir.** Todas las señales de las secciones 2 y 3 son síntomas de una sola cosa: texto producido para llenar un espacio en vez de para transmitir algo que alguien sabe. Un texto humano vacío tiene exactamente los mismos síntomas — y hay muchísimo texto humano vacío.

De ahí se deriva la única prueba que importa, y que te recomiendo aplicar antes que cualquier checklist: **¿qué hay en este texto que solo podría escribir alguien que estuvo ahí?** Un número propio, un error que cometiste, el nombre exacto de la herramienta que falló, cuánto tardó, cuánto costó, qué dijo el cliente. Si la respuesta es "nada", ninguna edición de estilo lo va a salvar. Y si la respuesta es sólida, el texto sobrevive incluso con tres em-dashes.

### 8.2 Antes de escribir: la materia prima

**Cargá contexto real, no pidas contenido.** La diferencia entre un borrador utilizable y slop se decide antes del primer prompt. Dale al modelo tus notas, la transcripción de la reunión, los números reales, el brief del cliente, tres textos tuyos anteriores como referencia de voz. Un modelo con materia prima específica produce texto específico; sin ella, produce el promedio del corpus, que es exactamente lo que este documento describe.

**Definí la voz explícitamente, y con ejemplos.** "Escribí en español rioplatense con voseo, registro profesional pero directo, frases cortas, sin adjetivos inflados, sin regla de tres, sin cerrar con resúmenes" funciona mucho mejor que "escribí bien". Mejor todavía: pegá dos párrafos tuyos y pedí que siga ese registro. Es el equivalente textual del `DESIGN.md` con tokens del tomo 1: **las decisiones se toman una vez y se escriben como regla.** Un `VOICE.md` en tus proyectos te ahorra la misma discusión cien veces.

**Prohibiciones explícitas en el prompt.** Las que más rinden, por experiencia: nada de "no es X, es Y"; nada de tríadas; nada de conclusión que resuma; nada de "en el mundo actual"; nada de adjetivos sin dato al lado; nada de atribución vaga (si no hay fuente con nombre, no se afirma).

### 8.3 Mientras escribís: la división correcta del trabajo

El reparto 70/30 del tomo 1, aplicado a texto:

**La IA sirve bien para:** estructurar (dame cinco maneras de organizar este material); desbloquear (escribí un primer párrafo malo para que yo tenga qué corregir); resumir material propio; traducir borradores; adaptar un texto a otro formato o extensión; hacer de sparring (¿qué le falta a este argumento? ¿qué objetaría un escéptico?); y **criticar tu borrador**, que es probablemente su mejor uso y el menos usado.

**Vos mandás en:** la tesis (qué querés decir y por qué a alguien le importaría); los ejemplos y datos concretos, que salen de tu experiencia y no del modelo; la estructura final; el ritmo; las decisiones de qué omitir —lo que un modelo casi nunca hace bien es cortar—; y todo lo verificable.

**Una advertencia de método:** pedirle a un modelo que "humanice" un texto suele empeorar las cosas. Agrega coloquialismos artificiales, muletillas forzadas y errores decorativos. La alternativa que funciona es reescribir vos los pasajes flojos, o rehacer el borrador con mejor materia prima.

### 8.4 La edición: el protocolo de siete pasadas

Rápido de aplicar (diez a veinte minutos para un texto medio) y ordenado por impacto. Numerado porque es secuencia real.

1. **Pasada de sustancia.** ¿Qué afirma este texto que sea específico y no obvio? Marcá cada párrafo como *aporta* o *rellena*. Borrá los de relleno sin piedad; suele irse el 20–30% del texto y siempre mejora.

2. **Pasada de verificación.** Cada dato, cita, fuente, cifra y nombre propio: verificado o afuera. Sin excepciones. Es la pasada más importante y la que más tiempo lleva, porque es la única cuyo error tiene consecuencias reales.

3. **Pasada de estructura.** ¿Los párrafos son todos del mismo largo? ¿Las secciones simétricas? ¿La conclusión repite el cuerpo? Rompé la simetría: fusioná, partí, borrá la conclusión si no agrega. Si podés eliminar una sección entera sin que se pierda nada, esa sección sobraba.

4. **Pasada de sintaxis.** Buscá y matá: paralelismos negativos ("no es X, es Y"), tríadas, "desde X hasta Y", participios finales de importancia ("consolidando su posición"), editorializaciones ("es importante destacar"). Buscá literalmente, con Ctrl+F.

5. **Pasada de léxico.** Cada adjetivo: ¿tiene un dato al lado o es decoración? "Robusto", "integral", "innovador", "clave" sin evidencia se van. Regla operativa: **si el adjetivo se puede reemplazar por un número o un ejemplo, hacelo.**

6. **Pasada de voz (la del oído).** Leelo en voz alta. Ahí se oye todo: el ritmo parejo, la frase que nadie diría, el registro que se cae, el voseo que se mezcla. Si te trabás o te aburrís, el lector también. Es la pasada de mejor relación esfuerzo/resultado de las siete.

7. **Pasada de localización** (para textos en español rioplatense). Voseo consistente; ¿ y ¡ presentes; sin Title Case; sin calcos; formatos de fecha, número y moneda locales; vocabulario del rubro real del cliente.

### 8.5 Cinco movimientos que suben el nivel de cualquier texto

Criterio profesional, aplicable escribas como escribas:

**Variá el ritmo deliberadamente.** Frase corta después de una larga. Un párrafo de una línea donde querés que el lector frene. La uniformidad de ritmo es la señal estructural más difícil de disimular y la más fácil de corregir a mano.

**Cambiá abstracción por concreción, siempre que puedas.** "Mejoramos significativamente el rendimiento" → "el build pasó de 4 minutos a 40 segundos". Esto solo arregla la mitad de los problemas de la sección 3.3 de un saque.

**Asumí una posición.** El equilibrio artificial es un tell y además es aburrido. Si pensás que algo está mal, decilo y bancá el argumento. Un texto que no se moja no lo recuerda nadie — el paralelo exacto del "tapá el logo" del tomo 1.

**Empezá por lo interesante.** El modelo casi siempre arranca con un párrafo de contexto genérico ("En el mundo actual del desarrollo web..."). Borralo. Casi siempre el texto mejora arrancando en la segunda o tercera oración.

**Escribí para alguien concreto.** No "para el público": para el cliente que te preguntó eso el martes. El texto cambia solo.

### 8.6 Sobre cuándo declarar el uso de IA

Criterio, no norma. En contexto académico o periodístico, hay políticas explícitas y hay que seguirlas. En trabajo profesional para clientes, lo que importa es lo que se acordó: si te contrataron por tu criterio y tu revisión, usar herramientas es tan discutible como usar un IDE. Lo que no es defendible es entregar output crudo cobrando trabajo experto — no por el uso de la herramienta, sino porque **el trabajo por el que te pagaron es justamente el que no hiciste.**

---

## 9. Protocolo de auditoría de un texto ajeno (10–15 min)

Para evaluar un texto de un proveedor, un candidato o un cliente. Acumulación, nunca señal única.

1. **Leelo entero primero, sin buscar nada.** ¿Aprendiste algo? ¿Podrías resumir en una línea qué afirma? Si no, ya está el hallazgo principal.
2. **Test de intercambiabilidad.** ¿Este texto podría publicarlo un competidor cambiando el nombre? El equivalente textual de tapar el logo.
3. **Buscá primera mano.** ¿Hay un número propio, un caso concreto, un error admitido, un detalle que solo sepa quien estuvo? Contá cuántos.
4. **Verificá tres afirmaciones al azar**, priorizando las que tengan cifra o cita. Si una fuente no existe o no dice lo que le atribuyen, tratá todo el texto como no verificado.
5. **Ctrl+F sintáctico:** "no es solo", "no solo", "desde ... hasta", "es importante", "en resumen", "en el mundo", "clave", "robusto", "integral". Contá ocurrencias por cada mil palabras.
6. **Medí el ritmo.** Mirá la longitud de las diez primeras oraciones y de los párrafos: ¿variación o uniformidad?
7. **Pasada de español** (si aplica): voseo/tuteo, signos de apertura, Title Case, calcos, formatos.
8. **Buscá residuos:** markdown filtrado, emojis en headers, frases de asistente, placeholders.
9. **Veredicto de tres niveles**, como en los otros tomos: *limpio* (0–1 señales fuertes), *asistido sin editar* (2–3), *crudo* (4+). Y por separado —esto es lo que de verdad importa— **verificado / no verificado**, que es una dimensión independiente: hay texto humano sin verificar y texto asistido impecablemente verificado.

---

## 10. Checklist maestra de texto

| Dimensión | Con criterio | Generado sin editar |
|---|---|---|
| Sustancia | Algo específico que solo sabe quien estuvo ahí | Fluido y vacío; aplicable a cualquiera |
| Fuentes | Nombre, institución, fecha, link verificado | "Los expertos señalan", "estudios recientes" |
| Datos | Verificables, con origen | Cifras decorativas sin rastro |
| Adjetivos | Con dato o ejemplo al lado | Robusto, integral, innovador, clave |
| Sintaxis | Ritmo variable, construcciones diversas | "No es X, es Y"; tríadas; "desde X hasta Y" |
| Párrafos | Largo variable según lo que pide la idea | Todos de 3–4 oraciones |
| Estructura | La que pide el contenido | Intro → 3 secciones → Desafíos → Futuro → Resumen |
| Conclusión | Agrega algo o no existe | Repite lo que el lector acaba de leer |
| Apertura | Empieza en lo interesante | "En el mundo actual de..." |
| Posición | Se moja, argumenta, elige | Equilibrio artificial, todo depende |
| Español AR | Voseo consistente, ¿¡, formatos locales | Neutro de doblaje, Title Case, calcos, MM/DD |
| Formato | Limpio para el destino | Markdown filtrado, emojis en headers, residuos de chat |
| Proceso | Contexto real + edición de siete pasadas | Prompt genérico, primer output, publicar |

---

## 11. La parte sincera

**El texto generado ya es ambiente, no excepción.** Uno de cada siete abstracts biomédicos de 2024, hasta 40% en algunos subcorpus. Escandalizarse dejó de ser una posición útil; lo que queda es distinguir texto que dice algo de texto que no.

**La detección individual no funciona y no va a funcionar.** 61,22% de falsos positivos sobre escritura humana no nativa. Si alguien te acusa con la captura de un detector, tenés el dato. Y si vos estás por acusar a alguien con esa captura, no lo hagas: leé el texto y verificá las fuentes, que es lo único que da información real.

**Las señales caducan más rápido que en diseño.** *Delve* murió en un año. Cada tell que se populariza se convierte en objetivo de entrenamiento y de edición. Lo que no caduca es el hallazgo estructural de Kobak: **el desplazamiento de palabras de contenido hacia palabras de estilo.** Entrenate para oler el vacío elegante, no para memorizar vocabulario.

**Cuidado con la sobre-corrección, que acá tiene costo social.** Con estas listas vas a empezar a ver IA en escritura humana perfectamente legítima: gente que usa em-dashes desde siempre, no nativos que escriben con cuidado, y profesionales que usan la regla de tres porque funciona. La pregunta correcta no es "¿usó el patrón?" sino "¿este texto sabe algo?".

**Y el punto que atraviesa los tres tomos.** En diseño, la IA converge al promedio visual. En paneles, al dashboard modal. En texto, al párrafo más probable. Es el mismo fenómeno con tres caras: **un promedio no es un estilo, es la ausencia de uno.** Lo que te diferencia no es evitar la herramienta; es tener algo específico que decir y el criterio para editar hasta que se note. Eso no lo promedia ningún modelo, y es exactamente lo que te pagan.

---

## 12. Fuentes

**Evidencia dura:** Kobak, D., González-Márquez, R., Horvát, E.-Á. & Lause, J., *Delving into LLM-assisted writing in biomedical publications through excess vocabulary*, **Science Advances** 11(27), eadt3813 (2 de julio de 2025); DOI 10.1126/sciadv.adt3813; preprint arXiv:2406.07016; datos, código y las ~900 palabras en exceso anotadas en github.com/berenslab/llm-excess-vocab. Método de exceso de vocabulario inspirado en los estudios de exceso de mortalidad; corpus de 15,1 millones de abstracts de PubMed en inglés, 2010–2024; cota inferior de 13,5% de abstracts procesados con LLM en 2024, hasta 40% en algunos subcorpus. — Liang, W. et al. (Stanford HAI, 2023), *GPT Detectors Are Biased Against Non-Native English Writers*: siete detectores, 91 ensayos TOEFL humanos, 61,22% de falsos positivos, 18/91 unánimes, 89/91 marcados al menos una vez; cobertura de The Markup (agosto 2023).

**Catálogo comunitario:** *Wikipedia:Signs of AI writing* (WikiProject AI Cleanup, ~15.000 palabras, en revisión permanente): paralelismos negativos, regla de tres, atribución vaga, participios de importancia, estructura formulaica, uso de em-dash, con su advertencia explícita de que ninguna señal individual prueba autoría y de que la lista no es una prohibición de palabras. Comentarios y síntesis: FlowingData (oct. 2025), Forbes (sept. 2025), Lit Hub (sept. 2025).

**Marco comercial:** Google Search Central, políticas de spam (scaled content abuse, aplicable "sin importar cómo se creó"); Search Quality Rater Guidelines, reorganización de la sección 4.6 (eliminación de "auto-generated MC", incorporación de scaled content abuse y del catch-all de contenido con poco esfuerzo/originalidad/valor agregado), reportada por Search Engine Land (ene. 2026); declaraciones públicas de Google sobre calidad por encima de método de producción. Los porcentajes de impacto en tráfico de las actualizaciones de 2026 provienen de análisis de terceros de la industria SEO y se citan como orden de magnitud, no como datos de Google.

**Criterio profesional (mío, marcado en el texto):** el capítulo completo de español rioplatense, los pesos de todas las tablas, los dos umbrales de la sección 7, el protocolo de siete pasadas, los cinco movimientos de escritura, el protocolo de auditoría y la checklist maestra.
