function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const BASE_BG = 'bg-[rgba(58,58,65,.45)]';
  const SCROLLED_CLASSES = ['bg-[rgba(58,58,65,.96)]', 'shadow-[0_8px_34px_rgba(12,22,48,.26)]'];
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
    if (innerWidth >= 1024 && open) setState(false);
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

const TIERS = [
  { name: 'Auditoría de Salud Organizacional', keywords: ['no se bien', 'no se donde', 'no tengo medido', 'no se cuanto', 'diagnostico', 'no se por donde', 'algo anda mal', 'algo no funciona', 'quiero entender', 'necesito claridad', 'no puedo medir', 'no lo tengo claro'], reply: 'Por lo que contás, te recomiendo la Auditoría de Salud Organizacional: en 15 días tenés visibilidad completa de dónde te está costando y cuánto.' },
  { name: 'Programa Estructura Express', keywords: ['rotacion', 'se me va', 'se van', 'renuncia', 'fuga', 'caos', 'caotico', 'desorden', 'urgente', 'apagar incendios', 'incendio', 'estructura', 'proceso', 'procesos', 'contratar', 'seleccion', 'conflicto', 'clima', 'lider', 'lideres', 'mando medio', 'no rinde', 'desmotivad'], reply: 'Te recomiendo el Programa Estructura Express: 12 semanas para resolver el problema y dejar un sistema funcionando, no solo un análisis.' },
  { name: 'Fractional CPO', keywords: ['ya resolvimos', 'no quiero que se caiga', 'direccion continua', 'cpo', 'full time', 'comite', 'crecer', 'crece', 'sostener', 'acompañamiento permanente', 'degradarse'], reply: 'Te recomiendo Fractional CPO: dirección ejecutiva de la estructura a tiempo parcial, para que lo resuelto no vuelva a degradarse mientras la empresa crece.' }
];

function matchTier(text) {
  const t = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let best = null;
  let bestScore = 0;
  TIERS.forEach((tier) => {
    const score = tier.keywords.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = tier;
    }
  });
  if (!best) return 'No encontré una coincidencia clara. Lo mejor es agendar el diagnóstico gratuito de 30 minutos más abajo y te orientamos con precisión.';
  return best.reply;
}

const PLAN_PROMPT =
  'Sos el asistente de HR Strategy Partners, firma de arquitectura organizacional para empresas en crecimiento del NOA argentino. ' +
  'Recomendá UNO de estos 3 niveles según la situación del usuario, en 2-3 oraciones, tono cálido y directo, español rioplatense (voseo), sin listas ni formato. No uses las palabras "RRHH", "recursos humanos" ni "capital humano":\n' +
  '1. Auditoría de Salud Organizacional — diagnóstico de 15 días, para quien intuye el problema pero no lo tiene medido.\n' +
  '2. Programa Estructura Express — transformación de 12 semanas, para quien ya sabe dónde pierde capacidad y necesita que se resuelva.\n' +
  '3. Fractional CPO — dirección ejecutiva continua a tiempo parcial, para sostener lo resuelto mientras la empresa crece.\n' +
  'Si el texto no alcanza para recomendar, sugerí agendar el diagnóstico gratuito de 30 minutos.\n' +
  'Empezá SIEMPRE la respuesta con [[N]] donde N es el número del nivel elegido (1 al 3); si no alcanza el contexto usá [[0]]. Después seguí con el texto.\n' +
  'Situación del usuario: "';

async function aiTierReply(text) {
  const target = 'https://text.pollinations.ai/' + encodeURIComponent(PLAN_PROMPT + text + '"');
  const urls = [
    target,
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(target)
  ];
  const attempt = async (url) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error('bad status');
      const out = (await res.text()).trim();
      if (out.length > 20) return out;
      throw new Error('empty');
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    return await Promise.any(urls.map(attempt));
  } catch {
    return null;
  }
}

const WA_PHONE = '5493872289285';
const WA_ICON =
  '<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

