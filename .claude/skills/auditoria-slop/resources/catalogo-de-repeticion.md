# Catálogo de repetición

**Anexo transversal a los cuatro tomos · inventario concreto y método de medición · julio 2026**

*No es un documento de criterio: es una lista de cadenas literales, componentes y estructuras que se repiten, más la forma de contarlas. Todo lo de acá está pensado para ser verificable con Ctrl+F, grep o el script que acompaña.*

---

## Qué significa "objetivo" acá (leer primero)

Tres cosas distintas, y conviene no confundirlas:

**1. Lo medido por terceros.** Existe y lo cito con su fuente: las ~900 palabras en exceso del estudio de Kobak (*Science Advances*, 2025, sobre 15,1 millones de abstracts) y los 16 patrones deterministas de Krebs (2026, sobre 1.590 páginas). Estas listas no son opinión mía.

**2. Lo inventariado por observación (mío).** Las listas en español, los componentes de UI, los placeholders. **No están medidos**, y no te voy a decir que sí. Pero son verificables uno por uno: abrís cualquier demo, cualquier landing generada, y están ahí. Si encontrás que algo de mi lista no aparece nunca, la lista está mal y se corrige.

**3. El método de medición (esto es lo objetivo de verdad).** Y acá está el punto central del anexo: **aunque mis listas fueran incompletas o parciales, el procedimiento de medición sigue siendo válido.** Contar ocurrencias por cada mil palabras, medir la varianza de longitud de oración, calcular el ratio de vocabulario único: eso son números, no impresiones.

**El principio que hace todo esto objetivo — calibración contra tu propia base.** Cualquier umbral absoluto que te dé ("más de 3 tríadas por mil palabras es sospechoso") es inventado. Lo que no es inventado es esto: **corré el medidor sobre diez textos tuyos que sepas que escribiste vos, sacá tu promedio y tu desvío, y usá eso como base.** A partir de ahí, un texto que se desvía tres sigmas de tu propia escritura es un dato, no una corazonada. Lo mismo aplica para tus proyectos: medí tu último sitio bueno y usalo de referencia. Esa es la única forma honesta de poner un umbral.

---

# A. LÉXICO

## A.1 Inglés — la lista medida (Kobak et al., 2025)

Lo relevante del estudio no es qué palabras, sino **de qué tipo**: antes de los LLM el vocabulario que cambiaba era de contenido (nombres de virus, técnicas, enfermedades); después, el exceso se concentró en **palabras de estilo**. Muestra de las señaladas:

**Verbos:** delve, underscore, showcase, garner, encompass, align, leverage, harness, streamline, unveil, foster, bolster, elucidate, highlight, emphasize, navigate, embark, utilize, facilitate, enhance.

**Adjetivos:** pivotal, intricate, meticulous, commendable, noteworthy, comprehensive, crucial, robust, seamless, innovative, cutting-edge, profound, compelling, multifaceted, nuanced, unprecedented, transformative, holistic, invaluable, remarkable, significant, notable, versatile, dynamic.

**Sustantivos:** realm, landscape, tapestry, synergy, testament, beacon, framework, paradigm, insights, advancements, findings, potential, endeavor, journey, ecosystem, cornerstone.

**Adverbios y conectores:** notably, particularly, furthermore, moreover, additionally, consequently, importantly, ultimately, arguably.

**Colocaciones fijas:** "delve into", "in the realm of", "it's worth noting that", "plays a crucial role in", "serves as a testament to", "navigate the complexities of", "a wide range of", "in today's fast-paced world", "at the forefront of", "pave the way for", "shed light on", "when it comes to", "not only... but also".

Lista completa y anotada, publicada por los autores: `github.com/berenslab/llm-excess-vocab`.

## A.2 Español — inventario propio

No medido. Verificable. Y con una particularidad que lo hace más útil que la lista en inglés: **la mayoría de estas palabras son además calcos de traducción**, así que en un texto en castellano delatan dos veces.

**Verbos de estilo (sin contenido propio):**
profundizar (en el sentido de *delve*) · subrayar · destacar · resaltar · aprovechar (*leverage*) · impulsar · potenciar · elevar · optimizar · desbloquear (*unlock*) · abarcar · englobar · fomentar · propiciar · garantizar · transformar · revolucionar · empoderar · maximizar · agilizar · robustecer · consolidar · posicionar · dinamizar · redefinir · reimaginar

