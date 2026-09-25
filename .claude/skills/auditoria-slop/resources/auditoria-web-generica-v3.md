# La web genérica al descubierto

**Auditoría definitiva · v3 · señales medidas, causas estructurales y el repertorio para no caer ahí · julio 2026**

---

## Nota de rigor (leer primero)

Mantengo el sistema de tres niveles de evidencia de la versión anterior, pero con una novedad importante: **la parte estética, que antes era casi toda folclore profesional, ahora tiene medición**. Entre la v1 y esta versión aparecieron dos anclas cuantitativas que cambian el estatus epistémico del tema:

1. **Evidencia dura.** El paper de Goree, Doosti, Crandall y Su (CHI 2021, ACM) que midió con computer vision la homogeneización visual de la web entre 2003 y 2019. Y, mucho más reciente y directo al punto: el estudio de Adrian Krebs (2026) que auditó **1.590 landing pages de Show HN con Playwright contra 16 patrones deterministas de "diseño IA"**, con chequeos de DOM y CSS computado (sin juez LLM, justamente para no contaminar la medición). Esto se puede reproducir.

2. **Consenso de industria.** NN/g sobre cards, listas y tablas; la documentación de shadcn/ui; los análisis del "Linear look"; la encuesta State of Creativity 2026 de Creative Boom sobre tendencias quemadas. Práctica viva, no ciencia, pero seria.

3. **Criterio profesional.** El repertorio de alternativas, los pesos que asigno a cada señal, las señales específicas del español y los fingerprints de código (que son verificables por vos, pero cuya lista armé yo). Lo marco donde aparece.

Regla transversal que ninguna medición cambia: **ninguna señal aislada prueba nada; el diagnóstico es siempre por acumulación**. El propio Krebs clasifica por conteo (4 o más patrones = slop pesado) y reporta 5–10% de falsos positivos incluso con chequeos deterministas. Un humano apurado y sin criterio produce exactamente los mismos síntomas que una IA sin dirección.

---

## Qué agrega esta versión

La v1 catalogó las señales en seis capas con jerarquía de confianza. La v2 dio vuelta la moneda: método (spec-driven, context engineering), stack premium y craft. Esta v3 hace tres cosas que faltaban: **ancla las señales en datos medidos** (ya no es solo "la comunidad dice"), **profundiza los dos patrones que más te molestan** —numeraciones y cards— con capítulos propios, historia, cuándo sí se justifican y un repertorio completo de alternativas, y **convierte todo en un protocolo de auditoría reproducible** que podés correr contra cualquier sitio (el tuyo, el de un competidor, el de un cliente) en media hora.

Un dato que valida tu instinto de entrada: las dos cosas que odiás no son manía tuya. **Las cards idénticas con ícono arriba y las secuencias numeradas 1-2-3 figuran, literalmente, entre los 16 patrones medidos** que delatan una landing generada sin intervención de criterio. Tu ojo detectó estadística antes de que alguien la midiera.

---

## Parte 1 — La sameness es medible (y anterior a la IA)

### El dato histórico: Goree et al., CHI 2021

Antes de hablar de IA conviene fijar esto: la homogeneización de la web **empezó mucho antes de los generadores**. El estudio de Indiana University aplicó computer vision a un dataset grande de capturas de sitios representativos entre 2003 y 2019 y encontró que los diseños se volvieron significativamente más parecidos desde 2007, con la distancia promedio entre layouts cayendo más de un 30%. El pico de diversidad estuvo alrededor de 2008–2010; de ahí en adelante, convergencia sostenida. Las causas que identificaron, combinando el análisis computacional con entrevistas a once profesionales: **superposición de código fuente y librerías compartidas** (la era Bootstrap), **estandarización de esquemas de color** y **el soporte mobile**, que aplastó la variedad de layouts posibles.

Esto importa por dos razones. Primera: el "look template" no lo inventó la IA; la IA lo **industrializó**, porque se entrenó sobre una web que ya venía convergiendo. Segunda: te da el argumento correcto frente a clientes o colegas. El problema nunca fue la herramienta (Bootstrap ayer, shadcn hoy, v0 mañana); el problema es la ausencia de decisiones sobre la herramienta.

### El dato actual: Krebs, 2026

Adrian Krebs corrió 1.590 landing pages de Show HN (la vidriera de lanzamientos de Hacker News, o sea: sesgo hacia productos tech construidos rápido, tenelo en cuenta) contra 16 patrones que diseñadores le describieron como delatores. El método es lo más valioso: Playwright carga cada página headless, un script recorre el DOM y lee estilos computados, y cada patrón es un chequeo determinista de CSS o DOM. Nada de un LLM mirando screenshots, que introduciría el sesgo que se quiere medir.

Los resultados: **22% de las páginas eran slop pesado** (4 o más patrones), **32% slop leve** (2–3), **46% limpias** (0–1). Más de la mitad del stream tiene la huella visual de "generado por una interfaz de chat sin opinión". Los tres patrones individuales más frecuentes: **dark mode permanente (34% de las páginas), fondos con gradiente (27%) y grillas de cards con ícono (22%)**.

Y una perla para tu colección: entre los diseñadores consultados, el **borde de color en el lado izquierdo de una card** (esa franjita de 3–4px violeta o azul) se describe como un delator casi tan confiable en diseño como el em-dash lo es en texto generado. Una vez que lo ves, no podés dejar de verlo.

