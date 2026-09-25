---
name: auditoria-slop
description: Audita diseño, copy y código de un sitio contra patrones medidos de "AI slop"/template genérico (rúbrica de 16 patrones de Krebs 2026, léxico en exceso de Kobak 2025, señales de español rioplatense). Usar cuando se pida auditar, revisar o corregir un sitio porque "parece genérico", "parece hecho con IA", o antes de dar por terminada una página nueva/rediseño.
---

# Auditoría anti-slop

Cuatro documentos de referencia en `resources/`, con method y pesos ya definidos. No repitas la evidencia en tus respuestas — citá el peso/patrón y andá directo al hallazgo concreto en el código del proyecto.

- `resources/informe-completo-web-premium-vs-generica.md` — documento maestro (reemplaza a v1/v2/v3): evidencia, taxonomía de 11 capas con pesos, casos profundos (cards, numeraciones, bento), protocolo de auditoría de 14 pasos, stack/craft premium, checklist final.
- `resources/auditoria-web-generica-v3.md` — versión más corta del mismo diagnóstico (9 partes), útil si alcanza con la taxonomía de 7 capas y el protocolo de 14 pasos sin la parte de construcción/stack.
- `resources/catalogo-de-repeticion.md` — inventario grepeable: léxico ES/EN, regex de fórmulas sintácticas, esqueletos de documento, fingerprints de UI (íconos, hex de Tailwind, clases, nombres de demo shadcn), y el método de calibración contra una base propia de textos/sitios.
- `resources/informe-texto-generado-ia.md` — específico de copy: señales léxicas/sintácticas/estructurales, por qué los detectores automáticos no sirven (61% falsos positivos, Stanford 2023), protocolo de auditoría de texto de 9 pasos, protocolo de edición de 7 pasadas.

## Cómo aplicarlo

1. **Nunca una señal aislada.** El veredicto sale de acumular señales (0–1 limpio, 2–3 leve, 4+ pesado, calibrado sobre la rúbrica de 16 patrones de Krebs). Un patrón elegido a propósito y consistente con el resto del sistema no cuenta igual que un default sin tocar — la pregunta siempre es "¿hay una decisión detrás?", no "¿usó el patrón?".
2. **Mirá el código, no solo el screenshot**: view-source / DevTools para fingerprints (shadcn/Tailwind sin tocar, hexes default, `data-radix-*`, favicon/título default), y el DOM para landmarks/semántica.
3. **Corré el protocolo de 14 pasos** (informe-completo, sección 11) contra el sitio real (dev server o producción), no de memoria.
4. **Para copy en español rioplatense**, aplicá la sección 4 de auditoria-web-generica-v3.md o el capítulo 4 de informe-texto-generado-ia.md: mezcla de voseo/tuteo, ¿¡ ausentes, Title Case, calcos del inglés pesan más que cualquier em-dash.
5. **Reportá por cluster con peso**, no como lista plana: agrupá alto/medio/bajo y priorizá arreglos por palanca (tipografía propia, matar grillas de cards idénticas, copy específico son los que más mueven según el propio documento).
6. **Antes de aplicar fixes de marca/estética** (paleta, tipografía, tono) que ya estén documentados como decisión deliberada del proyecto (p.ej. un DESIGN_SYSTEM.md existente), confirmá con el usuario — la rúbrica flaguea *ausencia de decisión*, no cualquier uso del patrón; si el proyecto ya decidió y lo documentó, no es slop por default.