**Adjetivos inflados (los que no traen dato al lado):**
robusto · integral · holístico · innovador · vanguardista · de vanguardia · disruptivo · clave · fundamental · crucial · esencial · primordial · meticuloso · exhaustivo · minucioso · versátil · dinámico · sólido · escalable (fuera de contexto técnico) · potente · poderoso · intuitivo · amigable · eficiente · óptimo · estratégico · significativo · notable · destacado · sin fisuras · sin costuras (*seamless*) · a medida (como muletilla) · de última generación

**Sustantivos de relleno:**
panorama (*landscape*) · ámbito · reino · esfera · ecosistema · sinergia · viaje · travesía · recorrido · tapiz · testimonio (como *a testament to*) · pilar · hito · baluarte · universo · mundo ("el mundo del marketing digital") · abanico · gama · piedra angular · punta de lanza · marco · paradigma · enfoque · aproximación · perspectiva · potencial · hallazgos · avances · desafío (como muletilla) · oportunidad (ídem)

**Conectores y bisagras:**
en la era digital · en el panorama actual · en un mundo cada vez más · hoy en día · en la actualidad · cabe destacar que · cabe mencionar que · es importante destacar que · es importante señalar que · vale la pena mencionar · no está de más recordar · dicho esto · sin embargo (en exceso) · por otro lado (en exceso) · además · asimismo · por consiguiente · en última instancia · en definitiva · en resumen · en conclusión · para finalizar · en pocas palabras

**Verbos de apertura de sección (el tic más marcado):**
Descubrí/Descubre cómo · Conocé/Conoce las ventajas · Explorá/Explora las posibilidades · Sumérgete en · Adentrémonos en · Analicemos · Veamos · Imaginate que · ¿Alguna vez te preguntaste...?

## A.3 Colocaciones fijas en español (buscables literales)

Estas son las que más rinde grepear porque son cadenas exactas:

`no solo` + `sino también` · `no se trata de` + `sino de` · `no es solo` + `es` · `desde` + `hasta` (en enumeración) · `ya sea que` · `tanto` + `como` · `más allá de` · `a la hora de` · `en materia de` · `de la mano de` · `un antes y un después` · `marcar la diferencia` · `llevar al siguiente nivel` · `dar el salto` · `sacar el máximo provecho` · `todo lo que necesitás saber sobre` · `la guía definitiva` · `lo que nadie te cuenta` · `y esto es solo el comienzo` · `pero hay más` · `acá es donde entra en juego` · `la clave está en` · `no es casualidad que` · `y eso es exactamente lo que`

---

# B. FÓRMULAS SINTÁCTICAS

Las estructuras, con su patrón buscable. Estas son las que menos caducan, porque no son palabras que se puedan reemplazar: son formas de armar la oración.

| Fórmula | Ejemplo | Regex aproximada |
|---|---|---|
| **Paralelismo negativo** | "No es solo una web, es una herramienta de venta" | `no (es|se trata de|son) (solo|sólo|únicamente)?[^.]{2,60}(,|;| sino)` |
| **No solo… sino también** | "No solo ahorra tiempo, sino que también reduce errores" | `no s[oó]lo[^.]{2,80}sino` |
| **Tríada** | "Rápido, simple y seguro" | `\b\w+, \w+ y \w+\b` (adjetivos coordinados) |
| **Desde X hasta Y** | "Desde la planificación hasta el soporte" | `desde [^.]{3,50} hasta` |
| **Participio final de importancia** | "…consolidando su posición en el mercado" | `, (consolidando|marcando|reflejando|posicionando|garantizando|permitiendo|logrando|impulsando|convirtiéndo\w+|estableciendo)` |
| **Editorialización** | "Es importante destacar que…" | `(es importante|cabe|vale la pena|no está de más) (destacar|mencionar|señalar|recordar|notar)` |
| **Pregunta retórica de apertura** | "¿Qué significa esto para tu negocio?" | `^¿[^?]{5,80}\?$` (como línea o inicio de párrafo) |
| **Definición por negación** | "X no es una moda pasajera: es una necesidad" | `no es una? [^.]{3,40}(:|,|;) es` |
| **Escalada de tres cláusulas** | "Más rápido, más simple y más potente" | `más \w+, más \w+ y más \w+` |
| **Cierre de recapitulación** | "En resumen, hemos visto que…" | `^(en resumen|en conclusión|en definitiva|para concluir|en síntesis)` |
| **Apertura contextual genérica** | "En el mundo actual del comercio electrónico…" | `^(en (el|un) (mundo|panorama|contexto|entorno|escenario)|hoy en día|en la actualidad|en la era)` |

---

# C. ESTRUCTURAS DE DOCUMENTO