### Los 16 patrones medidos

Los transcribo completos porque son tu nueva checklist base. Acá los números sí corresponden: es una rúbrica enumerada fija, no decoración.

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

Fijate el detalle fino de los patrones 12 y 13: no dicen "usar cards" ni "usar números". Dicen cards *idénticas* con ícono *arriba*, y pasos numerados como *estructura de sección*. La medición captura exactamente lo que vos venís señalando: el problema no es el contenedor ni el dígito, es la uniformidad sin decisión.

---

## Parte 2 — Anatomía de la fórmula

Antes de la taxonomía por capas, el esqueleto completo. Porque el tell más grande no es ningún elemento individual: es que **la página entera sigue un guion que podés recitar de memoria sin haberla visto**. Bajá por cualquier landing genérica de 2025–2026 y vas a encontrar, en este orden:

Barra de anuncio arriba ("🎉 Ya salió la v2"). Navbar con logo a la izquierda, links al centro, botón redondeado a la derecha. Hero centrado: badge pill con ✨, H1 enorme en Inter con una palabra en gradiente o en serif itálica, subtítulo en gris que no dice nada concreto, dos CTAs (uno sólido, uno fantasma), y abajo un mockup del producto flotando dentro de un marco de browser con glow violeta. Franja de logos "Confían en nosotros" en escala de grises. Sección de features: tres o seis cards idénticas, cada una con su ícono de Lucide dentro de un cuadradito redondeado con fondo de color al 10%. Sección "Cómo funciona" con pasos 1-2-3. Un bento o un zigzag imagen-texto. Banner de métricas. Muro de testimonios en cards con avatar. Pricing de tres tiers con el del medio resaltado como "Más popular". FAQ en acordeón. Sección CTA final con fondo de gradiente. Footer de cuatro columnas.

Cada pieza de ese guion existe por una razón de conversión defendible. El problema es que **el guion completo es un commodity**: cuando la estructura entera es predecible, el visitante ya "leyó" tu sitio antes de leerlo, y no queda nada para recordar. Un test brutal y gratis que uso como primer filtro (criterio mío): **tapá el logo. Si el sitio podría ser de cualquier competidor —o de un producto de otra industria— sin cambiar nada más que el nombre, es template**, lo haya hecho una IA o una persona.

---

## Parte 3 — Taxonomía ampliada por capas

Las señales, organizadas por capa, con un **peso** asignado. El peso no es "qué tan feo es" sino qué tan específico y diagnóstico es el patrón: cuánto más frecuente es en trabajo sin curar que en trabajo con dirección. Alto = señal fuerte por sí sola (pero nunca prueba); medio = suma en acumulación; bajo = casi ruido, solo cuenta en cluster. Los pesos son criterio mío informado por las prevalencias de Krebs y el consenso de las fuentes; tomalos como calibración inicial, no como tabla de la ley.

### 3.1 Estructura y layout

