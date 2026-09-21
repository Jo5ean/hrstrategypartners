function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const BASE_BG = 'bg-[rgba(12,22,48,.35)]';
  const SCROLLED_CLASSES = ['bg-[rgba(12,22,48,.9)]', 'shadow-[0_8px_34px_rgba(12,22,48,.26)]'];
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
  v.setAttribute('muted', '');
  const tryPlay = () => v.play().catch(() => {});
  if (v.paused) tryPlay();
}

function initHeroMetrics() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  const bars = Array.from(document.querySelectorAll('[data-bar]'));
  const segs = Array.from(document.querySelectorAll('[data-seg]'));
  if (!counters.length && !bars.length && !segs.length) return;

  const DURATION = 2400;
  const DELAY = 600;
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const counterCfg = counters.map((el) => ({
    el,
    from: parseFloat(el.dataset.countFrom || '0'),
    to: parseFloat(el.dataset.count),
    prefix: el.dataset.countPrefix || ''
  }));
  const barCfg = bars.map((el) => ({
    el,
    from: parseFloat(el.dataset.barFrom || '0'),
    to: parseFloat(el.dataset.barTo)
  }));
  segs.forEach((s) => s.classList.add('transition-all', 'duration-300', 'origin-left', 'opacity-0', 'scale-x-0'));

  const render = (p) => {
    const e = ease(p);
    counterCfg.forEach(({ el, from, to, prefix }) => {
      el.textContent = prefix + Math.round(from + (to - from) * e);
    });
    barCfg.forEach(({ el, from, to }) => {
      el.style.width = from + (to - from) * e + '%';
    });
    segs.forEach((s, i) => {
      const on = e * segs.length >= i + 1;
      s.classList.toggle('opacity-0', !on);
      s.classList.toggle('scale-x-0', !on);
    });
  };

  render(0);
  setTimeout(() => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DURATION);
      render(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, DELAY);
}