## C.1 El esqueleto del artículo de blog

Contable: si aparecen 6 de 8, es la fórmula.

1. Apertura con contexto genérico del rubro o pregunta retórica
2. Párrafo de "por qué esto importa ahora"
3. Tres a cinco H2 paralelos sintácticamente ("Qué es X", "Por qué X", "Cómo implementar X", "Beneficios de X")
4. Una tabla comparativa
5. Sección "Desafíos" o "Errores comunes"
6. Sección "Tendencias futuras" o "El futuro de X"
7. Conclusión que recapitula lo ya dicho
8. FAQ de 4 a 6 preguntas al final

## C.2 El esqueleto de la landing

El guion completo está en el tomo 1. Resumen contable: barra de anuncio → navbar → hero centrado con badge pill → logos "confían en nosotros" → 3 o 6 feature cards con ícono → "Cómo funciona" 1-2-3 → bento o zigzag → banner de métricas → testimonios en cards → pricing de 3 tiers con el del medio destacado → FAQ acordeón → CTA final con gradiente → footer de 4 columnas.

## C.3 El esqueleto del documento funcional/propuesta

1. Introducción con contexto del rubro
2. Objetivos (generales y específicos)
3. Alcance — **sin exclusiones**
4. Funcionalidades, todas descritas con el mismo largo
5. Stack tecnológico (lista de logos verbal)
6. Cronograma en fases redondas (Fase 1: 2 semanas, Fase 2: 2 semanas…)
7. Inversión
8. "Beneficios para su empresa"
9. Cierre comercial genérico

Faltantes sistemáticos: exclusiones, supuestos, dependencias del cliente, criterios de aceptación, riesgos específicos.

## C.4 El esqueleto del manual generado

Índice = árbol de menús del sistema · Introducción "¿Qué es [Sistema]?" · Requisitos genéricos · Un capítulo por ítem de menú · Cada capítulo lista cada campo del formulario · Sin errores, sin recuperación, sin reglas de negocio · "Preguntas frecuentes" genéricas · "Soporte: contacte al administrador".

---

# D. ELEMENTOS DE INTERFAZ REPETIDOS

Todo lo de acá se verifica en DevTools o view-source. Es la parte más objetiva del anexo porque son cadenas exactas.

## D.1 Íconos (Lucide/Heroicons) — el set que se repite

`Zap` · `Rocket` · `Sparkles` · `Shield` / `ShieldCheck` · `Check` / `CheckCircle` / `CircleCheck` · `TrendingUp` · `Users` · `BarChart3` · `Clock` · `Globe` · `Lock` · `Star` · `ArrowRight` · `ChevronRight` · `Layers` · `Target` · `Lightbulb` · `Settings` · `Bell` · `Search` · `Mail` · `Heart` · `Award` · `Gauge` · `Activity` · `DollarSign` · `CreditCard` · `Package` · `ShoppingCart` · `LayoutDashboard`

**El átomo repetido:** ícono de 20–24px dentro de un contenedor cuadrado redondeado de 40–48px, con fondo del color de acento al 10% de opacidad, arriba del título de la card.

## D.2 Colores — los hex literales

Los defaults de Tailwind sin tocar. Grepealos:

`#6366f1` (indigo-500) · `#818cf8` (indigo-400) · `#8b5cf6` (violet-500) · `#a855f7` (purple-500) · `#7c3aed` (violet-600) · `#3b82f6` (blue-500) · `#06b6d4` (cyan-500) · `#64748b` (slate-500) · `#94a3b8` (slate-400) · `#0f172a` (slate-900) · `#1e293b` (slate-800) · `#f8fafc` (slate-50) · `#10b981` (emerald-500) · `#ef4444` (red-500) · `#f59e0b` (amber-500)

El combo canónico del gradiente: `from-violet-500 to-indigo-500`, `from-purple-600 to-blue-500`, `from-indigo-500 via-purple-500 to-pink-500`.

## D.3 Cadenas de clases que se repiten

```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
text-4xl md:text-6xl font-bold tracking-tight
grid grid-cols-1 md:grid-cols-3 gap-8
rounded-2xl border bg-card p-6 shadow-sm
bg-gradient-to-r from-violet-500 to-indigo-500
text-muted-foreground
inline-flex items-center rounded-full border px-2.5 py-0.5
hover:shadow-lg transition-shadow duration-300
bg-primary/10 text-primary
space-y-4
```

## D.4 Variables CSS (shadcn sin tocar)

