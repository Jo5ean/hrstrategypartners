function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const BASE_BG = 'bg-[rgba(15,46,107,.45)]';
  const SCROLLED_CLASSES = ['bg-[rgba(15,46,107,.94)]', 'shadow-[0_8px_34px_rgba(12,22,48,.26)]'];
  const onScroll = () => {
    const scrolled = (window.scrollY || document.documentElement.scrollTop) > 80;
    header.classList.toggle(BASE_BG, !scrolled);
    SCROLLED_CLASSES.forEach((c) => header.classList.toggle(c, scrolled));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;
  const iconOpen = toggle.querySelector('[data-icon-open]');
  const iconClose = toggle.querySelector('[data-icon-close]');
  let open = false;

  const setState = (isOpen) => {
    open = isOpen;
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggle.addEventListener('click', () => setState(!open));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setState(false)));
  addEventListener('resize', () => {
    if (innerWidth >= 1280 && open) setState(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setState(false);
  });
}

function initHeroVideo() {
  const v = document.querySelector('[data-hero-video]');
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.volume = 0;
  v.autoplay = true;
  v.playsInline = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  let pending = false;
  const tryPlay = async () => {
    if (!v.paused || document.hidden || pending) return;
    pending = true;
    v.muted = true;
    try {
      await v.play();
      v.dataset.playback = 'playing';
    } catch (error) {
      v.dataset.playback = error.name === 'NotAllowedError' ? 'blocked' : 'waiting';
    } finally {
      pending = false;
    }
  };
  v.addEventListener('loadeddata', tryPlay);
  v.addEventListener('canplay', tryPlay);
  addEventListener('pageshow', tryPlay);
  document.addEventListener('visibilitychange', tryPlay);
  ['pointerdown', 'touchend', 'keydown'].forEach((event) => {
    document.addEventListener(event, tryPlay, { capture: true, passive: true });
  });
  tryPlay();
}

function initReveal() {
  const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!nodes.length || matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
  );
  nodes.forEach((el) => io.observe(el));
  setTimeout(() => {
    nodes.forEach((el) => el.classList.add('is-visible'));
  }, 700);
}

function initWhatsApp() {
  const btn = document.querySelector('[data-whatsapp]');
  if (!btn) return;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const past = y > innerHeight * 0.65;
    btn.classList.toggle('opacity-0', !past);
    btn.classList.toggle('translate-y-3.5', !past);
    btn.classList.toggle('pointer-events-none', !past);
    btn.classList.toggle('opacity-100', past);
    btn.classList.toggle('translate-y-0', past);
    btn.classList.toggle('pointer-events-auto', past);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initStatsCarousel() {
  const track = document.querySelector('[data-stats-carousel]');
  const dots = Array.from(document.querySelectorAll('[data-stats-dots] button'));
  if (!track || !dots.length) return;
  const cards = Array.from(track.children);
  const mobile = matchMedia('(max-width: 639px)');
  let active = 0;
  let timer = null;

  const mark = (i) => {
    active = i;
    dots.forEach((d, n) => d.setAttribute('aria-current', String(n === i)));
  };
  const goTo = (i) => track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    if (timer || !mobile.matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => {
      if (document.hidden || (window.scrollY || 0) > innerHeight * 0.5) return;
      goTo((active + 1) % cards.length);
    }, 4500);
  };

  track.addEventListener('scroll', () => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    mark(atEnd ? cards.length - 1 : Math.min(cards.length - 1, Math.round(track.scrollLeft / step)));
  }, { passive: true });
  ['pointerdown', 'touchstart', 'wheel', 'keydown', 'focusin'].forEach((ev) => track.addEventListener(ev, stop, { passive: true }));
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); }));
  mobile.addEventListener('change', (e) => {
    if (e.matches) start();
    else {
      stop();
      track.scrollTo({ left: 0 });
    }
  });
  start();
}