function initPlanFinder() {
  const input = document.querySelector('[data-plan-input]');
  const button = document.querySelector('[data-plan-submit]');
  const thread = document.querySelector('[data-plan-thread]');
  if (!input || !button || !thread) return;

  const scrollDown = () => {
    thread.scrollTop = thread.scrollHeight;
  };

  const addBubble = (text, fromUser) => {
    const b = document.createElement('div');
    b.className = fromUser
      ? 'self-end max-w-[75%] px-5 py-3 rounded-[18px] rounded-br-[6px] bg-[#0C1630] text-white text-[15px] leading-[1.55] animate-fadeUpFast'
      : 'self-start max-w-[75%] px-5 py-3.5 rounded-[18px] rounded-bl-[6px] bg-white border border-[#E1E4EC] text-[15px] leading-[1.55] text-[#0C1630] animate-fadeUpFast';
    b.textContent = text;
    thread.appendChild(b);
    scrollDown();
    return b;
  };

  const showTyping = (bubble) => {
    bubble.innerHTML =
      '<span class="inline-flex items-center gap-1 py-1">' +
      '<span class="w-1.5 h-1.5 rounded-full bg-[#93A5C8] animate-bounce"></span>' +
      '<span class="w-1.5 h-1.5 rounded-full bg-[#93A5C8] animate-bounce" style="animation-delay:.15s"></span>' +
      '<span class="w-1.5 h-1.5 rounded-full bg-[#93A5C8] animate-bounce" style="animation-delay:.3s"></span></span>';
  };

  const addWaButton = (bubble, program, userText) => {
    const a = document.createElement('a');
    const msg = `Hola, quiero consultar por el programa "${program}". Mi situación: ${userText}`;
    a.href = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className =
      'mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#128C7E] text-white text-[14px] font-bold hover:bg-[#0F7A6D] transition';
    a.innerHTML = WA_ICON + 'Consultar por WhatsApp';
    bubble.appendChild(a);
  };

  const addScrollButton = (bubble) => {
    const a = document.createElement('a');
    a.href = '#contacto';
    a.className =
      'mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4E9F] text-white text-[14px] font-bold hover:bg-[#153E7E] transition';
    a.innerHTML =
      'Agendar diagnóstico gratuito <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 16l-6-6h12z"/></svg>';
    bubble.appendChild(a);
  };

  let busy = false;
  const run = async () => {
    const text = input.value.trim();
    if (!text || busy) return;
    busy = true;
    button.disabled = true;
    input.value = '';
    addBubble(text, true);
    const bot = addBubble('', false);
    showTyping(bot);

    let program = null;
    let reply = await aiTierReply(text);
    if (reply) {
      const m = reply.match(/\[\[(\d)\]\]/);
      if (m) {
        const n = parseInt(m[1], 10);
        if (n >= 1 && n <= TIERS.length) program = TIERS[n - 1].name;
        reply = reply.replace(m[0], '').trim();
      }
    } else {
      reply = matchTier(text);
    }
    if (!program) program = TIERS.find((t) => reply.includes(t.name))?.name || null;

    bot.textContent = reply;
    if (program) {
      addWaButton(bot, program, text);
    } else {
      addScrollButton(bot);
    }
    scrollDown();
    button.disabled = false;
    busy = false;
  };
  button.addEventListener('click', run);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') run();
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
  }
};

function initResourceFieldValidation(form) {
  Object.keys(RESOURCE_VALIDATORS).forEach((name) => {
    const field = form.elements.namedItem(name);
    const errorEl = form.querySelector(`[data-field-error="${name}"]`);
    if (!field || !errorEl) return;
    field.addEventListener('blur', () => validateResourceField(field, errorEl));
    field.addEventListener('input', () => {
      if (!errorEl.classList.contains('hidden')) validateResourceField(field, errorEl);
    });
  });
}

function validateResourceField(field, errorEl) {
  const validator = RESOURCE_VALIDATORS[field.name];
  if (!validator) return true;
  const valid = validator.test(field.value);
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
  initPlanFinder();
  initContactDetails();
  initResourceForm();
});