function initMobileMetrics() {
  const root = document.querySelector('[data-mobile-metrics]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('[data-mobile-slide]'));
  const viewport = root.querySelector('[data-mobile-viewport]');
  const controls = root.querySelector('[data-mobile-controls]');
  const prev = root.querySelector('[data-mobile-prev]');
  const next = root.querySelector('[data-mobile-next]');
  if (slides.length < 2 || !viewport || !controls || !prev || !next) return;
  const desktop = matchMedia('(min-width: 640px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let paused = reduced.matches;
  let visible = true;
  let hovered = false;
  let timer;
  let touchStart;

  const render = () => {
    slides.forEach((slide, i) => {
      slide.dataset.active = String(i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
    });
  };
  const sync = () => {
    clearInterval(timer);
    const playing = !desktop.matches && !reduced.matches && !paused && visible && !hovered && !document.hidden;
    viewport.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing) timer = setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 5000);
  };
  const move = (direction) => {
    paused = true;
    sync();
    index = (index + direction + slides.length) % slides.length;
    render();
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  root.addEventListener('focusin', () => {
    paused = true;
    sync();
  });
  root.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') { hovered = true; sync(); }
  });
  root.addEventListener('pointerleave', () => { hovered = false; sync(); });
  viewport.addEventListener('pointerdown', (event) => {
    touchStart = { x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener('pointerup', (event) => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  });
  viewport.addEventListener('pointercancel', () => { touchStart = null; });
  desktop.addEventListener('change', sync);
  reduced.addEventListener('change', () => { paused = reduced.matches || paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  if (typeof IntersectionObserver !== 'undefined') {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 }).observe(root);
  }
  controls.classList.remove('hidden');
  render();
  sync();
}

function initStatsCarousel() {
  const track = document.querySelector('[data-stats-carousel]');
  const prev = document.querySelector('[data-stats-prev]');
  const next = document.querySelector('[data-stats-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.firstElementChild;
    return card ? card.getBoundingClientRect().width + 12 : track.clientWidth * 0.8;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  const update = () => {
    const scrollable = track.scrollWidth > track.clientWidth + 8;
    prev.classList.toggle('hidden', !scrollable);
    next.classList.toggle('hidden', !scrollable);
    prev.classList.toggle('opacity-40', track.scrollLeft <= 4);
    next.classList.toggle('opacity-40', track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  };
  track.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

function initMethodology() {
  const track = document.querySelector('[data-method-track]');
  const controls = document.querySelector('[data-method-controls]');
  const prev = document.querySelector('[data-method-prev]');
  const next = document.querySelector('[data-method-next]');
  if (!track || !controls || !prev || !next) return;

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollable = maxScroll > 1;
    controls.classList.toggle('hidden', !scrollable);
    controls.classList.toggle('flex', scrollable);
    if (scrollable) track.setAttribute('aria-describedby', 'metodologia-ayuda');
    else track.removeAttribute('aria-describedby');
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  };
  const move = (direction) => {
    const rail = track.firstElementChild;
    const step = rail.querySelector('[data-reveal]');
    if (!step) return;
    track.scrollBy({
      left: direction * (step.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).columnGap) || 0)),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(update).observe(track);
  update();
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

function initExtraCard() {
  const el = document.querySelector('[data-extra-card]');
  if (!el) return;
  const extras = JSON.parse(el.dataset.extras || '[]');
  if (!extras.length) return;
  const fade = el.querySelector('[data-extra-fade]');
  const numEl = el.querySelector('[data-extra-num]');
  const unitEl = el.querySelector('[data-extra-unit]');
  const titleEl = el.querySelector('[data-extra-title]');
  const subEl = el.querySelector('[data-extra-sub]');
  const dots = Array.from(el.querySelectorAll('[data-extra-dot]'));
  let index = 0;

  const render = () => {
    const item = extras[index];
    numEl.textContent = item.num;
    numEl.style.color = item.accent;
    unitEl.textContent = item.unit;
    unitEl.style.color = item.accent;
    titleEl.textContent = item.title;
    subEl.textContent = item.sub;
    dots.forEach((dot, i) => {
      dot.classList.toggle('w-3.5', i === index);
      dot.classList.toggle('bg-white/80', i === index);
      dot.classList.toggle('w-1', i !== index);
      dot.classList.toggle('bg-white/25', i !== index);
    });
  };
  render();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => {
    fade.classList.add('opacity-0');
    setTimeout(() => {
      index = (index + 1) % extras.length;
      render();
      fade.classList.remove('opacity-0');
    }, 350);
  }, 3400);
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
  { name: 'Arquitectura de Capital Humano', keywords: ['desde cero', 'armar', 'estructura', 'cultura', 'todo', 'transformar', 'integral', 'area de rrhh', 'proceso completo', 'despedir', 'despido', 'desvincular', 'reestructurar', 'reducir', 'organigrama', 'funciones', 'conflicto', 'clima', 'sueldo', 'salario', 'equipo no rinde', 'desmotivad'], reply: 'Por lo que contás, te recomiendo Arquitectura de Capital Humano: es el programa más completo, rediseña estructura, cultura, métricas y liderazgo en 12 semanas.' },
  { name: 'Estructura Express', keywords: ['rapido', 'urgente', '90 dias', 'caos', 'caotico', 'orden', 'ya', 'desorden', 'apagar incendios', 'incendio'], reply: 'Te recomiendo Estructura Express: mismo diagnóstico y rediseño que Arquitectura, pero comprimido en 90 días con quick wins desde la semana 4.' },
  { name: 'Atracción de Talento Crítico', keywords: ['contratar', 'vacante', 'buscar', 'reclutar', 'puesto', 'candidato', 'headhunting', 'posicion', 'no encuentro', 'no consigo', 'rotacion', 'se me va', 'se van', 'renuncia', 'fuga', 'retener', 'seleccion', 'entrevista'], reply: 'Te recomiendo Atracción de Talento Crítico: búsqueda ejecutiva con metodología Topgrading, pensada para cubrir bien un puesto clave.' },
  { name: 'Desarrollo de Liderazgo', keywords: ['lider', 'lideres', 'manager', 'capacitar', 'formar', 'equipo directivo', 'gerentes', 'jefe', 'supervisor', 'delegar', 'mando medio'], reply: 'Te recomiendo Desarrollo de Liderazgo: formación de líderes y managers con entregables medibles, sin tocar estructura ni contratación.' },
  { name: 'Fractional CPO', keywords: ['director de rrhh', 'cpo', 'direccion estrategica', 'full time', 'comite', 'externalizar', 'tercerizar direccion', 'asesor', 'acompañamiento', 'estrategia de personas'], reply: 'Te recomiendo Fractional CPO: dirección estratégica de capital humano de forma continua, sin el costo de una posición full-time.' }
];

function matchTier(text) {
  const t = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  TIERS.forEach((tier) => {
    const score = tier.keywords.reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = tier;
    }
  });
  if (!best) return 'No encontré una coincidencia clara. Lo mejor es agendar el diagnóstico gratuito de 45 minutos más abajo y te orientamos con precisión.';
  return best.reply;
}

const PLAN_PROMPT =
  'Sos el asistente de HR Strategy Partners, consultora de capital humano para PyMEs del NOA argentino. ' +
  'Recomendá UNO de estos 5 programas según la situación del usuario, en 2-3 oraciones, tono cálido y directo, español rioplatense (voseo), sin listas ni formato:\n' +
  '1. Arquitectura de Capital Humano — rediseño integral (estructura, cultura, métricas, liderazgo) en 12 semanas. El más completo.\n' +
  '2. Estructura Express — mismo diagnóstico comprimido en 90 días, quick wins desde la semana 4.\n' +
  '3. Atracción de Talento Crítico — búsqueda ejecutiva Topgrading para puestos clave.\n' +
  '4. Desarrollo de Liderazgo — formación de líderes y managers con entregables medibles.\n' +
  '5. Fractional CPO — dirección estratégica continua de capital humano sin costo full-time.\n' +
  'Si el texto no alcanza para recomendar, sugerí agendar el diagnóstico gratuito de 45 minutos.\n' +
  'Empezá SIEMPRE la respuesta con [[N]] donde N es el número del programa elegido (1 al 5); si no alcanza el contexto usá [[0]]. Después seguí con el texto.\n' +
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

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const success = document.querySelector('[data-contact-success]');
  const resetBtn = document.querySelector('[data-contact-reset]');
  if (!form || !success) return;

  const section = form.closest('#contacto');
  const extraToggle = form.querySelector('[data-contact-extra-toggle]');
  const detailsToggle = section?.querySelector('[data-contact-details-toggle]');
  const mobile = matchMedia('(max-width: 639px)');
  const setExtraOpen = (open) => {
    form.dataset.extraOpen = String(open);
    extraToggle?.setAttribute('aria-expanded', String(open));
    if (extraToggle) extraToggle.textContent = open ? 'Ocultar datos adicionales' : 'Agregar datos de mi empresa (opcional)';
  };
  extraToggle?.addEventListener('click', () => setExtraOpen(form.dataset.extraOpen !== 'true'));
  detailsToggle?.addEventListener('click', () => {
    const open = section.dataset.detailsOpen !== 'true';
    section.dataset.detailsOpen = String(open);
    detailsToggle.setAttribute('aria-expanded', String(open));
  });
  const syncRequired = () => {
    ['empresa', 'empleados'].forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field) field.required = !mobile.matches;
    });
  };
  mobile.addEventListener('change', syncRequired);
  syncRequired();
  form.addEventListener('reset', () => setExtraOpen(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    success.classList.remove('hidden');
    success.classList.add('flex');
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.classList.remove('hidden');
    success.classList.add('hidden');
    success.classList.remove('flex');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMenu();
  initHeroVideo();
  initHeroMetrics();
  initMobileMetrics();
  initStatsCarousel();
  initMethodology();
  initReveal();
  initExtraCard();
  initWhatsApp();
  initPlanFinder();
  initContactForm();
});
