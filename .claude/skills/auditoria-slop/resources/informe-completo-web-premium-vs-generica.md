# La web genérica al descubierto — Edición completa

**Informe integral · detección, causas, auditoría y construcción · julio 2026**

*Este documento consolida y reemplaza las tres versiones anteriores: la auditoría de señales de sitio hecho con IA (v1), la contraposición sobre cómo se construye trabajo premium (v2) y la versión con evidencia medida y casos profundos (v3). Es la referencia única.*

---

## Cómo está organizado

Cuatro partes más un cierre. La **Parte I** establece la evidencia: qué está medido y qué no. La **Parte II** es el diagnóstico completo: la fórmula del sitio template, la taxonomía exhaustiva de señales por capas con su peso, los dos casos profundos (cards y numeraciones), el bento, las causas estructurales y el protocolo de auditoría paso a paso. La **Parte III** es la construcción: método, stack técnico y craft de diseño para hacer lo contrario. La **Parte IV** son los recursos para calibrar el ojo. El cierre trae la checklist maestra, los matices honestos y las fuentes clasificadas.

---

## Nota sobre fuentes y rigor (leer primero)

En este tema conviven tres calidades de evidencia, y mezclarlas es el error clásico. A lo largo del documento marco de qué tipo es cada afirmación:

1. **Evidencia dura (papers, estudios, mediciones).** Sobre homogeneización visual: Goree et al. (CHI 2021, ACM). Sobre patrones de "diseño IA": el estudio de Adrian Krebs (2026) con 1.590 páginas auditadas por Playwright contra chequeos deterministas. Sobre calidad y seguridad de código generado: benchmarks y papers académicos (Yan et al. 2025; estudios de accesibilidad en MDPI, arXiv, Springer, ACM 2024–2025). Sobre prevalencia de sitios generados: el estudio de Imperial College / Internet Archive / Stanford (2025). Esto se puede verificar y, en varios casos, reproducir.

2. **Consenso profesional / fuentes de industria respetadas.** NN/g sobre cards, listas y tablas; Thoughtworks y AWS sobre método; Codrops/Tympanus y Awwwards sobre estándar visual y técnico; documentación oficial de cada herramienta; la encuesta State of Creativity 2026 de Creative Boom. Confiable como estado del arte; es práctica viva, no ciencia.

3. **Criterio profesional (mío o de la comunidad, marcado como tal).** El repertorio de alternativas de layout, los pesos asignados a cada señal, las señales específicas del español rioplatense, los fingerprints de código (verificables uno por uno, pero la lista la armé yo) y las recomendaciones de foundries y estudios de referencia. Valioso y suele acertar, pero es criterio, no dato.

Regla transversal que ninguna medición cambia: **ninguna señal aislada prueba nada; el diagnóstico es siempre por acumulación.** El propio Krebs clasifica por conteo (4 o más patrones = slop pesado) y reporta 5–10% de falsos positivos incluso con chequeos deterministas. Un humano apurado y sin criterio produce exactamente los mismos síntomas que una IA sin dirección.

**Fuentes confiables para seguir el tema vos mismo:** Codrops (tympanus.net) para motion y técnica; Awwwards, FWA y CSS Design Awards para el estándar visual; Thoughtworks Technology Radar para método de ingeniería; NN/g para patrones de UI con investigación atrás; la documentación oficial de GSAP, Lenis, Three.js y Next.js; y para tipografía, las foundries directamente.

---

## La tesis, sin vueltas

El error de fondo es pensar que existe un "look IA" como si fuera un filtro de Instagram. No lo es. Lo que delata una web hecha con IA no es la presencia de la IA: es la **ausencia de decisiones**. Una IA bien dirigida, con un sistema de diseño propio y copy reescrito, produce sitios indistinguibles de los hechos a mano. Lo que se detecta siempre es lo mismo: alguien aceptó el primer output sin curar nada.

El patrón transversal tiene nombre técnico: **convergencia distribucional**. Un modelo de lenguaje predice el token más probable, y el token más probable es el patrón más repetido de internet. El promedio de todas las landings es una landing promedio: hero centrado, botón azul-violeta, tres cards. Un promedio no es un estilo; es la ausencia de uno.

Y hay una novedad importante respecto de la primera versión de este informe: la parte estética, que era casi toda folclore profesional, **ahora tiene medición**. Las dos cosas que más te molestan —las grillas de cards idénticas y las secuencias numeradas— figuran literalmente en la rúbrica medida de patrones que hacen que un sitio se lea como generado. Tu ojo detectó estadística antes de que alguien la midiera.

---

# PARTE I — LA EVIDENCIA

## 1. La homogeneización es anterior a la IA

Antes de hablar de IA conviene fijar esto: la convergencia visual de la web **empezó mucho antes de los generadores**. El estudio de Goree, Doosti, Crandall y Su (Indiana University, CHI 2021) aplicó computer vision a un dataset grande de capturas de sitios representativos entre 2003 y 2019 y encontró que los diseños se volvieron significativamente más parecidos desde 2007, con la distancia promedio entre layouts cayendo más de un 30%. El pico de diversidad estuvo alrededor de 2008–2010; de ahí en adelante, convergencia sostenida. Las causas que identificaron, combinando el análisis computacional con entrevistas a once profesionales de varios continentes: **superposición de código fuente y librerías compartidas** (la era Bootstrap), **estandarización de esquemas de color** y **el soporte mobile**, que aplastó la variedad de layouts posibles.

Esto importa por dos razones. Primera: el "look template" no lo inventó la IA; la IA lo **industrializó**, porque se entrenó sobre una web que ya venía convergiendo. Segunda: te da el argumento correcto frente a clientes y colegas. El problema nunca fue la herramienta (Bootstrap ayer, shadcn hoy, v0 mañana); el problema es la ausencia de decisiones sobre la herramienta.

## 2. La escala del fenómeno (2025–2026)

Los números de contexto, todos como orden de magnitud salvo indicación:

Sobre **prevalencia**: el estudio de Imperial College London con datos de Internet Archive y Stanford (2025) estimó que alrededor del 35% de la web nueva ya es contenido genérico o generado con IA. Sobre **código**: los LLM generan código vulnerable en un rango del 9,8% al 42,1% según el benchmark utilizado (Yan et al., 2025), y estudios académicos de 2024–2025 (MDPI, arXiv, Springer, ACM) documentan fallas sistemáticas de accesibilidad WCAG en código generado sin revisión. Sobre **adopción**: el 25% del cohort Winter 2025 de Y Combinator entregó código 95% generado por IA (TechCrunch). Sobre **mercado**: el segmento de builders de sitios con IA se proyecta en torno a los USD 6.300 millones para 2026.

La lectura conjunta: el volumen de sitios producidos sin curaduría es masivo y creciente, la calidad técnica promedio de ese volumen tiene problemas medidos, y por lo tanto **la diferenciación se encarece cada mes** para quien no decide nada, y se abarata relativamente para quien sí.

## 3. La medición directa: los 16 patrones (Krebs, 2026)

El aporte más operativo del año. Adrian Krebs corrió **1.590 landing pages de Show HN** (la vidriera de lanzamientos de Hacker News: sesgo hacia productos tech construidos rápido, tenelo presente al extrapolar) contra 16 patrones que diseñadores le describieron como delatores. El método es lo más valioso: Playwright carga cada página headless, un script recorre el DOM y lee estilos computados, y **cada patrón es un chequeo determinista de CSS o DOM**. Nada de un LLM mirando screenshots, que introduciría el mismo sesgo que se quiere medir.

Los resultados: **22% de las páginas eran slop pesado** (4 o más patrones), **32% slop leve** (2–3), **46% limpias** (0–1). Más de la mitad del stream tiene la huella visual de "generado por una interfaz de chat sin opinión". Los tres patrones individuales más frecuentes: **dark mode permanente (34% de las páginas), fondos con gradiente (27%) y grillas de cards con ícono (22%)**. Y una perla: entre los diseñadores consultados, el **borde de color en el lado izquierdo de una card** (esa franjita de 3–4px violeta o azul) se describe como un delator casi tan confiable en diseño como el em-dash lo es en texto generado.

La rúbrica completa. Acá los números sí corresponden: es una enumeración fija, no decoración.