function initBarraReserva() {
  const bar = document.querySelector('[data-reserva-bar]');
  if (!bar) return;
  const link = bar.querySelector('a');
  const contacto = document.querySelector('#contacto');
  let enContacto = false;
  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const show = y > innerHeight * 0.65 && !enContacto;
    bar.classList.toggle('translate-y-full', !show);
    bar.classList.toggle('pointer-events-none', !show);
    bar.setAttribute('aria-hidden', String(!show));
    link.tabIndex = show ? 0 : -1;
  };
  if (contacto && typeof IntersectionObserver !== 'undefined') {
    new IntersectionObserver(([entry]) => {
      enContacto = entry.isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(contacto);
  }
  addEventListener('scroll', update, { passive: true });
  update();
}

function initPlanFinder() {
  const root = document.querySelector('[data-plan-finder]');
  const wa = document.querySelector('[data-whatsapp]');
  if (!root || !wa) return;
  const base = new URL(wa.href).searchParams.get('text') || '';
  root.addEventListener('change', (e) => {
    const choice = e.target.value;
    const text = base.replace(/___$/, choice === 'Otro' ? '___' : choice.toLowerCase());
    wa.href = 'https://wa.me/' + new URL(wa.href).pathname.slice(1) + '?text=' + encodeURIComponent(text);
  });
}

function initContactDetails() {
  const section = document.querySelector('#contacto');
  const detailsToggle = section?.querySelector('[data-contact-details-toggle]');
  if (!section || !detailsToggle) return;

  detailsToggle.addEventListener('click', () => {
    const open = section.dataset.detailsOpen !== 'true';
    section.dataset.detailsOpen = String(open);
    detailsToggle.setAttribute('aria-expanded', String(open));
  });
}

const RESOURCE_VALIDATORS = {
  nombre: {
    test: (v) => v.trim().length >= 2 && /[a-zA-ZÀ-ÿ]/.test(v),
    message: 'Ingresá tu nombre completo.'
  },
  email: {
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Ingresá un email válido (con @ y dominio, ej: nombre@empresa.com).'
  },
  telefono: {
    test: (v) => v.trim() === '' || /^[+]?[\d\s()-]{6,20}$/.test(v.trim()),
    message: 'Ingresá solo números (podés incluir +, espacios o guiones).'
  },
  consentimiento: {
    test: (v) => v === true,
    message: 'Para continuar, aceptá el uso de tus datos.'
  }
};

function initResourceFieldValidation(form) {
  Object.keys(RESOURCE_VALIDATORS).forEach((name) => {
    const field = form.elements.namedItem(name);
    const errorEl = form.querySelector(`[data-field-error="${name}"]`);
    if (!field || !errorEl) return;
    field.addEventListener('blur', () => validateResourceField(field, errorEl));
    field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', () => {
      if (!errorEl.classList.contains('hidden')) validateResourceField(field, errorEl);
    });
  });
}

function validateResourceField(field, errorEl) {
  const validator = RESOURCE_VALIDATORS[field.name];
  if (!validator) return true;
  const valid = validator.test(field.type === 'checkbox' ? field.checked : field.value);
  errorEl.textContent = valid ? '' : validator.message;
  errorEl.classList.toggle('hidden', valid);
  field.classList.toggle('ring-2', !valid);
  field.classList.toggle('ring-[#B33A99]', !valid);
  return valid;
}

function validateResourceForm(form) {
  let allValid = true;
  Object.keys(RESOURCE_VALIDATORS).forEach((name) => {
    const field = form.elements.namedItem(name);
    const errorEl = form.querySelector(`[data-field-error="${name}"]`);
    if (!field || !errorEl) return;
    if (!validateResourceField(field, errorEl)) allValid = false;
  });
  return allValid;
}

async function initResourceForm() {
  const section = document.querySelector('[data-resource-section]');
  if (!section) return;

  const scriptUrl = section.dataset.appsScriptUrl;
  const titulo = section.querySelector('[data-resource-titulo]');
  const descripcion = section.querySelector('[data-resource-descripcion]');
  const form = section.querySelector('[data-resource-form]');
  const success = section.querySelector('[data-resource-success]');
  const errorEl = section.querySelector('[data-resource-error]');
  const submitBtn = section.querySelector('[data-resource-submit]');
  const downloadLink = section.querySelector('[data-resource-download]');
  if (!scriptUrl || !form || !success) return;

  let recursoId = null;

  try {
    const res = await fetch(scriptUrl, { cache: 'no-store' });
    const json = await res.json();
    if (!json.ok || !json.recurso) throw new Error(json.error || 'Sin recurso activo.');

    recursoId = json.recurso.id;
    titulo.textContent = json.recurso.titulo;
    descripcion.textContent = json.recurso.descripcion;
    submitBtn.textContent = json.recurso.boton || 'Descargar gratis';
    submitBtn.disabled = false;

    const imagenEl = section.querySelector('[data-resource-imagen]');
    const iconoDefault = section.querySelector('[data-resource-icono-default]');
    if (json.recurso.imagenUrl && imagenEl) {
      imagenEl.src = json.recurso.imagenUrl;
      imagenEl.addEventListener(
        'load',
        () => {
          imagenEl.classList.remove('hidden');
          iconoDefault?.classList.add('hidden');
        },
        { once: true }
      );
      imagenEl.addEventListener('error', () => imagenEl.classList.add('hidden'), { once: true });
    }

    section.classList.remove('hidden');
  } catch (err) {
    return; // sin recurso configurado: la sección queda oculta
  }

  initResourceFieldValidation(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    if (!validateResourceForm(form)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    const payload = {
      nombre: form.elements.namedItem('nombre').value.trim(),
      email: form.elements.namedItem('email').value.trim(),
      telefono: form.elements.namedItem('telefono').value.trim(),
      consentimiento: true,
      recurso: recursoId
    };

    try {
      const res = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'No se pudo procesar la descarga.');

      downloadLink.href = json.url;
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.classList.add('flex');
    } catch (err) {
      errorEl.textContent = 'Hubo un problema al procesar tu descarga. Probá de nuevo en un minuto.';
      errorEl.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Descargar gratis';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMenu();
  initHeroVideo();
  initReveal();
  initWhatsApp();
  initStatsCarousel();
  initBarraReserva();
  initPlanFinder();
  initContactDetails();
  initResourceForm();
});
