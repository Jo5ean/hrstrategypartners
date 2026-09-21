# HR Strategy Partners — Astro + Tailwind

Landing page migrada 1:1 desde el prototipo HTML a un proyecto real de **Astro** con **Tailwind CSS**. Sin backend ni framework de UI (React/Vue): la interactividad es JS vanilla en `src/scripts/site.js`.

## Arrancar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción
```

## Estructura

```
src/
  layouts/
    Layout.astro        # <head>, fuentes, importa global.css, carga site.js
  components/
    Header.astro         # nav sticky + CTA "Agendar diagnóstico"
    Hero.astro            # video + titular + métricas + carrusel "Además"
    Servicios.astro       # 5 tarjetas de programas
    PlanFinder.astro      # chat asistente "¿No sabés cuál programa es para vos?"
    Metodologia.astro     # timeline horizontal conectada (4 pasos)
    Nosotros.astro        # retrato + bio de Carolina
    Resultados.astro      # 3 testimonios con avatar
    Alianzas.astro        # 6 tarjetas de especialidades socias
    Contacto.astro        # info + formulario de diagnóstico
    Footer.astro
    WhatsAppButton.astro  # botón flotante, aparece al pasar el hero
  pages/
    index.astro           # ensambla todas las secciones
  scripts/
    site.js               # TODA la interactividad (ver abajo)
  styles/
    global.css            # @tailwind + reset + keyframes fadeUp
public/
  favicon.svg
  videos/hr-hero.mp4
  images/carolina-navamuel.png
```

## Cómo quedó traducido cada patrón del prototipo

- **Estilos**: todo pasado a clases de Tailwind. Donde el original usaba `clamp()`, `svh` o gradientes/sombras exactas, se usan **arbitrary values** de Tailwind (`text-[clamp(32px,4.4vw,62px)]`, `shadow-[0_16px_48px_rgba(0,0,0,.3)]`) para mantener las medidas exactas — no se aproximó nada a la escala estándar de Tailwind.
- **Grids `auto-fit`/`minmax` fluidos**: como Tailwind no tiene un utility directo para `repeat(auto-fit,minmax(...))`, esos casos quedaron con un `style="grid-template-columns:..."` puntual (es la única razón por la que vas a ver `style=` inline en el código; todo lo demás es Tailwind).
- **Header con fondo dinámico al hacer scroll**, **video en loop muteado**, **reveal-on-scroll de las tarjetas**, **carrusel "Además" con fade**, **botón de WhatsApp que aparece al pasar el hero**, **buscador de plan por palabras clave** y **formulario de contacto** (éxito/reset) están todos portados como funciones independientes en `site.js`, usando `data-*` attributes como hooks — sin dependencias nuevas.
- **Asistente de programas**: intenta una respuesta vía endpoint de texto gratuito y, si no está disponible, cae al matching local por palabras clave (array `TIERS`). Siempre responde: con programa recomendado muestra CTA de WhatsApp; sin coincidencia, CTA que scrollea al formulario.
- **Formulario de contacto**: hoy solo cambia el estado visual a "enviado" (igual que el prototipo). Para que envíe datos de verdad, conectá `initContactForm()` a tu endpoint (Formspree, un backend propio, etc.).

## Notas

- Tailwind está configurado para escanear `src/**/*.{astro,html,js,jsx,ts,tsx}` — si agregás clases nuevas dinámicamente desde JS, asegurate de que el string de la clase aparezca *literal* en algún archivo de ese glob (así lo hace `site.js`), o Tailwind no la va a generar.
- `prefers-reduced-motion` desactiva el carrusel automático y las animaciones, igual que en el prototipo.