| # | Patrón | Grupo |
|---|---|---|
| 1 | Inter para todo, especialmente el H1 centrado del hero | Tipografía |
| 2 | Los mismos combos una y otra vez: Space Grotesk, Instrument Serif, Geist | Tipografía |
| 3 | Una palabra del hero en serif itálica como "acento" en una página que por lo demás es Inter | Tipografía |
| 4 | "VibeCode Purple": ese lavanda-violeta específico que chorrea de los generadores | Color |
| 5 | Dark mode permanente con texto de cuerpo gris medio y labels de sección en mayúsculas | Color |
| 6 | Contraste del texto de cuerpo al límite (o fallando) en temas oscuros | Color |
| 7 | Gradientes por todos lados | Color |
| 8 | Glows grandes de color y box-shadows de color | Color |
| 9 | Hero centrado compuesto en una sans genérica | Layout |
| 10 | Badge/pill posicionado justo arriba del H1 | Layout |
| 11 | Bordes de color en cards, usualmente arriba o a la izquierda | Layout |
| 12 | **Cards de features idénticas con un ícono arriba** | Layout |
| 13 | **Secuencias de pasos numeradas "1, 2, 3"** | Layout |
| 14 | Filas de banners de estadísticas (10k+ usuarios, 99.9% uptime) | Layout |
| 15 | Sidebar o nav con emojis como íconos | Layout |
| 16 | Headings y labels de sección en all-caps | Layout |

A esto Krebs suma dos huellas de CSS dominantes: los **defaults de shadcn/ui sin tocar** y el **glassmorphism** (el vidrio esmerilado que tuvo su momento en 2022 y quedó como reflejo de los LLM desde entonces).

Fijate el detalle fino de los patrones 12 y 13: no dicen "usar cards" ni "usar números". Dicen cards *idénticas* con ícono *arriba*, y pasos numerados como *estructura de sección*. La medición captura exactamente el punto: el problema no es el contenedor ni el dígito, es la uniformidad sin decisión.

---

# PARTE II — EL DIAGNÓSTICO COMPLETO

## 4. La fórmula: anatomía del sitio template

Antes de la taxonomía por capas, el esqueleto completo. Porque el tell más grande no es ningún elemento individual: es que **la página entera sigue un guion que podés recitar de memoria sin haberla visto**. Bajá por cualquier landing genérica de 2025–2026 y vas a encontrar, en este orden:

Barra de anuncio arriba ("🎉 Ya salió la v2"). Navbar con logo a la izquierda, links al centro, botón redondeado a la derecha. Hero centrado: badge pill con ✨, H1 enorme en Inter con una palabra en gradiente o en serif itálica, subtítulo en gris que no dice nada concreto, dos CTAs (uno sólido, uno fantasma), y abajo un mockup del producto flotando dentro de un marco de browser con glow violeta. Franja de logos "Confían en nosotros" en escala de grises. Sección de features: tres o seis cards idénticas, cada una con su ícono de Lucide dentro de un cuadradito redondeado con fondo de color al 10%. Sección "Cómo funciona" con pasos 1-2-3. Un bento o un zigzag imagen-texto. Banner de métricas. Muro de testimonios en cards con avatar. Pricing de tres tiers con el del medio resaltado como "Más popular". FAQ en acordeón. Sección CTA final con fondo de gradiente. Footer de cuatro columnas.

Cada pieza de ese guion existe por una razón de conversión defendible. El problema es que **el guion completo es un commodity**: cuando la estructura entera es predecible, el visitante ya "leyó" tu sitio antes de leerlo, y no queda nada para recordar. Un test brutal y gratis como primer filtro (criterio mío): **tapá el logo. Si el sitio podría ser de cualquier competidor —o de un producto de otra industria— sin cambiar nada más que el nombre, es template**, lo haya hecho una IA o una persona.

## 5. Taxonomía de señales por capas

Las señales, organizadas en once capas, con un **peso** asignado. El peso no es "qué tan feo es" sino qué tan específico y diagnóstico es el patrón: cuánto más frecuente es en trabajo sin curar que en trabajo con dirección. Alto = señal fuerte por sí sola (pero nunca prueba); medio = suma en acumulación; bajo = casi ruido, solo cuenta en cluster. Los pesos son criterio informado por las prevalencias medidas y el consenso de las fuentes; tomalos como calibración inicial.

### 5.1 Estructura y layout