```
--background · --foreground · --card · --card-foreground
--primary · --primary-foreground · --muted · --muted-foreground
--accent · --border · --input · --ring
--radius: 0.5rem
```

## D.5 Componentes que aparecen siempre

Badge pill con ✨ arriba del H1 · Card con borde de color arriba o a la izquierda (3–4px) · Marquee de logos en escala de grises · Acordeón de FAQ · Toggle de dark mode · Command palette `⌘K` · Toast en esquina inferior derecha · Skeleton con `animate-pulse` · Avatar circular con iniciales de fallback · Tabla con avatar + nombre en la primera columna · Gráfico de área con `linearGradient` en el fill

---

# E. CONTENIDO DE RELLENO REPETIDO

## E.1 Los nombres de la demo de shadcn (los más delatores)

Aparecen literalmente en producción con una frecuencia sorprendente. Grepealos:

`Olivia Martin` · `Jackson Lee` · `Isabella Nguyen` · `William Kim` · `Sofia Davis`

Con sus montos: `+$1,999.00` · `+$39.00` · `+$299.00` · `+$99.00`

Y sus mails: `olivia.martin@email.com` · `m@example.com`

## E.2 Placeholders clásicos

`John Doe` · `Jane Doe` · `Acme Inc` · `Acme Corp` · `Your Company` · `Company Name` · `example.com` · `user@example.com` · `+1 (555) 000-0000` · `Lorem ipsum` · `123 Main St` · `New York, NY` · `[Tu nombre acá]` · `[Insertar X]`

## E.3 Métricas de utilería

`10k+ usuarios` · `10,000+` · `500+ clientes` · `99.9% uptime` · `24/7 soporte` · `4.9/5 estrellas` · `2M+ descargas` · `#1 en su categoría` · `+150% de crecimiento` · `50+ integraciones` · `Confían en nosotros más de X empresas`

## E.4 Copy de botón y microcopy

`Empezar ahora` · `Comenzar gratis` · `Saber más` · `Conocer más` · `Ver más` · `Solicitar demo` · `Contactanos` · `Probar gratis` · `Sin tarjeta de crédito` · `Cancelá cuando quieras` · `Más popular` · `Recomendado` · `Ahorrá un 20%`

## E.5 Títulos de sección

`¿Por qué elegirnos?` · `Nuestros servicios` · `Cómo funciona` · `Lo que dicen nuestros clientes` · `Preguntas frecuentes` · `Sobre nosotros` · `Nuestro proceso` · `Comenzá hoy` · `Todo lo que necesitás` · `Diseñado para vos` · `Simple. Rápido. Potente.`

## E.6 Residuos de generación

`© 2026 Your Company. All rights reserved.` · `Create Next App` · `Vite + React` · `vite.svg` como favicon · `Edit with Lovable` · `Made in Framer` · `// Add your logic here` · `// TODO:` · `console.log("here")` · asteriscos de markdown sin renderizar · `###` en un campo de texto plano · `Claro, acá tenés…` · `Espero que esto te sirva`

---

# F. ESPAÑOL RIOPLATENSE — REPETICIONES ESPECÍFICAS

Buscables, y las de mayor peso diagnóstico en tu mercado:

**Mezcla de registro:** cualquier texto que contenga a la vez `tu` + `vos`, `tienes` + `tenés`, `debes` + `debés`, `puedes` + `podés`, `descubre` + `descubrí`. Es la señal más confiable del dominio y se detecta con dos greps.

**Neutro de doblaje:** `obtén` · `descubre` · `conoce` · `disfruta` · `tú` · `contigo` · `deberás` · `podrás acceder`

**Faltantes:** ausencia de `¿` y de `¡` (contá aperturas vs. cierres: si hay más `?` que `¿`, hay problema).

**Calcos:** `es por eso que` · `en orden de` · `hacer sentido` · `aplicar para` (un puesto) · `remover` (por quitar) · `asumir` (por suponer) · `soportar` (por admitir/permitir) · `librería` (por biblioteca, tolerable en jerga dev) · `customizar` · `nombrar` (por designar)

**Formato:** `1,000.50` en vez de `1.000,50` · fechas `MM/DD/YYYY` · `$` sin aclarar moneda · Title Case en títulos

---

# G. CÓMO MEDIRLO (la parte objetiva)

## G.1 Las métricas