| Señal | Por qué delata | Peso |
|---|---|---|
| El guion completo de la Parte 2, en orden | Estructura ensamblada, no autorada | Alto |
| Todo centrado, simetría plana en cada sección | Ausencia de tensión compositiva; el centro es el default de quien no decidió | Medio |
| Cards de features idénticas, ícono arriba (Krebs #12, 22% de prevalencia) | El contenedor reemplazó a la decisión de jerarquía | Alto |
| Pasos numerados 1-2-3 como sección (Krebs #13) | Número decorativo sin función; ver Parte 5 | Alto |
| Numeración 01/02/03 en eyebrows y headers de sección | Folio editorial vaciado de función; suele venir con all-caps (#16) | Medio-alto |
| Zigzag imagen-texto idéntico repetido N veces | Ritmo monótono; la misma sección clonada con otro título | Medio |
| Bento de tiles iguales | Si todos los bloques miden lo mismo, es una card grid con otro nombre; ver Parte 6 | Medio |
| Mismo padding vertical apilado en todas las secciones | Densidad uniforme = ninguna sección importa más que otra | Medio |
| Banner de métricas infladas (Krebs #14) | "10k+ usuarios" en un producto lanzado ayer; la métrica como decoración | Alto |
| Cards adentro de cards ("cardocalypse") | Contenedores anidados porque cada componente vino en su cajita | Alto |
| Footer de 4 columnas con links a "#" | Estructura simulada; la página finge una arquitectura que no existe | Alto |

### 3.2 Componentes y forma

| Señal | Por qué delata | Peso |
|---|---|---|
| Borde de color izquierdo/superior en cards (Krebs #11) | El delator más específico de la lista; comparado con el em-dash del texto | Alto |
| Badge/pill con ✨ arriba del H1 (Krebs #10) | El "eyebrow pill", uniforme oficial de la landing generada | Alto |
| border-radius idéntico en absolutamente todo (16px/rounded-2xl) | Una sola decisión de forma estirada a todo el sistema | Medio |
| shadow-lg / glow uniforme en cada superficie | Profundidad sin lógica de luz; todo flota igual | Medio |
| Glassmorphism en todo | Default LLM desde 2022; el Liquid Glass de Apple (2025) lo turboalimentó justo cuando la fatiga ya venía creciendo | Medio |
| Botones que "saltan" al hover en vez de transicionar con easing | Interacción sin coreografía; nadie tocó las curvas | Medio |
| Hover states que no hacen nada | El componente vino con el estado pero nadie lo conectó a una intención | Medio |
| Toggle de dark mode en una landing de marketing que nadie pidió | Feature de template, no decisión de marca | Bajo |

### 3.3 Tipografía

| Señal | Por qué delata | Peso |
|---|---|---|
| Inter para todo (Krebs #1) | La Helvetica de la era LLM; excelente fuente convertida en ausencia de elección | Medio (solo), Alto (en combo) |
| Space Grotesk + Instrument Serif, o Geist por default (Krebs #2) | Los combos que los generadores repiten; ojo: Geist elegida a propósito es otra cosa | Medio-alto |
| Una palabra del hero en serif itálica (Krebs #3) | El "toque editorial" enlatado; sofisticación simulada en un clic | Alto |
| Tres tamaños tipográficos en todo el sitio | Escala default, sin jerarquía real | Medio |
| tracking-tight en el H1 gigante + subtítulo gris | La fórmula tipográfica del hero SaaS, calcada | Medio |
| Title Case En Cada Palabra en un sitio en español | El title case no existe en español; delata traducción o generación desde inglés | Alto (en ES) |
| Sin ajustes de tracking/leading por tamaño, sin óptica | Nadie miró la tipografía de cerca | Medio |

### 3.4 Color y efectos

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

### 3.5 Iconografía e imagen

| Señal | Por qué delata | Peso |
|---|---|---|
| Ícono de Lucide/Heroicons dentro de cuadradito redondeado con fondo al 10% | El átomo de la card de feature genérica | Alto |
| Un ícono gigante redondeado centrado arriba de cada heading | Variante del anterior, misma ausencia de sistema propio | Medio-alto |
| Emojis como íconos de nav o sidebar (Krebs #15) | Iconografía de placeholder que quedó en producción | Alto |
| Ilustraciones "plásticas" demasiado lisas / blobs 3D flotantes | El estilo de ilustración que los generadores producen por default | Medio-alto |
| Corporate Memphis / unDraw / Storyset sin personalizar | Ilustración de banco, reconocible al instante | Medio |
| Stock genérico ("equipo diverso frente a laptop") | Imagen que no muestra nada del producto ni de la gente real | Medio |
| Imágenes hero generadas con IA con tells (manos, texto ilegible, texturas fundidas) | Doble señal: ni foto real ni ilustración con sistema | Alto |
| Mockup del producto flotando en marco de browser con glow | El formato exacto que todos los generadores producen | Medio |

### 3.6 Motion

| Señal | Por qué delata | Peso |
|---|---|---|
| El mismo fade-up en cada sección, con el mismo delay y duración | Animación de librería aplicada globalmente; cero coreografía | Alto |
| Easing default (ease, linear, power1) en todo | Las curvas custom son de las cosas que más separan motion premium de genérico; su ausencia total delata | Medio |
| Animación que no guía atención ni cuenta nada | Motion porque la librería lo trae | Medio |
| prefers-reduced-motion ignorado | Nadie pensó en accesibilidad del movimiento | Medio |
| Marquee de logos infinito como único motion del sitio | El gesto de movimiento más barato disponible | Bajo-medio |
| Smooth scroll mal calibrado o mareante | Lenis o similar puesto "porque sí" | Medio |

### 3.7 Copy (con señales específicas del español)

| Señal | Por qué delata | Peso |
|---|---|---|
| Headlines vagas: "Construí el futuro del trabajo", "Tu plataforma todo-en-uno" | El promedio de todas las headlines que el modelo vio; no dice qué hace el producto | Alto |
| Tríadas perfectas ("Rápido. Simple. Seguro.") en cada sección | Estructura sintáctica de generación, ya documentada como tell de texto | Medio-alto |
| "No es X, es Y" repetido | Ídem | Medio |
| Vocabulario calcado del inglés: "sin costuras" (seamless), "desbloqueá tu potencial", "impulsá/potenciá/elevá" como apertura de cada sección | Traducción de template, no voz propia | Alto (en ES) |
| Mezcla de tuteo y voseo en el mismo sitio | Nadie con oído nativo revisó el copy completo | Alto (en AR) |
| Signos de apertura ¿¡ ausentes | Generado o traducido desde inglés sin revisión | Alto (en ES) |
| Nav/secciones en inglés (Features, Pricing) en un sitio 100% en español | Esqueleto de template sin localizar | Medio-alto |
| Testimonios genéricos sin apellido, empresa verificable ni especificidad | Social proof de relleno | Alto |
| CTAs genéricos ("Empezar ahora", "Saber más") en todos los botones | Nadie escribió los botones; vinieron con el componente | Bajo-medio |
| Em-dashes en cantidad anómala dentro del copy visible | El tell de texto apareciendo dentro del diseño, porque la misma IA escribió ambos | Medio |

### 3.8 Código y DOM (fingerprints verificables)

Esta capa es la más forense y la más útil para vos como dev: son strings que podés buscar en view-source o DevTools. La lista es criterio mío (verificala vos, es trivial), pero cada fingerprint es objetivo.

| Fingerprint | Qué indica | Cómo verlo |
|---|---|---|
| Variables `--tw-*` y clases con valores default de la paleta Tailwind | Tailwind sin sistema de tokens propio | DevTools → Computed / view-source |
| Variables `--background`, `--foreground`, `--radius: 0.5rem` en `:root`, keyframes de tailwindcss-animate | shadcn/ui con defaults intactos | view-source del CSS |
| Atributos `data-radix-*`, `data-state="open"` | Primitivas Radix (shadcn debajo); neutro en sí, diagnóstico en combo con lo anterior | Inspector |
| `__NEXT_DATA__` / `self.__next_f` · `<astro-island>` · `__NUXT__` | Framework: Next / Astro / Nuxt (neutro; sirve para el perfil) | view-source |
| `data-wf-page`, clases `w-*`, webflow.js · meta generator "Framer", assets de framerusercontent.com · wixstatic.com | Builder: Webflow / Framer / Wix | view-source / Network |
| Dominio *.lovable.app, *.vercel.app o *.netlify.app con nombre de proyecto default; badge "Edit with Lovable" / "Made in Framer" | Deploy directo del generador, ni dominio propio | Barra de dirección / footer |
| Favicon default de Vite (vite.svg) o del builder; `<title>` "Vite + React" / "Create Next App" | Nadie tocó ni el título de la pestaña | Pestaña del browser |
| Divitis profunda, cero landmarks (`main`, `nav`, `header`), headings que saltan h1→h4 | HTML ensamblado sin semántica | Desactivar CSS / árbol de accesibilidad |
| `alt=""` en imágenes con contenido, o `alt="image"` | Accesibilidad de placeholder | Inspector |
| `console.log` sueltos, comentarios "// Add your logic here", TODO en producción | Primer output shippeado sin review | Consola / source |
| `og:image` ausente o default del template; sin sitemap ni robots | El sitio nunca se pensó como algo que se comparte o se indexa | view-source / /sitemap.xml |

### 3.9 UX, contenido y estados

| Señal | Por qué delata | Peso |
|---|---|---|
| Solo happy path: sin loading, error ni empty states diseñados | El estado feliz es lo único que el primer output genera | Alto |
| Forms sin validación visible o que no envían a ningún lado | Interfaz simulada | Alto |
| 404 default del framework | Nadie llegó hasta ahí | Medio |
| Búsqueda que no busca, filtros que no filtran | Componentes decorativos | Alto |
| Blog con 3 posts genéricos fechados el mismo día | Contenido de relleno para "parecer vivo" | Alto |
| Legales templateados con placeholders o directamente ausentes | En Argentina además es exposición real (deber de información, defensa del consumidor) | Medio-alto |
| Breakpoints intermedios rotos (tablet, ~900px) | Solo se probó en el viewport del generador | Medio |
| Focus outline removido, divs clickeables sin rol | Accesibilidad de teclado inexistente | Medio-alto |

---

## Parte 4 — Caso profundo: las cards

### Por qué están en todos lados

La genealogía corta: Pinterest normalizó la grilla modular (2011), Material Design canonizó la card como metáfora (2014), Bootstrap 4 la volvió primitiva de framework (2018), y el mobile-first la premió porque las cards apilan solas. Después vino la pieza clave del ciclo actual: **shadcn/ui** (2023). Y acá hay una ironía documentada que vale la pena entender bien, porque es el mecanismo entero de la sameness en miniatura.

shadcn/ui fue diseñado explícitamente como **punto de partida**: componentes sobre primitivas Radix, código abierto que copiás a tu proyecto justamente para modificarlo; su propio sitio dice, en esencia, "empezá acá y hacelo tuyo". Está bien construido: código limpio, accesibilidad correcta, defaults inteligentes. Lo que pasó después no es culpa de la librería: las herramientas de IA (v0, Bolt, Lovable, los agentes de código) necesitaban decidir qué componentes usar, adoptaron shadcn como fuente, y **trataron el punto de partida como sistema de diseño terminado**. Cero colores custom, cero ajuste de spacing, cero personalidad: los defaults directo a producción, millones de veces. El resultado es que la card de shadcn sin tocar (rounded-lg, borde gris de 1px, padding uniforme) se convirtió en la huella de CSS más reconocible de la era, y la queja "shadcn hizo que todo se vea igual" es técnicamente injusta pero fenomenológicamente cierta.

### El problema real (y no es estético)

Acá me apoyo en NN/g, que tiene el marco más sólido. Una card se justifica cuando el contenido es **heterogéneo**, la tarea es **browsing exploratorio**, y cada unidad es autónoma y accionable: el catálogo de productos con foto, precio y acción; el feed de contenido mixto; el dashboard con módulos de distinto tipo. Ahí la card hace su trabajo: agrupa, invita, contiene.

Los problemas empiezan cuando el contenido es **homogéneo y comparable**, que es exactamente el caso de las secciones de features, los listados y los resultados de búsqueda. NN/g es explícito: las cards **de-enfatizan jerarquía y ranking** (feature cuando navegás Netflix, bug cuando buscás algo específico), obligan a mover los ojos y cargar la memoria de trabajo para comparar (una tabla pone los datos adyacentes y elimina ese costo), y desperdician espacio. Para contenido ordenable y comparable, lista o tabla ganan casi siempre. Que las cards estén sobreusadas como "opción segura" para todo, desde settings hasta resultados de búsqueda, ya es diagnóstico compartido incluso entre estudios de producto que viven de hacer SaaS.

Y hay un problema más profundo, que es el que tu ojo detecta: **la grilla de cards idénticas es la negación visual de la jerarquía**. Seis cajas del mismo tamaño le dicen al visitante que las seis cosas importan exactamente igual, lo cual nunca es cierto. La card te permite *no diseñar las relaciones entre los contenidos*: cada cosa en su caja, ninguna decisión sobre qué manda, qué acompaña y qué es nota al pie. Por eso lee a template: es literalmente diseño sin dirección de arte, empaquetado prolijo.

### Cuándo sí (para ser justos)

Colecciones heterogéneas navegables (e-commerce, portfolios con media mixta, feeds). Dashboards con módulos de distinta naturaleza. Unidades genuinamente autónomas con acción propia. Incluso ahí: con jerarquía interna (tamaños distintos, una card héroe), no en grilla plana.

### El repertorio de alternativas

Esto es criterio profesional destilado de los sitios premiados y de los patrones editoriales; ninguna fuente lo empaqueta así, lo armé para tu caja de herramientas. Para cada situación donde el template pondría cards:

**Features de producto.** La alternativa más potente es la **narrativa seccionada con dirección de arte**: cada feature es una sección con su propio ritmo, escala y tratamiento visual (una a pantalla completa con el producto real, la siguiente densa y tipográfica, la tercera con un diagrama). Variás densidad en lugar de clonar contenedores. La lección del 46% limpio de Krebs aplica acá con fuerza: los sitios que zafan eligen **un solo primitivo de layout fuerte y lo repiten con disciplina** hasta que se vuelve firma, en lugar de siete tratamientos de card distintos.

**Listados (trabajos, artículos, productos comparables, catálogo).** El **índice tipográfico**: filas grandes donde el título es el protagonista, con metadata inline y media que se revela al hover. Es el patrón de portfolio de agencia premiada por excelencia, y funciona porque convierte la lista en pieza tipográfica. Variante más sobria: la **tabla editorial** o ficha técnica estilo suizo, con columnas reales, que además es lo que NN/g recomienda funcionalmente para contenido comparable. Una tabla bien tipografiada (buenos números tabulares, reglas horizontales finas, aire) lee más premium que cualquier grilla de cards, precisamente porque casi nadie se anima a usarla.

**Contenido mixto con jerarquía.** El **stack editorial**: grilla de revista con columnas asimétricas, donde la jerarquía la hace la tipografía y la escala, no los contenedores. O el **split sticky**: media fija de un lado, texto que scrollea del otro; convierte una lista de puntos en un recorrido.

**Contenido denso de consulta (FAQs, specs).** Acordeón bien tipografiado o definition list (`dt`/`dd`), no cards.

**Colecciones visuales.** Collage con superposición y capas; scroll horizontal contenido (con fallback y a11y); masonry con dirección de arte real en las imágenes.

La regla de decisión, en una línea: **homogéneo y comparable → lista o tabla; heterogéneo y navegable → cards con jerarquía; features de marketing → casi nunca cards, casi siempre narrativa**.

---

## Parte 5 — Caso profundo: las numeraciones

Acá hay dos especies distintas que conviene separar, porque tienen estatus de evidencia distinto.

**Especie A: los pasos "1, 2, 3" como sección** ("Cómo funciona: 1. Registrate, 2. Configurá, 3. Listo"). Esta está **medida**: es el patrón #13 de Krebs. Es la sección más perezosa del guion: tres cards numeradas que resumen cualquier producto del mundo en tres pasos intercambiables. El número finge una secuencia que no aporta nada (nadie necesita que le numeren "registrate" y "listo") y las tres cards son, otra vez, contenedores idénticos sin jerarquía.

**Especie B: la numeración decorativa 01/02/03** en eyebrows, headers de sección o ítems de lista ("01 — NOSOTROS"). Esta es folclore profesional, no está medida, pero la genealogía es clara: viene de los **folios editoriales** (revistas, annual reports suizos) donde el número *es navegación* dentro de una pieza larga. Los sitios de agencia de la era 2016–2019 la adoptaron como gesto de sofisticación editorial, los templates la copiaron, y los generadores la absorbieron. Hoy el "01" con cero de relleno adelante de cuatro secciones es sofisticación simulada: un número que no navega nada, no ordena nada real, y viene casi siempre pegado al label en all-caps (que sí está medido: patrón #16). Es exactamente el mismo mecanismo que la serif itálica de acento del patrón #3: el toque editorial enlatado, comprable en un clic.

### Cuándo los números sí corresponden

Cuando la secuencia es real y el orden importa: onboarding con dependencias, instructivos, recetas, documentación legal o de proceso, tablas de contenido de piezas largas donde el número es ancla navegable. Fijate que en este mismo documento el protocolo de auditoría (Parte 8) va numerado y la rúbrica de Krebs también: son secuencias y enumeraciones fijas de verdad. Ese es todo el criterio: **el número tiene que trabajar**. Si lo sacás y no se pierde nada, sobraba.

### Alternativas

Para el eyebrow decorativo: un **kicker con contenido real** (en lugar de "01 — SERVICIOS", una línea que diga algo: "Lo que hacemos cuando el proyecto ya arrancó"). Para la jerarquía de secciones: tipografía y escala, que es su trabajo. Para narrativas largas donde querés dar sensación de progreso: indicador ligado al scroll o running heads, que son los descendientes legítimos del folio. Y para el "Cómo funciona": contalo como narrativa con verbos y evidencia (mostrá el paso, no lo numeres), o directamente eliminá la sección si los tres pasos eran genéricos, que casi siempre lo son.

---

## Parte 6 — Bento: la card grid con mejor prensa

Merece parte propia porque es el patrón que hoy está exactamente en la mitad del ciclo de vida de un cliché, y te va a aparecer en cada brief. La genealogía: raíces en el Metro UI de Windows Phone, popularización masiva por las páginas de producto de Apple, galería dedicada (bentogrids.com), adopción universal en SaaS 2024–2025. Estado actual: figura en la encuesta State of Creativity 2026 de Creative Boom entre las tendencias de las que los creativos ya están hartos, junto al glassmorphism y los gradientes. El diagnóstico de esa encuesta, dicho sea de paso, es la tesis de todo este documento en una frase: las quejas nunca son sobre la estética en sí, son sobre **la falta de intención** al usarla.

Lo importante técnicamente: el bento **bien hecho no es una grilla de cards**, es una decisión de arquitectura de información donde el tamaño del tile codifica importancia (el tile héroe de 2×2 manda, los satélites acompañan). La versión template lo pierde por completo: **tiles todos iguales, que es literalmente una card grid con las esquinas más redondas**, o el error inverso de dimensionar por cantidad de contenido en vez de por importancia. Si un cliente te lo pide, ese es el criterio para hacerlo bien o para argumentar en contra: ¿hay jerarquía real que el tamaño pueda codificar? Si no, es decoración con fecha de vencimiento ya visible.

---

## Parte 7 — Por qué pasa: la maquinaria de la sameness

Las señales son síntomas. Las causas, ordenadas de la más vieja a la más nueva, porque se apilan:

**Librerías compartidas.** La causa que Goree ya identificó para la era pre-IA: cuando miles de sitios comparten código fuente, comparten forma. Bootstrap ayer, shadcn hoy: el linaje es directo.

**Mobile-first.** La segunda causa de Goree: diseñar para columnas apilables aplastó la variedad de layouts. La card y el bento son hijos de esto.

**El loop de las galerías.** Creative Boom lo describe bien desde adentro: los creativos adoptan un lenguaje visual temprano, lo usan con propósito, y después miran cómo la masa lo replica hasta vaciarlo. Dribbble, las galerías de templates y los "trends 2026" son la maquinaria de ese vaciado.

**El monocultivo de conversión.** Cada "best practice" validada por A/B testing empuja hacia el mismo esqueleto. La comoditización de UX (escala y estandarización por encima de diferenciación) ya venía señalada como tendencia antes de la ola IA.

**La economía del clon Linear.** El caso de estudio perfecto: Linear construyó su look sobre Radix más un sistema de diseño propio y privado (Orbiter), al servicio de un producto y una audiencia específicos. Los mil clones copian la superficie (dark, violeta, tipografía grande) sin el sistema ni el producto que la justifica. Copiar el resultado de las decisiones de otro no es tomar decisiones; el "Stripe-meets-Linear clone" es hoy una categoría reconocible con nombre propio.

**La convergencia distribucional.** La causa nueva y la más estructural: un modelo de lenguaje predice lo más probable, y lo más probable es el promedio del corpus. El promedio de todas las landings es una landing promedio: hero centrado, botón azul-violeta, tres cards. Un promedio no es un estilo; es la ausencia de uno. Y el loop se cierra solo: el output de hoy es corpus de mañana, el slop entrena slop.

**La economía de la velocidad.** La parte incómoda y honesta: el default es gratis y la decisión cuesta. Krebs mismo lo dice: el slop no es malo, es *sin inspiración*, y para validar un negocio alcanza (el equivalente pre-LLM era todo el mundo usando Bootstrap, y nadie murió). El costo real no es conversión inmediata: es **diferenciación y memoria de marca**, que se encarecen a medida que el mar de páginas idénticas crece. Para tu posicionamiento comercial esta es la línea exacta: no vendés "sitios que no parecen IA", vendés que el cliente sea recordable en un mercado donde el default ya no distingue a nadie. Y si el presupuesto es mínimo, el consejo de la fuente es bueno y contraintuitivo: mejor feo con opinión que genérico sin opinión; una decisión fuerte (un color violento, una tipografía jugada, un layout raro) sostenida con disciplina rinde más que el pulido promedio.

---

## Parte 8 — Protocolo de auditoría (30–45 minutos)

Correlo contra cualquier sitio: uno tuyo antes de entregar, uno ajeno para diagnóstico, el de un competidor para posicionarte. Acumulá señales; el veredicto sale del cluster, nunca de un ítem. Numerado porque es secuencia real.

1. **Pasada de 5 segundos.** Abrí la home, mirá 5 segundos, cerrá. ¿Qué recordás? Si la respuesta es "un hero oscuro con gradiente y cards", ya sabés por dónde viene la mano. Después el squint test: entrecerrá los ojos; ¿hay jerarquía o una alfombra pareja de cajas?

2. **Test de intercambiabilidad.** Tapá el logo. ¿Podría ser el sitio de un competidor, o de otra industria? Anotá sí/no; es la señal madre.

3. **Conteo Krebs.** Recorré los 16 patrones de la Parte 1 y contá. 0–1 limpio, 2–3 leve, 4+ pesado. Si querés automatizarlo tenés el método publicado: Playwright + chequeos de estilos computados; una tarde de laburo y te queda un CLI propio para correr junto a Lighthouse (para tu flujo con clientes puede ser una herramienta de venta buenísima: "su sitio actual da 7/16").

4. **Tipografía.** DevTools → Computed sobre H1, cuerpo y labels. ¿Cuántas familias, pesos y tamaños distintos hay en todo el sitio? ¿Inter/Poppins/el combo Space Grotesk + Instrument Serif? ¿Hay ajuste de tracking por tamaño o todo viene de fábrica?

5. **Color.** Extraé la paleta computada. ¿Hexes default de Tailwind? ¿Lavanda? ¿Hay un color dominante con lógica semántica o un arcoíris tímido? Pasá el gris del texto de cuerpo por un checker de contraste; en dark themes generados falla seguido.

6. **Grilla y ritmo.** Overlay de columnas (extensión o regla CSS rápida). ¿Hay grilla real usada con intención? Medí el padding vertical de tres secciones consecutivas: ¿escala propia o el mismo valor apilado?

7. **Semántica.** Desactivá CSS o abrí el árbol de accesibilidad. ¿Landmarks? ¿Headings en orden? ¿Alt con contenido? Un sitio que sin CSS es una sopa de divs anónimos nunca pasó por review.

8. **Fingerprints.** view-source y buscá los strings de la sección 3.8: `--tw-`, variables de shadcn, `data-radix`, meta generator, badges de builder, favicon y `<title>` default, dominio del deploy.

9. **Estados.** Mandá el form vacío. Buscá algo que no existe. Andá a /pagina-que-no-existe. Cliqueá cada link del footer. Todo lo que sea simulado o default, anotalo.

10. **Motion.** Scrolleá con la pestaña de Performance abierta o simplemente con ojo: ¿todas las secciones hacen el mismo fade-up con el mismo delay? Activá prefers-reduced-motion en el sistema y recargá: ¿el sitio lo respeta?

11. **Performance y a11y.** Lighthouse completo. LCP del hero (la imagen de 2MB con glow es clásica), CLS por fuentes sin preload, score de accesibilidad.

12. **Copy en voz alta.** Leé el hero y una sección de features en voz alta. ¿Podés decir qué hace concretamente el producto? Contá tríadas y "no es X, es Y". En sitios en español: ¿registro consistente (voseo o tuteo, no ambos)? ¿Signos de apertura? ¿Calcos del inglés?

13. **Imagen.** ¿Las imágenes muestran el producto/lugar/gente real o son stock y generación? Reverse search de la hero si hay dudas; buscá tells de generación (manos, textos dentro de la imagen, texturas fundidas).

14. **Meta.** Compartí la URL en un chat privado: ¿aparece og:image decente? Revisá /sitemap.xml y /robots.txt. Mirá el favicon.

Cerrá con un veredicto de tres niveles como el de Krebs y una lista corta de los tres arreglos de mayor palanca. En mi experiencia (criterio), los tres que más mueven casi siempre son: tipografía propia, matar la grilla de cards por una de las alternativas de la Parte 4, y reescribir el copy con especificidad.

---

## Parte 9 — Cómo se ve el 46% limpio

Del lado de los datos, lo que separa a las páginas limpias del estudio son tres disciplinas, y ninguna es cara: **una paleta con punto de vista** que no sea el lavanda default (tierras cálidas, negro más un solo color violento, crema y rosa, lo que sea que signifique algo para la marca); **un sistema tipográfico que no sea Inter**, con pareja display/cuerpo real; y la más importante, **un solo primitivo de layout fuerte, repetido hasta volverse firma** —no siete tratamientos de card y cuatro tipos de sección, sino una idea compositiva sostenida.

Del lado del criterio, el contraejemplo que me gusta citarte es PostHog: rechaza de plano la estética dominante (mascota dibujada a mano, tipografía display propia con carácter, color saturado por sección) y su propia gente atribuye parte del crecimiento a haber "ganado siendo raros". No es que lo raro convierta per se; es que la personalidad sostenida con sistema es memorable, y lo memorable convierte a largo plazo. Vale también la advertencia inversa: las fuentes que Krebs lista como "escape" de Inter (Geist, Söhne, Untitled Sans) ya empiezan a aparecer en los combos default de los generadores. **No hay fuente refugio; hay decisión o no la hay.** El refugio es el proceso: elegir a propósito, con tokens propios, y poder explicar por qué.

Todo esto conecta directo con la v2 de este informe (método spec-driven, DESIGN.md/CLAUDE.md con tokens bloqueados, la división IA-hace-el-70/vos-hacés-el-30): las decisiones se toman una vez, se escriben como reglas, y el agente las ejecuta siempre. La sameness es lo que pasa cuando nadie escribió esas reglas.

---

## Checklist v3 (complementa la de la v2, no la repite)

| Dimensión | Con dirección | Template/slop |
|---|---|---|
| Estructura de página | Guion propio; el orden de secciones cuenta algo | La fórmula de la Parte 2, recitable de memoria |
| Colecciones | Lista/tabla para lo comparable; cards solo heterogéneo con jerarquía | Grilla de cards idénticas con ícono arriba |
| Numeración | Solo donde el número trabaja (secuencia real, TOC, folio) | Pasos 1-2-3 de relleno; 01/02/03 decorativo |
| Bento | Jerarquía por tamaño; tile héroe que manda | Tiles iguales = card grid con otro nombre |
| Eyebrow/badge | Kicker con contenido real, o nada | Pill con ✨ arriba del H1 |
| Bordes y forma | Radios y bordes con lógica de sistema | Franja de color a la izquierda; rounded-2xl universal |
| Dark mode | Decisión de marca con contraste AA verificado | Reflejo default con gris al límite |
| Iconografía | Sistema propio o ilustración con dirección | Lucide en cuadradito con fondo al 10%; emojis en nav |
| Imagen | Producto/gente/lugar reales, con dirección de arte | Stock genérico, blobs 3D, hero IA con tells |
| Métricas | Verificables y específicas, o ninguna | Banner de 10k+/99.9%/24-7 |
| Copy ES | Voseo (o tuteo) consistente, ¿¡ presentes, cero calcos | Mezcla de registro, "sin costuras", Title Case |
| Fingerprints | Tokens propios sobre la herramienta que sea | Defaults de shadcn/Tailwind intactos, badge del builder |
| Estados | Loading/error/empty/404 diseñados | Happy path y form que no envía |
| Meta | OG, favicon, sitemap, dominio propio | Favicon de Vite, título "Create Next App", *.lovable.app |

---

## Los matices que siguen valiendo (actualizados)

Cierro con los cuatro matices de la v1, que las mediciones nuevas confirman en vez de invalidar, más uno nuevo.

**La acumulación es el método, ahora oficialmente.** Krebs no declara slop por una señal: clasifica por conteo, y aun con chequeos deterministas asume 5–10% de falsos positivos. Vos hacé lo mismo: cluster o nada.

**Los tells siguen teniendo fecha de vencimiento, y ahora más rápido.** Ya existen skills y detectores anti-slop que corrigen el output contra estas mismas listas; cada patrón publicado se vuelve objetivo de entrenamiento. La lista de Krebs es una foto de 2026. Lo que no caduca es el principio: convergencia al promedio = sospecha. Entrenate para oler el promedio, no para memorizar la lista.

**Cuidado con la sobre-corrección.** Con la lista en la mano vas a empezar a ver slop en trabajo legítimo (dark mode y Geist elegidos a propósito existen, y son la mayoría de los buenos dev tools). La pregunta correcta nunca es "¿usó el patrón?" sino "¿hay una decisión detrás, y es consistente con el resto del sistema?".

**El slop convierte; lo que pierde es memoria.** No le digas a un cliente que su sitio genérico "no funciona": probablemente funcione. Decile lo que los datos dicen: que es indistinguible, y que la diferenciación se encarece cada mes que pasa. Es un argumento comercial más fuerte y además es verdad.

**Y el nuevo:** las dos cosas que este informe midió sobre tus manías —cards idénticas y numeraciones— te dan algo concreto para el discurso profesional. Ya no es "a mí no me gustan": es "figuran en la rúbrica medida de patrones que hacen que un sitio se lea como generado, con 22% de prevalencia las cards con ícono en el dataset de referencia". Criterio con datos atrás vale el doble en una negociación.

---

## Fuentes

**Verificado (evidencia dura):** Goree, Doosti, Crandall & Su, *Investigating the Homogenization of Web Design: A Mixed-Methods Approach*, CHI 2021, ACM (doi 10.1145/3411764.3445156) — computer vision sobre capturas 2003–2019, caída >30% en distancia promedio de layouts desde 2007, causas por entrevistas a 11 profesionales. Adrian Krebs, *Scoring Show HN submissions for AI design patterns* (adriankrebs.ch/blog/design-slop, 2026) — 1.590 páginas, Playwright, 16 patrones deterministas, 22/32/46%, prevalencias por patrón, 5–10% falsos positivos; cobertura y desglose en Developers Digest (jun 2026).

**Consenso de industria:** NN/g — *Card View vs. List View* y *Data Tables: Four Major User Tasks* (criterios funcionales cards/listas/tablas). Documentación de shadcn/ui (diseño como punto de partida). LogRocket sobre el "Linear design" y sobre Radix + Orbiter (2025–2026). Overpass Studio sobre el clon Stripe-meets-Linear (2026). Creative Boom, *State of Creativity 2026* (fatiga de bento, glassmorphism y gradientes; tesis de la intención). Bhuwan Garbuja sobre el pipeline shadcn→IA (2026). 925 Studios sobre convergencia distribucional (2026; su proyección de mercado de builders, ~USD 6.300M para 2026, tomala como orden de magnitud). Análisis de práctica: vibecodekit.dev y solodesign.cc (listas de tells operativas, no académicas). StanVision y Eleken sobre sobreuso de cards (2026).

**Criterio profesional (mío, marcado en el texto):** los pesos de la taxonomía, el repertorio de alternativas de las Partes 4 y 5, las señales específicas del español rioplatense, la lista de fingerprints de código (verificables una por una), la genealogía del 01/02/03 y el protocolo de auditoría como secuencia. Datos numéricos citados como orden de magnitud salvo los del paper y el estudio de Krebs, que son los reportados por sus autores.