| Señal | Por qué delata | Peso |
|---|---|---|
| El guion completo de la sección 4, en orden | Estructura ensamblada, no autorada | Alto |
| Todo centrado, simetría plana en cada sección | Ausencia de tensión compositiva; el centro es el default de quien no decidió | Medio |
| Cards de features idénticas, ícono arriba (Krebs #12, 22% de prevalencia) | El contenedor reemplazó a la decisión de jerarquía | Alto |
| Pasos numerados 1-2-3 como sección (Krebs #13) | Número decorativo sin función; ver sección 8 | Alto |
| Numeración 01/02/03 en eyebrows y headers de sección | Folio editorial vaciado de función; suele venir con all-caps (#16) | Medio-alto |
| Zigzag imagen-texto idéntico repetido N veces | Ritmo monótono; la misma sección clonada con otro título | Medio |
| Bento de tiles iguales | Si todos los bloques miden lo mismo, es una card grid con otro nombre; ver sección 9 | Medio |
| Mismo padding vertical apilado en todas las secciones | Densidad uniforme = ninguna sección importa más que otra | Medio |
| Banner de métricas infladas (Krebs #14) | "10k+ usuarios" en un producto lanzado ayer; la métrica como decoración | Alto |
| Cards adentro de cards ("cardocalypse") | Contenedores anidados porque cada componente vino en su cajita | Alto |
| Footer de 4 columnas con links a "#" | Estructura simulada; la página finge una arquitectura que no existe | Alto |
| Navegación que no refleja arquitectura de información pensada | Links que existen porque "una web tiene esas secciones", no porque el contenido las pida | Medio |
| Inconsistencia sutil entre páginas (header, spacing, estilos) | Cada página se generó por separado; falta el sistema que unifica | Medio-alto |

### 5.2 Componentes y forma

| Señal | Por qué delata | Peso |
|---|---|---|
| Borde de color izquierdo/superior en cards (Krebs #11) | El delator más específico de la lista; comparado con el em-dash del texto | Alto |
| Badge/pill con ✨ arriba del H1 (Krebs #10) | El "eyebrow pill", uniforme oficial de la landing generada | Alto |
| border-radius idéntico en absolutamente todo (16px / rounded-2xl) | Una sola decisión de forma estirada a todo el sistema | Medio |
| Bordes de 1px gris clarito (border-gray-200) por todos lados | El contorno default de shadcn multiplicado | Medio |
| shadow-lg / glow uniforme en cada superficie | Profundidad sin lógica de luz; todo flota igual | Medio |
| Glassmorphism en todo | Default LLM desde 2022; el Liquid Glass de Apple (2025) lo turboalimentó justo cuando la fatiga ya crecía | Medio |
| Botones que "saltan" al hover en vez de transicionar con easing | Interacción sin coreografía; nadie tocó las curvas | Medio |
| Hover states que no hacen nada | El componente vino con el estado pero nadie lo conectó a una intención | Medio |
| Toggle de dark mode en una landing de marketing que nadie pidió | Feature de template, no decisión de marca | Bajo |

### 5.3 Tipografía

| Señal | Por qué delata | Peso |
|---|---|---|
| Inter para todo (Krebs #1) | La Helvetica de la era LLM; excelente fuente convertida en ausencia de elección | Medio (sola), Alto (en combo) |
| Space Grotesk + Instrument Serif, o Geist por default (Krebs #2) | Los combos que los generadores repiten; ojo: Geist elegida a propósito es otra cosa | Medio-alto |
| Una palabra del hero en serif itálica (Krebs #3) | El "toque editorial" enlatado; sofisticación simulada en un clic | Alto |
| Tres tamaños tipográficos en todo el sitio | Escala default, sin jerarquía real | Medio |
| tracking-tight en el H1 gigante + subtítulo gris | La fórmula tipográfica del hero SaaS, calcada | Medio |
| Title Case En Cada Palabra en un sitio en español | El title case no existe en español; delata traducción o generación desde inglés | Alto (en ES) |
| Sin ajustes de tracking/leading por tamaño, sin tamaños ópticos | Nadie miró la tipografía de cerca | Medio |

### 5.4 Color y efectos

| Señal | Por qué delata | Peso |
|---|---|---|
| "VibeCode Purple" / lavanda (Krebs #4) | El color que chorrea de los generadores de imagen y de landings | Alto |
| Gradiente violeta→azul en hero, CTA y fondos (27% de prevalencia) | El gradiente perdió toda intencionalidad al ser absorbido por los defaults de los generadores (diagnóstico compartido por la encuesta de Creative Boom 2026) | Alto |
| Dark mode permanente + gris medio + labels all-caps (Krebs #5, 34%) | El reflejo más común de todos; "moderno" al punto de invisible | Medio-alto |
| Contraste del cuerpo fallando AA en dark (Krebs #6) | El problema funcional más grave del combo; se mide en un clic | Alto |
| Orbes de gradiente flotando detrás del hero | Textura decorativa default | Medio |
| Glows y box-shadows de color grandes (Krebs #8) | La firma neón-sobre-oscuro de v0/Cursor | Alto |
| Paleta = hexes default de Tailwind sin tocar (#6366f1, #8b5cf6, #64748b) | Verificable en DevTools; nadie definió tokens propios | Alto |
| Arcoíris de acentos sin color dominante | Paleta tímida y pareja: ninguna decisión de qué manda | Medio |

### 5.5 Iconografía e ilustración

| Señal | Por qué delata | Peso |
|---|---|---|
| Lucide o Heroicons sin excepción, 100% del sitio | Los íconos default de shadcn y de los generadores; el problema no es usarlos, es que sean todo y sin personalizar | Medio |
| Ícono dentro de cuadradito redondeado con fondo al 10% | El átomo de la card de feature genérica | Alto |
| Un ícono gigante redondeado centrado arriba de cada heading | Variante del anterior, misma ausencia de sistema propio | Medio-alto |
| Emojis como íconos (🚀 ⚡ 🎯) en nav, features o bullets (Krebs #15) | Iconografía de placeholder que quedó en producción | Alto |
| "Corporate Memphis" / estilo Alegria sin personalizar | Las ilustraciones planas de personajes con extremidades desproporcionadas y pastel; dominaron el branding tech 2018–2022 y la IA las reproduce muchísimo | Medio |
| unDraw / Storyset / blobs 3D flotantes / ilustración "plástica" demasiado lisa | Ilustración de banco o de generador, reconocible al instante | Medio-alto |
| Inconsistencia de estilo entre imágenes (fotos + ilustraciones + generadas mezcladas) | Una marca real tiene coherencia; el sitio generado agarra lo que haya | Medio-alto |

### 5.6 Imagen generada y fotografía

Acá hay un matiz importante que la primera versión ya marcaba y que solo se acentuó: **los tells clásicos de imagen IA caducaron en buena parte**. Las manos con seis dedos, los ojos asimétricos y los artefactos obvios son cada vez más raros porque los generadores mejoraron mucho. Lo que todavía queda, de más a menos confiable:

| Señal | Estado en 2026 | Peso |
|---|---|---|
| Texto dentro de la imagen mal renderizado (carteles, etiquetas, letras deformadas o sin sentido) | Sigue siendo de los delatores más confiables | Alto |
| Suavidad y perfección antinaturales: piel demasiado lisa, iluminación "perfecta" sin fuente lógica, profundidad de campo que no cierra | Vigente | Medio-alto |
| Fondos que no resisten el zoom: detalles que se disuelven, geometrías imposibles, reflejos incoherentes | Vigente | Medio-alto |
| Composición demasiado limpia, sin el ruido de una foto real | Vigente pero sutil | Medio |
| Stock genérico: gente sonriendo en oficinas luminosas, handshakes, "equipo diverso frente a laptop" | No es IA pero es el mismo síntoma: imagen que no muestra nada real del producto o la gente | Medio |
| Mockup del producto flotando en marco de browser con glow | El formato exacto que todos los generadores producen | Medio |
| En video: cámara imposiblemente fluida, transiciones demasiado profesionales, microexpresiones raras | Vigente | Medio-alto |

### 5.7 Motion

| Señal | Por qué delata | Peso |
|---|---|---|
| El mismo fade-up en cada sección, con el mismo delay y duración | El default de Framer Motion (opacity + translateY) o de AOS aplicado globalmente; cero coreografía | Alto |
| Easing default (ease, linear, power1) en todo | Las curvas custom son de lo que más separa motion premium de genérico; su ausencia total delata | Medio |
| Animación que no guía atención ni cuenta nada | Motion porque la librería lo trae | Medio |
| prefers-reduced-motion ignorado | Nadie pensó en accesibilidad del movimiento | Medio |
| Marquee de logos infinito como único motion del sitio | El gesto de movimiento más barato disponible | Bajo-medio |
| Smooth scroll mal calibrado o mareante | Lenis o similar puesto "porque sí" | Medio |

### 5.8 Copy y contenido (la capa que más delata y la más ignorada)

La gente arregla los colores y se olvida del texto. El copy es donde la IA deja la huella más densa, porque el lenguaje tiene patrones estadísticos fortísimos.

**Vocabulario delator en inglés** (para sitios EN o para detectar traducción): verbos abstractos como delve, leverage, utilize, harness, streamline, underscore, embark; adjetivos inflados como robust, seamless, innovative, cutting-edge, pivotal, comprehensive, vibrant; sustantivos de relleno como landscape, realm, tapestry, synergy, testament, ecosystem, journey. Advertencia: este léxico **caduca rápido** (delve ya casi murió como tell porque los modelos aprendieron a evitarlo); usalo como indicio débil, nunca como bandera.

**Sus equivalentes calcados en español**, que en nuestro mercado delatan doble (generación + traducción): "sin costuras" (seamless), "robusto" para todo, "desbloqueá tu potencial", "impulsá/potenciá/elevá" como apertura de cada sección, "en el panorama actual", "un testimonio de", "sinergia", "ecosistema" fuera de contexto técnico.

| Señal | Por qué delata | Peso |
|---|---|---|
| Headlines vagas: "Construí el futuro del trabajo", "Tu plataforma todo-en-uno" | El promedio de todas las headlines que el modelo vio; no dice qué hace el producto | Alto |
| Tríadas perfectas ("Rápido. Simple. Seguro.") en cada sección | Estructura sintáctica de generación, documentada como tell de texto | Medio-alto |
| "No es X, es Y" y "desde X hasta Y" repetidos | Ídem | Medio |
| Placeholders sobrevivientes ("Jane Doe", lorem, "[beneficio]") | Nadie leyó el sitio completo ni una vez | Alto |
| Mezcla de tuteo y voseo en el mismo sitio | Nadie con oído nativo revisó el copy completo | Alto (en AR) |
| Signos de apertura ¿¡ ausentes | Generado o traducido desde inglés sin revisión | Alto (en ES) |
| Nav/secciones en inglés (Features, Pricing) en un sitio 100% en español | Esqueleto de template sin localizar | Medio-alto |
| Testimonios genéricos sin apellido, empresa verificable ni especificidad | Social proof de relleno | Alto |
| CTAs genéricos ("Empezar ahora", "Saber más") en todos los botones | Nadie escribió los botones; vinieron con el componente | Bajo-medio |
| Em-dashes en cantidad anómala en el copy visible | El tell de texto apareciendo dentro del diseño, porque la misma IA escribió ambos | Medio |
| Texto vago en general: mucho volumen, cero especificidad | El síntoma madre del copy generado | Alto |

### 5.9 Código y DOM: los fingerprints

La capa más forense y la más útil para un dev: strings que podés buscar en view-source o DevTools. La lista es criterio mío (verificala, es trivial), pero cada fingerprint es objetivo.

| Fingerprint | Qué indica | Cómo verlo |
|---|---|---|
| Variables --tw-* y clases con valores default de la paleta Tailwind | Tailwind sin sistema de tokens propio | DevTools → Computed / view-source |
| Variables --background, --foreground, --radius: 0.5rem en :root, keyframes de tailwindcss-animate | shadcn/ui con defaults intactos | view-source del CSS |
| Atributos data-radix-*, data-state="open" | Primitivas Radix (shadcn debajo); neutro en sí, diagnóstico en combo | Inspector |
| __NEXT_DATA__ / self.__next_f · astro-island · __NUXT__ | Framework: Next / Astro / Nuxt (neutro; sirve para el perfil) | view-source |
| data-wf-page, clases w-*, webflow.js · meta generator "Framer", assets de framerusercontent.com · wixstatic.com | Builder: Webflow / Framer / Wix | view-source / Network |
| Dominio *.lovable.app, *.vercel.app o *.netlify.app con nombre default; badge "Edit with Lovable" / "Made in Framer" | Deploy directo del generador, ni dominio propio | Barra de dirección / footer |
| Favicon default de Vite (vite.svg) o del builder; título "Vite + React" / "Create Next App" | Nadie tocó ni el título de la pestaña | Pestaña del browser |
| Divitis profunda, cero landmarks (main, nav, header), headings que saltan h1→h4 | HTML ensamblado sin semántica | Desactivar CSS / árbol de accesibilidad |
| Magic numbers en Tailwind (w-[347px], mt-[23px]) por todos lados | Valores arbitrarios en vez de escala; nadie definió sistema | Inspector |
| alt="" en imágenes con contenido, o alt="image" | Accesibilidad de placeholder | Inspector |
| console.log sueltos, comentarios "// Add your logic here", TODO en producción | Primer output shippeado sin review | Consola / source |
| package.json inflado con dependencias sin usar | El scaffold trajo de todo y nadie limpió | Repo si es público |
| og:image ausente o default del template; sin sitemap ni robots | El sitio nunca se pensó como algo que se comparte o se indexa | view-source / /sitemap.xml |

### 5.10 UX, comportamiento y estados

| Señal | Por qué delata | Peso |
|---|---|---|
| Solo happy path: sin loading, error ni empty states diseñados | El estado feliz es lo único que el primer output genera | Alto |
| Botones y formularios que no funcionan, o que no envían a ningún lado | Interfaz simulada | Alto |
| Links placeholder apuntando a # o a / | Ídem | Alto |
| 404 default del framework | Nadie llegó hasta ahí | Medio |
| Búsqueda que no busca, filtros que no filtran | Componentes decorativos | Alto |
| Responsive roto en breakpoints intermedios (768–1024px) | Anda en 375 y en 1440; se desarma en tablet, donde nadie miró | Medio-alto |
| Blog con 3 posts genéricos fechados el mismo día | Contenido de relleno para "parecer vivo" | Alto |
| Legales templateados con placeholders o ausentes | En Argentina además es exposición real (deber de información, defensa del consumidor) | Medio-alto |
| Focus outline removido, divs clickeables sin rol, sin skip-link | Accesibilidad de teclado inexistente; contraste bajo AA suma acá | Medio-alto |

### 5.11 Huella forense e infraestructura

Para auditar un sitio ajeno y confirmar sospechas, más allá de lo visual: **ver el código fuente** buscando comentarios delatores, generator tags y estructura típica del framework; **metadatos del head** que delatan el builder; **subdominios del builder** o badges "Made with…"; y si el repo es público, el **patrón de commits**: un único commit inicial gigante con todo el scaffold, o mensajes genéricos generados por el agente, son huella clara. Sobre los **escáneres de contenido IA** para texto (Originality, GPTZero, Copyleaks): útiles como señal, **nunca como prueba**. Son pattern-matchers con falsos positivos altísimos —le marcan "IA" hasta a textos clásicos— y se equivocan seguido. Un indicio entre varios, jamás un veredicto.

## 6. Jerarquía de confianza

No todos los indicadores pesan igual. La síntesis, de más confiable a más débil:

**Alta confianza (casi determinantes en cluster):** copy vago más placeholders sobrevivientes; botones y formularios que no funcionan, links a #; contraste bajo WCAG AA más ausencia de landmarks; texto deformado dentro de imágenes generadas; defaults de shadcn intactos más deploy en subdominio del builder; la fórmula estructural completa de la sección 4.

**Confianza media:** el combo estético completo (Inter sola + gradiente violeta + tríada de cards + border-radius uniforme); las estructuras sintácticas del copy (regla de tres, "no es X es Y"); responsive roto en breakpoints intermedios e inconsistencia entre páginas; DOM profundo y magic numbers.

**Baja confianza (no prueban nada solas):** palabras sueltas del léxico delator (caducan rápido); em-dashes y comillas curvas (mucha gente las usa bien y siempre las usó); el veredicto de un detector de IA aislado.

La regla operativa: **donde hay una señal suele haber varias; buscá el cluster, no la bandera.**

## 7. Caso profundo: las cards

### Por qué están en todos lados

La genealogía corta: Pinterest normalizó la grilla modular (2011), Material Design canonizó la card como metáfora (2014), Bootstrap 4 la volvió primitiva de framework (2018), y el mobile-first la premió porque las cards apilan solas. Después vino la pieza clave del ciclo actual: **shadcn/ui** (2023). Y acá hay una ironía documentada que vale entender bien, porque es el mecanismo entero de la sameness en miniatura.

shadcn/ui fue diseñado explícitamente como **punto de partida**: componentes sobre primitivas Radix, código abierto que copiás a tu proyecto justamente para modificarlo; su propio sitio dice, en esencia, "empezá acá y hacelo tuyo". Está bien construido: código limpio, accesibilidad correcta, defaults inteligentes. Lo que pasó después no es culpa de la librería: las herramientas de IA (v0, Bolt, Lovable, los agentes de código) necesitaban decidir qué componentes usar, adoptaron shadcn como fuente, y **trataron el punto de partida como sistema de diseño terminado**. Cero colores custom, cero ajuste de spacing, cero personalidad: los defaults directo a producción, millones de veces. El resultado es que la card de shadcn sin tocar (rounded-lg, borde gris de 1px, padding uniforme) se convirtió en la huella de CSS más reconocible de la era, y la queja "shadcn hizo que todo se vea igual" es técnicamente injusta pero fenomenológicamente cierta.

### El problema real (y no es estético)

Acá el marco más sólido es el de NN/g. Una card se justifica cuando el contenido es **heterogéneo**, la tarea es **browsing exploratorio**, y cada unidad es autónoma y accionable: el catálogo de productos con foto, precio y acción; el feed de contenido mixto; el dashboard con módulos de distinto tipo. Ahí la card hace su trabajo: agrupa, invita, contiene.

Los problemas empiezan cuando el contenido es **homogéneo y comparable**, que es exactamente el caso de las secciones de features, los listados y los resultados de búsqueda. NN/g es explícito: las cards **de-enfatizan jerarquía y ranking** (feature cuando navegás Netflix, bug cuando buscás algo específico), obligan a mover los ojos y cargar la memoria de trabajo para comparar —una tabla pone los datos adyacentes y elimina ese costo—, y desperdician espacio. Para contenido ordenable y comparable, lista o tabla ganan casi siempre. Que las cards estén sobreusadas como "opción segura" para todo, desde settings hasta resultados de búsqueda, ya es diagnóstico compartido incluso entre estudios de producto que viven de hacer SaaS.

Y hay un problema más profundo, que es el que tu ojo detecta: **la grilla de cards idénticas es la negación visual de la jerarquía**. Seis cajas del mismo tamaño le dicen al visitante que las seis cosas importan exactamente igual, lo cual nunca es cierto. La card te permite *no diseñar las relaciones entre los contenidos*: cada cosa en su caja, ninguna decisión sobre qué manda, qué acompaña y qué es nota al pie. Por eso lee a template: es literalmente diseño sin dirección de arte, empaquetado prolijo.

### Cuándo sí (para ser justos)

Colecciones heterogéneas navegables (e-commerce, portfolios con media mixta, feeds). Dashboards con módulos de distinta naturaleza. Unidades genuinamente autónomas con acción propia. Incluso ahí: con jerarquía interna (tamaños distintos, una card héroe), no en grilla plana.

### El repertorio de alternativas

Esto es criterio profesional destilado de los sitios premiados y de los patrones editoriales; ninguna fuente lo empaqueta así. Para cada situación donde el template pondría cards:

**Features de producto.** La alternativa más potente es la **narrativa seccionada con dirección de arte**: cada feature es una sección con su propio ritmo, escala y tratamiento visual (una a pantalla completa con el producto real, la siguiente densa y tipográfica, la tercera con un diagrama). Variás densidad en lugar de clonar contenedores. La lección del 46% limpio del estudio de Krebs aplica acá con fuerza: los sitios que zafan eligen **un solo primitivo de layout fuerte y lo repiten con disciplina** hasta que se vuelve firma, en lugar de siete tratamientos de card distintos.

**Listados (trabajos, artículos, productos comparables, catálogo).** El **índice tipográfico**: filas grandes donde el título es el protagonista, con metadata inline y media que se revela al hover. Es el patrón de portfolio de agencia premiada por excelencia, y funciona porque convierte la lista en pieza tipográfica. Variante más sobria: la **tabla editorial** o ficha técnica estilo suizo, con columnas reales, que además es lo que NN/g recomienda funcionalmente para contenido comparable. Una tabla bien tipografiada (números tabulares, reglas horizontales finas, aire) lee más premium que cualquier grilla de cards, precisamente porque casi nadie se anima a usarla.

**Contenido mixto con jerarquía.** El **stack editorial**: grilla de revista con columnas asimétricas, donde la jerarquía la hace la tipografía y la escala, no los contenedores. O el **split sticky**: media fija de un lado, texto que scrollea del otro; convierte una lista de puntos en un recorrido.

**Contenido denso de consulta (FAQs, specs).** Acordeón bien tipografiado o definition list (dt/dd), no cards.

**Colecciones visuales.** Collage con superposición y capas; scroll horizontal contenido (con fallback y accesibilidad); masonry con dirección de arte real en las imágenes.

La regla de decisión, en una línea: **homogéneo y comparable → lista o tabla; heterogéneo y navegable → cards con jerarquía; features de marketing → casi nunca cards, casi siempre narrativa.**

## 8. Caso profundo: las numeraciones

Acá hay dos especies distintas que conviene separar, porque tienen estatus de evidencia distinto.

**Especie A: los pasos "1, 2, 3" como sección** ("Cómo funciona: 1. Registrate, 2. Configurá, 3. Listo"). Esta está **medida**: es el patrón #13 de Krebs. Es la sección más perezosa del guion: tres cards numeradas que resumen cualquier producto del mundo en tres pasos intercambiables. El número finge una secuencia que no aporta nada (nadie necesita que le numeren "registrate" y "listo") y las tres cards son, otra vez, contenedores idénticos sin jerarquía.

**Especie B: la numeración decorativa 01/02/03** en eyebrows, headers de sección o ítems de lista ("01 — NOSOTROS"). Esta es folclore profesional, no está medida, pero la genealogía es clara: viene de los **folios editoriales** (revistas, annual reports suizos) donde el número *es navegación* dentro de una pieza larga. Los sitios de agencia de la era 2016–2019 la adoptaron como gesto de sofisticación editorial, los templates la copiaron, y los generadores la absorbieron. Hoy el "01" con cero de relleno adelante de cuatro secciones es sofisticación simulada: un número que no navega nada, no ordena nada real, y viene casi siempre pegado al label en all-caps (que sí está medido: patrón #16). Es el mismo mecanismo que la serif itálica de acento del patrón #3: el toque editorial enlatado, comprable en un clic.

### Cuándo los números sí corresponden

Cuando la secuencia es real y el orden importa: onboarding con dependencias, instructivos, recetas, documentación legal o de proceso, tablas de contenido de piezas largas donde el número es ancla navegable. En este mismo documento el protocolo de auditoría (sección 11) va numerado y la rúbrica de Krebs también: son secuencias y enumeraciones fijas de verdad. Ese es todo el criterio: **el número tiene que trabajar**. Si lo sacás y no se pierde nada, sobraba.

### Alternativas

Para el eyebrow decorativo: un **kicker con contenido real** (en lugar de "01 — SERVICIOS", una línea que diga algo: "Lo que hacemos cuando el proyecto ya arrancó"). Para la jerarquía de secciones: tipografía y escala, que es su trabajo. Para narrativas largas donde querés dar sensación de progreso: indicador ligado al scroll o running heads, descendientes legítimos del folio. Y para el "Cómo funciona": contalo como narrativa con verbos y evidencia (mostrá el paso, no lo numeres), o directamente eliminá la sección si los tres pasos eran genéricos, que casi siempre lo son.

## 9. Bento: la card grid con mejor prensa

Merece sección propia porque es el patrón que hoy está exactamente en la mitad del ciclo de vida de un cliché, y te va a aparecer en cada brief. La genealogía: raíces en el Metro UI de Windows Phone, popularización masiva por las páginas de producto de Apple, galería dedicada (bentogrids.com), adopción universal en SaaS 2024–2025. Estado actual: figura en la encuesta State of Creativity 2026 de Creative Boom entre las tendencias de las que los creativos ya están hartos, junto al glassmorphism y los gradientes. El diagnóstico de esa encuesta, dicho sea de paso, es la tesis de todo este documento en una frase: las quejas nunca son sobre la estética en sí, son sobre **la falta de intención** al usarla.

Lo importante técnicamente: el bento **bien hecho no es una grilla de cards**, es una decisión de arquitectura de información donde el tamaño del tile codifica importancia (el tile héroe de 2×2 manda, los satélites acompañan). La versión template lo pierde por completo: **tiles todos iguales, que es literalmente una card grid con las esquinas más redondas**, o el error inverso de dimensionar por cantidad de contenido en vez de por importancia. Si un cliente te lo pide, ese es el criterio para hacerlo bien o para argumentar en contra: ¿hay jerarquía real que el tamaño pueda codificar? Si no, es decoración con fecha de vencimiento ya visible.

## 10. La maquinaria de la sameness (por qué pasa)

Las señales son síntomas. Las causas, ordenadas de la más vieja a la más nueva, porque se apilan:

**Librerías compartidas.** La causa que Goree ya identificó para la era pre-IA: cuando miles de sitios comparten código fuente, comparten forma. Bootstrap ayer, shadcn hoy: el linaje es directo.

**Mobile-first.** La segunda causa de Goree: diseñar para columnas apilables aplastó la variedad de layouts. La card y el bento son hijos de esto.

**El loop de las galerías.** Creative Boom lo describe desde adentro: los creativos adoptan un lenguaje visual temprano, lo usan con propósito, y después miran cómo la masa lo replica hasta vaciarlo. Dribbble, las galerías de templates y los "trends 2026" son la maquinaria de ese vaciado.

**El monocultivo de conversión.** Cada "best practice" validada por A/B testing empuja hacia el mismo esqueleto. La comoditización de UX (escala y estandarización por encima de diferenciación) ya venía señalada como tendencia antes de la ola IA.

**La economía del clon Linear.** El caso de estudio perfecto: Linear construyó su look sobre Radix más un sistema de diseño propio y privado (Orbiter), al servicio de un producto y una audiencia específicos. Los mil clones copian la superficie (dark, violeta, tipografía grande) sin el sistema ni el producto que la justifica. Copiar el resultado de las decisiones de otro no es tomar decisiones; el "clon Stripe-meets-Linear" es hoy una categoría reconocible con nombre propio.

**La convergencia distribucional.** La causa nueva y la más estructural: un modelo predice lo más probable, y lo más probable es el promedio del corpus. Y el loop se cierra solo: el output de hoy es corpus de mañana, el slop entrena slop.

**La economía de la velocidad.** La parte incómoda y honesta: el default es gratis y la decisión cuesta. Krebs mismo lo dice: el slop no es malo, es *sin inspiración*, y para validar un negocio alcanza (el equivalente pre-LLM era todo el mundo usando Bootstrap, y nadie murió). El costo real no es conversión inmediata: es **diferenciación y memoria de marca**, que se encarecen a medida que el mar de páginas idénticas crece. Para tu posicionamiento comercial esta es la línea exacta: no vendés "sitios que no parecen IA", vendés que el cliente sea recordable en un mercado donde el default ya no distingue a nadie. Y si el presupuesto es mínimo, el consejo contraintuitivo de las fuentes es bueno: mejor feo con opinión que genérico sin opinión; una decisión fuerte (un color violento, una tipografía jugada, un layout raro) sostenida con disciplina rinde más que el pulido promedio.

## 11. Protocolo de auditoría (30–45 minutos)

Correlo contra cualquier sitio: uno tuyo antes de entregar, uno ajeno para diagnóstico, el de un competidor para posicionarte. Acumulá señales; el veredicto sale del cluster, nunca de un ítem. Numerado porque es secuencia real.

1. **Pasada de 5 segundos.** Abrí la home, mirá 5 segundos, cerrá. ¿Qué recordás? Si la respuesta es "un hero oscuro con gradiente y cards", ya sabés por dónde viene la mano. Después el squint test: entrecerrá los ojos; ¿hay jerarquía o una alfombra pareja de cajas?

2. **Test de intercambiabilidad.** Tapá el logo. ¿Podría ser el sitio de un competidor, o de otra industria? Anotá sí/no; es la señal madre.

3. **Conteo Krebs.** Recorré los 16 patrones de la sección 3 y contá. 0–1 limpio, 2–3 leve, 4+ pesado. Si querés automatizarlo tenés el método publicado: Playwright + chequeos de estilos computados; una tarde de laburo y te queda un CLI propio para correr junto a Lighthouse. Para tu flujo con clientes puede ser una herramienta de venta buenísima: "su sitio actual da 7/16".

4. **Tipografía.** DevTools → Computed sobre H1, cuerpo y labels. ¿Cuántas familias, pesos y tamaños distintos hay en todo el sitio? ¿Inter/Poppins/el combo Space Grotesk + Instrument Serif? ¿Hay ajuste de tracking por tamaño o todo viene de fábrica?

5. **Color.** Extraé la paleta computada. ¿Hexes default de Tailwind? ¿Lavanda? ¿Hay un color dominante con lógica semántica o un arcoíris tímido? Pasá el gris del texto de cuerpo por un checker de contraste; en dark themes generados falla seguido.

6. **Grilla y ritmo.** Overlay de columnas (extensión o regla CSS rápida). ¿Hay grilla real usada con intención? Medí el padding vertical de tres secciones consecutivas: ¿escala propia o el mismo valor apilado?

7. **Semántica.** Desactivá CSS o abrí el árbol de accesibilidad. ¿Landmarks? ¿Headings en orden? ¿Alt con contenido? Un sitio que sin CSS es una sopa de divs anónimos nunca pasó por review.

8. **Fingerprints.** view-source y buscá los strings de la sección 5.9: --tw-, variables de shadcn, data-radix, meta generator, badges de builder, favicon y título default, dominio del deploy. Si el repo es público, mirá el patrón de commits.

9. **Estados.** Mandá el form vacío. Buscá algo que no existe. Andá a /pagina-que-no-existe. Cliqueá cada link del footer. Todo lo que sea simulado o default, anotalo.

10. **Motion.** Scrolleá con ojo (o con la pestaña Performance abierta): ¿todas las secciones hacen el mismo fade-up con el mismo delay? Activá prefers-reduced-motion en el sistema y recargá: ¿el sitio lo respeta?

11. **Performance y accesibilidad.** Lighthouse completo. LCP del hero (la imagen de 2MB con glow es clásica), CLS por fuentes sin preload, score de accesibilidad, contraste.

12. **Copy en voz alta.** Leé el hero y una sección de features en voz alta. ¿Podés decir qué hace concretamente el producto? Contá tríadas y "no es X, es Y". En sitios en español: ¿registro consistente (voseo o tuteo, no ambos)? ¿Signos de apertura? ¿Calcos del inglés?

13. **Imagen.** ¿Las imágenes muestran el producto/lugar/gente real o son stock y generación? Reverse search de la hero si hay dudas; buscá los tells de la sección 5.6 (texto en imagen, fondos al zoom, perfección antinatural).

14. **Meta.** Compartí la URL en un chat privado: ¿aparece og:image decente? Revisá /sitemap.xml y /robots.txt. Mirá el favicon.

Cerrá con un veredicto de tres niveles como el de Krebs y una lista corta de los tres arreglos de mayor palanca. En mi experiencia (criterio), los tres que más mueven casi siempre son: tipografía propia, matar la grilla de cards por una de las alternativas de la sección 7, y reescribir el copy con especificidad.

---

# PARTE III — LA CONSTRUCCIÓN

## 12. El cambio de método: de vibe coding a spec-driven

El desarrollo con IA profesional de 2026 no son los generadores tipo v0, Lovable o Bolt: esa es la capa consumer, la que produce el slop. Entender la otra capa es la mitad de la respuesta.

**Spec-driven development (SDD).** El "vibe coding" —tirarle prompts conversacionales a un asistente hasta que algo funcione— chocó con la realidad a mediados de 2025: equipos ahogados en deuda técnica, agujeros de seguridad y código que compilaba pero no resolvía el problema correcto. La respuesta de la industria, hoy descrita por Thoughtworks y AWS como la práctica que reemplaza al vibe coding en trabajo serio: en vez de escribir código primero, escribís una **especificación compacta y testeable** que define comportamiento, restricciones y resultados esperados, y recién entonces dejás que el agente genere el código. El humano define el *qué*; la IA resuelve el *cómo*. AWS reportó haber bajado una feature de dos semanas a dos días con esta metodología (herramienta Kiro).

**Context engineering.** El complemento del SDD. Si el prompt engineering optimiza la interacción humano-LLM, el context engineering optimiza la interacción agente-LLM: curar deliberadamente qué información ve el modelo. En la práctica: archivos **AGENTS.md o CLAUDE.md** con las convenciones del proyecto, patrones arquitectónicos y estándares —y, crucialmente para el diseño, un **DESIGN.md con los tokens bloqueados** (paleta, tipografía, radios, texturas, motion), que es el antídoto directo contra la convergencia distribucional: las decisiones se toman una vez, se escriben como reglas, y el agente las ejecuta siempre—; más servidores **MCP** como Context7 que inyectan documentación real y actualizada en vez de que el modelo alucine APIs viejas. Consenso emergente: SDD y context engineering no compiten, son dos mitades de lo mismo. La spec dice qué construir; el contexto, con qué conocimiento.

**El setup en capas de los equipos serios.** No usan "una" herramienta de IA, usan una pila: copilots a nivel editor para sugerencias inline y refactors (Cursor, Copilot); agentes para descomposición de tareas y diffs de PR (Claude Code, Cursor agents); asistentes repo-aware que entienden el codebase entero para migraciones; IA en CI para generación de tests, escaneo de seguridad y hints de performance; e IA en discovery para specs, criterios de aceptación y edge cases. La diferencia con el slop es exactamente esta estructura: el generador te da un sitio entero de un prompt; este setup te da apalancamiento sobre un proceso que vos seguís controlando.

**El principio de fondo** (opinión bien fundada, no dato): la IA subió el piso, pero está subiendo el techo más rápido. Cualquiera puede shippear algo; mucha menos gente puede shippear sistemas que sobreviven. El rol del ingeniero se corrió de "escribir código" a ser un revisor excepcional y dueño de las decisiones. Para vos, que sos dev real, es buena noticia: la IA no te reemplaza, te saca los lugares donde esconderte.

## 13. El stack técnico premium

Lo que hay debajo de los sitios que ganan Awwwards y FWA. Marco qué está respaldado por las fuentes y qué es elección de criterio.

**Base / framework.** Next.js (App Router) sigue siendo el caballo de batalla para sites con lógica, contenido dinámico o e-commerce: es lo que conocés y es defendible. Astro cuando el sitio es mayormente contenido/marketing y querés JS mínimo y performance máxima; para una landing premium estática suele ganarle a Next en Core Web Vitals (recomendación de criterio). Y un detalle de los winners que documenta Codrops: muchos de los sitios más premiados se construyen en HTML/CSS/JS plano o Vite, sin framework, cuando la interacción es el centro y no quieren ceremonia de más.

**Estilos.** Tailwind, pero con design tokens propios: Tailwind no es el problema, usar sus defaults sin tocar sí. Definí tu escala de spacing, tu paleta y tu tipografía como tokens; Tailwind v4 mueve la config a CSS (@theme), lo cual facilita tener sistema propio. Y CSS moderno nativo: container queries, :has(), subgrid, scroll-driven animations; cada vez más cosas que antes pedían JS se hacen en CSS.

**Motion (el corazón del "feel" premium).** GSAP es el estándar de la industria para animación web de alto nivel; sus piezas clave: ScrollTrigger (animaciones atadas al scroll), SplitText (animar caracteres, palabras o líneas) y CustomEase (curvas de easing propias, lo que separa el motion premium del genérico). Dato relevante: tras la adquisición por Webflow, **GSAP pasó a ser completamente gratuito, incluidos los plugins que antes eran de pago**; ya no hay excusa de licencia. Motion (antes Framer Motion) sigue siendo la opción idiomática para animaciones declarativas de componentes en React. Conviven: Motion para UI de componentes, GSAP para coreografías de scroll complejas.

**Smooth scroll.** Lenis (Darkroom Engineering, ex Studio Freight) es la librería líder: ~3 kB, performante, usada por las top agencies, sincronizable con el ticker de GSAP. Es lo que da esa sensación inercial "física" en vez del scroll seco del browser; reemplazó en buena medida a Locomotive Scroll y a ScrollSmoother. Advertencia de criterio: el smooth scroll mal hecho arruina accesibilidad y marea; respetá prefers-reduced-motion y no lo metas porque sí.

**3D / WebGL.** Three.js es la librería dominante detrás de los ganadores de Awwwards y FWA: entornos 3D custom, partículas, shaders, visuales generativos. React Three Fiber si estás en React. WebGPU es el sucesor de WebGL, ya soportado en Chrome, Edge y Safari: mejor performance para escenas complejas a 60fps, ventaja técnica emergente de 2026 en adelante. Realismo: es pesado y específico; no todo sitio premium necesita 3D. Herramienta para cuando la experiencia lo justifica, no requisito.

**No-code premium (existe y es serio).** Framer y Webflow producen sitios de nivel Awwwards sin código, y muchos winners se hacen ahí. Conviene cuando el cliente necesita editar, el timeline es corto o el sitio es marketing puro; Framer tiene incluso componentes de GSAP listos. Recomendación honesta: si el proyecto pide interacción muy custom o se integra con tu backend, código gana; si es una landing de marca editable por el cliente, Framer/Webflow puede ser más rentable que codear todo.

**Performance (no es opcional en premium).** 60fps es el piso que los criterios de usabilidad de los awards exigen: una animación hermosa a 30fps con jank no es premium. Core Web Vitals, lazy loading, formatos modernos (AVIF/WebP), srcset. Es, junto con la accesibilidad, de lo que más falta en el output de IA sin curar.

## 14. El craft de diseño (lo que ningún stack te da gratis)

Las herramientas no hacen el diseño. Acá está el valor humano, y donde tu ojo marca la diferencia. Casi todo esto es criterio profesional, no dato medido.

**Tipografía (probablemente lo que más mueve la aguja).** El consenso de Awwwards es claro: casi todos los sitios premiados usan tipografía bold y expresiva como elemento hero; la fuente no es decoración, es la estructura. Salí de Inter y de Google Fonts default —no porque sean malas, sino porque son el promedio—. El camino son las type foundries. Accesibles y gratis de buena calidad: **Fontshare** (de Indian Type Foundry) tiene fuentes con carácter y licencia generosa; Bricolage Grotesque, Hanken Grotesk y similares (las que ya usás en Ordana) van por acá. Foundries premium de pago, nivel estudio: **Klim Type Foundry, Grilli Type, Pangram Pangram, ABC Dinamo, Colophon, Sharp Type, Commercial Type**; una sola buena fuente de pago cambia la percepción de todo el sitio. Variable fonts para control fino de peso/ancho/óptica y para performance (un archivo, muchos pesos). Y el detalle: tracking, leading, escala tipográfica con jerarquía real —no tres tamaños default—, siempre con la licencia web font en regla. Advertencia nueva que dejó la medición de Krebs: las fuentes que hoy funcionan como "escape" de Inter (Geist, Söhne, Untitled Sans) ya empiezan a aparecer en los combos default de los generadores. **No hay fuente refugio; hay decisión o no la hay.** El refugio es el proceso: elegir a propósito, con tokens propios, y poder explicar por qué.

**Composición y layout.** Grids reales (12 columnas o el que definas) usados con intención, incluyendo romperlos a propósito. Asimetría intencional y espacio negativo: lo premium tiene tensión, pesos desbalanceados a propósito, aire que respira. Densidad variable entre secciones, no el mismo padding apilado.

**Color.** Paletas que significan algo para la marca, con color semántico, no decorativo. Una paleta restringida y bien elegida lee más premium que un arcoíris de gradientes.

**Textura y materialidad.** Tendencia vigente en los premiados: grain y noise overlays, superficies con textura, el contraste entre lo limpio y lo crudo. Un sutil overlay de ruido sobre un fondo plano agrega tacto y aleja del look "vacío" generado.

**Motion con propósito.** La diferencia entre motion premium y fade genérico es la **coreografía**: staggered reveals, clip-path transitions, custom ease curves, animaciones que guían la atención y cuentan algo (scrollytelling), no que están porque la librería las trae. Transiciones de página, micro-interacciones en hover, y los estados (loading, error, empty) tratados como parte del diseño, no como afterthought.

## 15. Dónde encaja la IA: el reparto 70/30

La síntesis de las dos caras. La IA no es enemiga del trabajo premium; es una herramienta de velocidad que necesita curaduría humana. El reparto, según el consenso de las fuentes serias y mi criterio:

**La IA es buena para (usala sin culpa):** scaffolding y boilerplate (configs, estructura de carpetas, setup); lógica de negocio, integraciones y glue code que escribirías por décima vez; refactors, migraciones y navegar codebases heredados; generación de tests y escaneo de seguridad en CI; primeros borradores de contenido y copy (para después reescribir); y resolver "cómo hago X con GSAP/Three", donde acelera el aprendizaje.

**El humano manda en (acá está tu valor):** dirección de arte y sistema de diseño; elección tipográfica y composición; coreografía del motion y las custom ease; el copy final, con voz y especificidad; las decisiones de arquitectura y los trade-offs; y el review crítico de todo lo que la IA produjo.

**El patrón, en una frase:** la IA hace el primer 70% rápido; vos hacés el 30% que vuelve el sitio memorable, que es justo el que la IA promedia. El error del slop es entregar el 70%. El trabajo premium es el 30% restante.

## 16. Cómo se ve el 46% limpio

Del lado de los datos, lo que separa a las páginas limpias del estudio de Krebs son tres disciplinas, y ninguna es cara: **una paleta con punto de vista** que no sea el lavanda default (tierras cálidas, negro más un solo color violento, crema y rosa, lo que sea que signifique algo para la marca); **un sistema tipográfico que no sea Inter**, con pareja display/cuerpo real; y la más importante, **un solo primitivo de layout fuerte, repetido hasta volverse firma**: no siete tratamientos de card y cuatro tipos de sección, sino una idea compositiva sostenida.

Del lado del criterio, el contraejemplo útil es PostHog: rechaza de plano la estética dominante (mascota dibujada a mano, tipografía display propia con carácter, color saturado por sección) y su propia gente atribuye parte del crecimiento a haber "ganado siendo raros". No es que lo raro convierta per se; es que la personalidad sostenida con sistema es memorable, y lo memorable convierte a largo plazo.

Todo esto cierra el círculo con la sección 12: la sameness es lo que pasa cuando nadie escribió las reglas. El 46% limpio son, simplemente, los proyectos donde alguien las escribió.

---

# PARTE IV — RECURSOS

## 17. Para nutrir el ojo y la mano

Lo que más sube el nivel a largo plazo no es una herramienta: es ver mucho trabajo bueno hasta que se te calibra el criterio.

**Inspiración y referencia visual:** Awwwards, FWA y CSS Design Awards como estándar de lo premiado; Codrops/Tympanus para tutoriales técnicos de motion y demos (probablemente el mejor recurso para aprender el cómo); Godly, Land-book, Refero y SaaS Landing Page como galerías curadas de landings y patrones.

**Aprendizaje de motion y técnica:** la documentación oficial de GSAP (con sus learning resources) y de Lenis; Codrops para casos reales paso a paso.

**Tipografía:** Fontshare (gratis, calidad) y las foundries de pago listadas en la sección 14; Fonts In Use para ver tipografía aplicada en proyectos reales.

**Estudios de referencia para estudiar cómo lo hacen (criterio personal):** en producto/SaaS con diseño que convierte, Linear, Stripe y Vercel —prueban que lo distintivo convierte mejor que lo genérico—; en experiencias inmersivas y agencias, Active Theory, Resn, Locomotive, Igloo Inc y Studio Freight/Darkroom, referentes del lado WebGL/motion. Y como contraejemplo de personalidad: PostHog.

---

# CIERRE

## 18. Checklist maestra

Pasá cualquier proyecto por acá antes de entregar. Columna izquierda: con dirección. Columna derecha: template/slop con buena cara.

| Dimensión | Con dirección | Template / slop |
|---|---|---|
| Método | Spec-driven, tokens en DESIGN.md, IA curada, review | Vibe coding, primer output shippeado |
| Estructura de página | Guion propio; el orden de secciones cuenta algo | La fórmula de la sección 4, recitable de memoria |
| Tipografía | Foundry con carácter, jerarquía pensada, variable | Inter default, tres tamaños, serif itálica de acento |
| Color | Paleta con intención, semántica, contraste AA verificado | Gradiente violeta default, lavanda, gris al límite |
| Layout / composición | Asimetría intencional, grid roto a propósito, densidad variable | Todo centrado, simetría plana, mismo padding apilado |
| Colecciones | Lista/tabla para lo comparable; cards solo heterogéneo con jerarquía | Grilla de cards idénticas con ícono arriba |
| Numeración | Solo donde el número trabaja (secuencia real, TOC, folio) | Pasos 1-2-3 de relleno; 01/02/03 decorativo |
| Bento | Jerarquía por tamaño; tile héroe que manda | Tiles iguales = card grid con otro nombre |
| Eyebrow / badge | Kicker con contenido real, o nada | Pill con ✨ arriba del H1 |
| Forma | Radios, bordes y sombras variados con criterio | rounded-2xl universal, franja de color a la izquierda |
| Textura | Grain, materialidad, tacto | Superficies planas vacías o glass en todo |
| Iconografía | Sistema propio o set personalizado | Lucide en cuadradito al 10%, emojis en nav |
| Imagen | Producto/gente/lugar reales, con dirección de arte | Stock genérico, Corporate Memphis, blobs 3D, hero IA con tells |
| Motion | Coreografía, custom ease, propósito, reduced-motion respetado | Fade-in idéntico en cada sección |
| Copy | Voz propia, específico, ritmo variado | Vago, tríadas, placeholders, calcos del inglés |
| Copy ES | Voseo (o tuteo) consistente, ¿¡ presentes | Mezcla de registro, "sin costuras", Title Case |
| Código | Tokens, semántico, WCAG AA, 60fps | Magic numbers, divitis, defaults intactos |
| Fingerprints | Herramienta la que sea, con sistema propio encima | shadcn/Tailwind crudos, badge del builder, favicon de Vite |
| Estados | Loading/error/empty/404 diseñados | Solo happy path, form que no envía, links a # |
| Métricas | Verificables y específicas, o ninguna | Banner de 10k+/99.9%/24-7 |
| Meta / infra | OG, favicon, sitemap, dominio propio | Título "Create Next App", *.lovable.app |

## 19. La parte sincera: los matices que no caducan

Para cerrar honesto, no panfletario. Siete matices; los cinco primeros vienen de la primera versión y las mediciones nuevas los confirmaron en vez de invalidarlos.

**El verdadero tell es la falta de intención, no la IA.** Todo el documento se reduce a una cosa: nadie tomó decisiones. Un sitio hecho 100% con IA pero curado a fondo no se detecta. Uno hecho a mano por alguien apurado y sin criterio tiene los mismos síntomas. El enemigo no es la herramienta, es el modo default. La encuesta de Creative Boom llegó sola a la misma conclusión: las quejas nunca son sobre la estética, son sobre la intención.

**Los indicadores tienen fecha de vencimiento, y ahora más corta.** "Delve" murió como tell en un año. Ya existen skills y detectores anti-slop que corrigen el output contra estas mismas listas; cada patrón publicado se vuelve objetivo de entrenamiento. La rúbrica de Krebs es una foto de 2026. Lo que no caduca es el principio: convergencia al promedio = sospecha. Entrenate para oler el promedio, no para memorizar la lista.

**Cuidado con la sobre-corrección.** Con la lista en la mano vas a empezar a ver slop en trabajo legítimo: dark mode y Geist elegidos a propósito existen, y son la mayoría de los buenos dev tools. Los detectores automáticos sufren exactamente de esto: falsos positivos altísimos. La pregunta correcta nunca es "¿usó el patrón?" sino "¿hay una decisión detrás, y es consistente con el resto del sistema?".

**La acumulación es el método, ahora oficialmente.** Ningún indicador aislado es prueba; Krebs clasifica por conteo y asume 5–10% de falsos positivos aun con chequeos deterministas. Cluster o nada.

**La detección y la generación corren una carrera, y la generación gana.** Cada tell popularizado se entrena en contra. A mediano plazo los tells estéticos y de copy van a desaparecer. Lo que queda como diferencial humano no es "que no parezca IA": es tener algo específico para decir y decisiones reales detrás. Eso no lo promedia ningún modelo.

**El slop convierte; lo que pierde es memoria.** No le digas a un cliente que su sitio genérico "no funciona": probablemente funcione. Decile lo que los datos dicen: que es indistinguible, y que la diferenciación se encarece cada mes. Es un argumento comercial más fuerte y además es verdad.

**Para tu negocio, todo esto es ventaja.** Alrededor del 35% de la web nueva ya es genérica y convergente, y más de la mitad de los lanzamientos tech carga la huella. Si vos entregás sitios con voz propia, sistema de diseño real, copy específico y código accesible de verdad, no estás compitiendo contra la IA: estás haciendo exactamente lo que la IA no hace sola. Y ahora, además, tenés los números: tus dos manías —cards idénticas y numeraciones— figuran en una rúbrica medida con 22% de prevalencia las cards con ícono en el dataset de referencia. Criterio con datos atrás vale el doble en una negociación.

## 20. Fuentes

**Evidencia dura:** Goree, Doosti, Crandall & Su, *Investigating the Homogenization of Web Design: A Mixed-Methods Approach*, CHI 2021, ACM (doi 10.1145/3411764.3445156) — computer vision sobre capturas 2003–2019, caída >30% en distancia promedio de layouts desde 2007, entrevistas a 11 profesionales. Adrian Krebs, *Scoring Show HN submissions for AI design patterns* (adriankrebs.ch/blog/design-slop, 2026) — 1.590 páginas, Playwright, 16 patrones deterministas, distribución 22/32/46%, prevalencias por patrón, 5–10% de falsos positivos; desglose y cobertura en Developers Digest (2026). Estudio Imperial College London / Internet Archive / Stanford sobre prevalencia de sitios generados (2025). Yan et al. (2025) sobre código vulnerable generado por LLM (9,8%–42,1% según benchmark); papers de accesibilidad de código generado (MDPI, arXiv, Springer, ACM, 2024–2025); TechCrunch sobre el cohort YC W25.

**Consenso de industria:** NN/g — *Card View vs. List View* y *Data Tables: Four Major User Tasks* (criterios funcionales cards/listas/tablas). Documentación de shadcn/ui (diseño como punto de partida). Thoughtworks y Built In sobre spec-driven development y context engineering (2025–2026); Augment Code citando el paper foundational de SDD (arXiv, feb 2026); AWS/Kiro. LogRocket sobre el "Linear design" y sobre Radix + Orbiter (2025–2026). Overpass Studio sobre el clon Stripe-meets-Linear (2026). Creative Boom, *State of Creativity 2026* (fatiga de bento, glassmorphism y gradientes; la tesis de la intención). Bhuwan Garbuja sobre el pipeline shadcn→IA (2026). 925 Studios sobre convergencia distribucional y proyección de mercado (~USD 6.300M para 2026, orden de magnitud). StanVision y Eleken sobre sobreuso de cards (2026). Utsubo sobre criterios de premiación y Three.js/WebGPU; Codrops/Tympanus para el stack de motion (GSAP + Lenis); sitios oficiales de Lenis y GSAP; Awwwards (sitios premiados, 2026); Wikipedia *Signs of AI writing*; comparativas de generadores v0/Lovable/Bolt/Replit (2025–2026). Fuentes de práctica no académicas para listas operativas de tells: vibecodekit.dev y solodesign.cc (2026).

**Criterio profesional (mío, marcado en el texto):** los pesos de la taxonomía, el repertorio de alternativas de las secciones 7 y 8, las señales específicas del español rioplatense, la lista de fingerprints de código (verificables una por una), la genealogía del 01/02/03, el protocolo de auditoría como secuencia, y las recomendaciones de foundries tipográficas y estudios de referencia. Datos numéricos citados como orden de magnitud, salvo los del paper CHI 2021 y el estudio de Krebs, que son los reportados por sus autores.