| Métrica | Qué mide | Cómo se calcula |
|---|---|---|
| **Frecuencia por mil palabras** | Densidad de un término o fórmula | `(ocurrencias / palabras) × 1000` |
| **Desvío de longitud de oración** | La uniformidad de ritmo, que es el tell estructural más difícil de disimular | Desvío estándar de la cantidad de palabras por oración |
| **Coeficiente de variación** | Lo mismo, normalizado (comparable entre textos de distinto largo) | `desvío / media` |
| **Ratio tipo-token (TTR)** | Diversidad léxica: palabras únicas sobre total | `únicas / total`, siempre sobre ventanas del mismo tamaño |
| **Uniformidad de párrafo** | Desvío de oraciones por párrafo | Ídem oración |
| **Repetición de estructura de encabezado** | Cuántos H2 comparten el mismo patrón sintáctico | Conteo manual o por regex de la primera palabra |
| **Densidad de listas** | Proporción del texto en viñetas vs. prosa | `líneas de lista / líneas totales` |
| **Ratio adjetivo/dato** | Cuántos adjetivos tienen un número o ejemplo cerca | Manual, muestra de 20 |

## G.2 El procedimiento de calibración (esto es lo importante)

Cualquier umbral que te dé yo es arbitrario. Este procedimiento no lo es:

1. **Juntá tu base.** Diez a quince textos que sepas con certeza que escribiste vos, del mismo tipo (propuestas con propuestas, artículos con artículos).
2. **Medilos todos.** Sacá media y desvío de cada métrica.
3. **Ese es tu perfil.** Ahora tenés números propios: por ejemplo, tu coeficiente de variación de longitud de oración es 0,55 y tu densidad de "sin embargo" es 0,8 por mil palabras.
4. **Comparás contra eso.** Un texto que llega para tu revisión con coeficiente 0,25 y doce "es importante destacar" por mil palabras se desvía de tu escritura de forma medible. Eso es un dato.
5. **Recalibrá cada tanto.** Tu escritura cambia; la base también.

Y el mismo procedimiento aplica a proyectos web: medí tu último sitio bueno (cantidad de familias tipográficas, de valores de radio distintos, de colores en la paleta, de tratamientos de sección) y usalo como referencia para auditar los siguientes.

## G.3 Advertencia sobre los umbrales

Los que doy abajo son **heurísticos, no validados**. Los pongo porque tener un punto de partida sirve, pero el número que vale es el tuyo (G.2).

- Coeficiente de variación de longitud de oración **por debajo de 0,35**: ritmo sospechosamente parejo.
- Más de **2 tríadas por cada mil palabras**: muletilla.
- Más de **1 paralelismo negativo por cada mil palabras**: fórmula.
- Más de **3 conectores de la lista A.2 por cada mil palabras**: relleno de bisagra.
- **Cualquier ocurrencia** de las secciones E.1, E.2 o E.6: delito flagrante, no hace falta umbral.
- Más de **4 adjetivos inflados sin dato al lado** en un mismo párrafo: decoración.

---

# H. LA HERRAMIENTA

El script que acompaña este anexo (`repetitometro.mjs`) implementa todo lo de G.1: carga un archivo de texto o markdown y devuelve las frecuencias contra las listas de las secciones A a F, más las métricas de uniformidad. Node sin dependencias.

```bash
node repetitometro.mjs texto.md              # informe de un texto
node repetitometro.mjs texto.md --json       # salida JSON
node repetitometro.mjs base/*.md --baseline  # calcula tu perfil base
```

Las listas están en constantes arriba del archivo, para que las edites: agregá lo que encuentres, sacá lo que no aplique a tu rubro. **Esa edición es lo que la vuelve tuya y precisa** — mi inventario es un punto de partida, no una verdad.

---

## Fuentes

**Medido:** Kobak, González-Márquez, Horvát & Lause, *Delving into LLM-assisted writing in biomedical publications through excess vocabulary*, Science Advances 11(27), 2025 — lista de ~900 palabras en exceso, datos abiertos en github.com/berenslab/llm-excess-vocab. Krebs, *Scoring Show HN submissions for AI design patterns*, 2026 — 16 patrones deterministas sobre 1.590 páginas, con prevalencias.

**Inventario propio (no medido, verificable ítem por ítem):** todas las listas en español (A.2, A.3, F), las fórmulas sintácticas y sus regex (B), las estructuras de documento (C), los elementos de interfaz (D) y el contenido de relleno (E). Los nombres de E.1 son verificables contra la demo pública de shadcn/ui; los hex de D.2 contra la paleta por defecto de Tailwind.

**Método (G):** métricas estándar de estilometría y análisis de corpus. El procedimiento de calibración contra base propia es criterio metodológico mío, y es la parte que sostiene la objetividad del resto: las listas pueden estar incompletas sin que eso invalide la medición.
