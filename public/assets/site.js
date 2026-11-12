// myCROI site: loader, smooth scroll, cursor, reveals, scroll-driven sections and the particle brain.
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const mobile = () => innerWidth < 860;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------------------------------------------------------------- word splitting
$$('.split').forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`).join(' ');
});
$$('.scrub-words').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="sw-w">${esc(w)}</span>`).join(' ');
});
$$('.apps li').forEach((li, i) => li.style.setProperty('--i', i));

// ---------------------------------------------------------------- reveals
const heroEls = $$('.hero .split, .hero .reveal-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -12% 0px' });
$$('.split, .reveal-up, .apps').forEach((el) => { if (!heroEls.includes(el)) io.observe(el); });

// ---------------------------------------------------------------- loader
const num = $('#loader-num'), bar = $('#loader-bar');
let brainReady = !('WebGLRenderingContext' in window);
const loadStart = performance.now();
function loaderTick(now) {
  const t = clamp((now - loadStart) / 1600, 0, 1);
  const shown = brainReady || t < 0.85 ? t : 0.85 + (t - 0.85) * 0.2;
  const v = Math.round((1 - Math.pow(1 - shown, 3)) * 100);
  if (num) num.textContent = String(v).padStart(3, '0');
  if (bar) bar.style.transform = `scaleX(${v / 100})`;
  if (t >= 1 && (brainReady || now - loadStart > 3500)) return finishLoad();
  requestAnimationFrame(loaderTick);
}
function finishLoad() {
  if (num) num.textContent = '100';
  if (bar) bar.style.transform = 'scaleX(1)';
  root.classList.add('loaded');
  heroEls.forEach((el, i) => { el.style.setProperty('--d', `${0.35 + i * 0.08}s`); setTimeout(() => el.classList.add('in'), 350); });
}
if (reduced) finishLoad(); else requestAnimationFrame(loaderTick);

// ---------------------------------------------------------------- smooth scroll
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
const NAV_H = 76;
function goTo(hash) {
  const el = hash === '#top' ? document.body : $(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(hash === '#top' ? 0 : el, { offset: hash === '#top' ? 0 : -NAV_H + 1, duration: 1.4 });
  else (hash === '#top' ? window.scrollTo({ top: 0 }) : el.scrollIntoView());
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (hash.length < 2) return;
  e.preventDefault();
  setMenu(false);
  goTo(hash);
  history.replaceState(null, '', hash);
});

// ---------------------------------------------------------------- nav and menu
const nav = $('#nav'), menuBtn = $('#menu-btn'), menu = $('#menu');
function setMenu(open) {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menu.setAttribute('aria-hidden', !open);
  if (lenis) open ? lenis.stop() : lenis.start();
}
menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
const navLinks = $$('.nav-links a');

// ---------------------------------------------------------------- cursor and magnetic buttons
if (fine && !reduced) {
  const cur = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring'), label = $('.cursor-label');
  const p = { x: innerWidth / 2, y: innerHeight / 2 }, r = { x: p.x, y: p.y };
  addEventListener('pointermove', (e) => { p.x = e.clientX; p.y = e.clientY; }, { passive: true });
  (function loop() {
    r.x += (p.x - r.x) * 0.18; r.y += (p.y - r.y) * 0.18;
    dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    ring.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('pointerover', (e) => {
    const t = e.target;
    const lab = t.closest('[data-cursor]') || (t.closest('.trades-track') && { dataset: { cursor: 'drag' } }) || (t.closest('.work-card') && { dataset: { cursor: 'visit' } });
    cur.classList.toggle('is-label', !!lab);
    label.textContent = lab ? lab.dataset.cursor : '';
    cur.classList.toggle('is-hover', !lab && !!t.closest('a, button, summary, label, .trade'));
    cur.classList.toggle('is-text', !!t.closest('input, textarea, select'));
  });
  $$('.magnetic').forEach((b) => {
    const inner = b.querySelector('span');
    b.addEventListener('pointermove', (e) => {
      const rc = b.getBoundingClientRect(), dx = e.clientX - (rc.left + rc.width / 2), dy = e.clientY - (rc.top + rc.height / 2);
      b.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      if (inner) inner.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
    });
    b.addEventListener('pointerleave', () => {
      b.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      b.style.transform = '';
      if (inner) { inner.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)'; inner.style.transform = ''; }
      setTimeout(() => { b.style.transition = ''; if (inner) inner.style.transition = ''; }, 600);
    });
  });
  $$('.tilt').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const rc = c.getBoundingClientRect(), x = (e.clientX - rc.left) / rc.width - 0.5, y = (e.clientY - rc.top) / rc.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
}

// ---------------------------------------------------------------- the particle brain
let brain = null;
const sections = $$('[data-shape]');
const POSE = {
  top: { shape: 'brain', x: 2.75, y: 0.2, s: 1.4, o: 1, spin: 0.12 },
  five: { shape: 'logo', x: 0, y: 0, s: 1.1, o: 0.55, spin: 0 },
  only: { shape: 'brain', x: 2.8, y: -0.4, s: 1.05, o: 0.55, spin: 0.1 },
  trades: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.7, spin: 0.02 },
  included: { shape: 'browser', x: 3.3, y: 1.0, s: 0.72, o: 0.5, spin: 0 },
  how: { shape: 'brain', x: 3.1, y: 1.9, s: 0.7, o: 0.45, spin: 0.1 },
  cycle: { shape: 'ring', x: 0.45, y: 0, s: 0.62, o: 1, spin: 0.15 },
  work: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.6, spin: 0.02 },
  app: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.6, spin: 0.02 },
  pricing: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.55, spin: 0.02 },
  addons: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.55, spin: 0.02 },
  faq: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.55, spin: 0.02 },
  ready: { shape: 'burst', x: 0, y: 0, s: 1, o: 0.85, spin: 0.08 },
  contact: { shape: 'stars', x: 0, y: 0, s: 1, o: 0.5, spin: 0.02 }
};
function poseFor(id) {
  const p = Object.assign({}, POSE[id] || POSE.work);
  if (mobile()) { p.x = 0; p.y = id === 'top' ? 2.1 : 0; p.s *= id === 'top' ? 0.72 : 0.75; p.o *= id === 'top' ? 0.6 : 0.5; }
  return p;
}
function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}
if (webglOk()) {
  import('./brain.js').then(({ createBrain }) => {
    const mem = navigator.deviceMemory || 8;
    brain = createBrain($('#brain'), { count: mobile() ? 7000 : mem <= 4 ? 11000 : 17000, mobile: mobile(), reduced });
    root.classList.add('webgl');
    brainReady = true;
    activeShape = '';
    onScroll();
    if (fine) {
      addEventListener('pointermove', (e) => brain.setPointer((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1), { passive: true });
      document.addEventListener('pointerleave', () => brain.leavePointer());
    }
  }).catch(() => { brainReady = true; });
} else {
  brainReady = true;
}

// ---------------------------------------------------------------- scroll-driven pieces
const marquee = $('.marquee-track');
const trades = $('#trades'), track = $('#trades-track');
const cycle = $('#cycle'), cycleSteps = $$('#cycle-steps li'), ringNum = $('#ring-num');
const scrubs = $$('.scrub-words');
let lastY = scrollY, velocity = 0, activeShape = '', cycleIdx = 0;

function progress(el) {
  const r = el.getBoundingClientRect(), total = r.height - innerHeight;
  return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
}

function onScroll() {
  const y = scrollY;
  velocity = lenis ? lenis.velocity : y - lastY;
  const dir = y - lastY;
  lastY = y;

  nav.classList.toggle('is-solid', y > 40);
  if (!root.classList.contains('menu-open')) nav.classList.toggle('is-hidden', dir > 4 && y > innerHeight * 0.8);
  if (dir < -4) nav.classList.remove('is-hidden');

  // which section drives the brain
  let id = sections[0].id;
  for (const s of sections) if (s.getBoundingClientRect().top <= innerHeight * 0.55) id = s.id;
  if (brain && id !== activeShape) { activeShape = id; brain.setTarget(poseFor(id)); }
  if (brain) brain.setVelocity(velocity);

  // nav highlight
  navLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + id));

  // trades run sideways while the section is pinned
  if (track && !mobile()) {
    const p = progress(trades), max = track.scrollWidth - innerWidth;
    track.style.transform = `translate3d(${-p * Math.max(0, max)}px, 0, 0)`;
  }

  // the cycle steps advance with the scroll
  if (cycle && !mobile()) {
    const idx = clamp(Math.floor(progress(cycle) * 6), 0, 5);
    if (idx !== cycleIdx) {
      cycleIdx = idx;
      cycleSteps.forEach((li, i) => li.classList.toggle('is-active', i === idx));
      ringNum.textContent = String(idx + 1).padStart(2, '0');
    }
  }

  // statements light up word by word
  scrubs.forEach((el) => {
    const r = el.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.55), 0, 1);
    const words = el.children, on = Math.round(p * words.length);
    for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < on);
  });

  // marquee leans with scroll speed
  if (marquee && !reduced) marquee.parentElement.style.transform = `rotate(-2deg) scale(1.04) skewX(${clamp(-velocity * 0.15, -8, 8)}deg)`;
}
if (lenis) lenis.on('scroll', onScroll); else addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// ---------------------------------------------------------------- what's included: the window follows the copy
const panels = $$('.inc-stage .panel'), incs = $$('.inc'), url = $('#win-url');
const URLS = ['yourbusiness.com', 'myCenter', 'yourbusiness.com/estimate', 'yourbusiness.com/pay'];
const incIo = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const i = +e.target.dataset.panel;
    incs.forEach((el) => el.classList.toggle('is-active', el === e.target));
    panels.forEach((p) => p.classList.toggle('is-active', +p.dataset.panel === i));
    if (url) url.textContent = URLS[i];
  });
}, { rootMargin: '-45% 0px -45% 0px' });
incs.forEach((el) => incIo.observe(el));
if (incs[0]) incs[0].classList.add('is-active');

// ---------------------------------------------------------------- how it works: the build log types itself
const term = $('#term');
const LOG = [
  ['c-mut', '$ '], ['', 'mycroi new "Your Business" --trade hvac\n'],
  ['c-lime', '✓ '], ['', 'Address connected      '], ['c-mut', 'yourbusiness.mycroi.com\n'],
  ['c-lime', '✓ '], ['', 'SSL certificate issued\n'],
  ['c-lime', '✓ '], ['', 'Hosting ready\n'],
  ['c-cyan', '→ '], ['', 'Building your pages\n'],
  ['c-mut', '  + /ac-repair  + /furnace-tune-ups  + /new-installs\n  + /mesa  + /chandler  + /gilbert\n'],
  ['c-lime', '✓ '], ['', 'Sitemap sent to Google\n\n'],
  ['c-cyan', '◆ '], ['', 'New lead from your site   '], ['c-mut', 'Quote request with 2 photos\n'],
  ['c-cyan', '◆ '], ['', 'Estimate approved         '], ['c-mut', 'Approved online\n'],
  ['c-cyan', '◆ '], ['', 'Invoice paid by card      '], ['c-mut', '$287, receipt emailed\n']
];
function typeLog() {
  if (!term) return;
  if (reduced) { term.innerHTML = LOG.map(([c, t]) => `<span class="${c}">${esc(t)}</span>`).join(''); return; }
  let seg = 0, ch = 0, html = '';
  const caret = '<span class="caret"></span>';
  (function step() {
    if (seg >= LOG.length) { term.innerHTML = html + caret; return; }
    const [c, t] = LOG[seg];
    ch++;
    const part = `<span class="${c}">${esc(t.slice(0, ch))}</span>`;
    term.innerHTML = html + part + caret;
    if (ch >= t.length) { html += part; seg++; ch = 0; setTimeout(step, t.endsWith('\n') ? 220 : 30); }
    else setTimeout(step, 16 + Math.random() * 24);
  })();
}
if (term) {
  const tio = new IntersectionObserver((es) => { if (es[0].isIntersecting) { tio.disconnect(); typeLog(); } }, { threshold: 0.35 });
  tio.observe(term);
}

// ---------------------------------------------------------------- the phone feed
const notes = $$('.ph-note');
if (notes.length) {
  const pio = new IntersectionObserver((es) => {
    if (!es[0].isIntersecting) return;
    pio.disconnect();
    notes.forEach((n, i) => setTimeout(() => n.classList.add('in'), 300 + i * 650));
  }, { threshold: 0.3 });
  pio.observe($('.phone'));
}

// ---------------------------------------------------------------- pricing
const money = (n) => '$' + n.toLocaleString('en-US');
$$('.billing button').forEach((b) => b.addEventListener('click', () => {
  const yearly = b.dataset.bill === 'y';
  $$('.billing button').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
  $$('.plan').forEach((p) => {
    const m = +p.dataset.m, price = p.querySelector('.price');
    price.innerHTML = yearly ? `<b>${money(m * 10)}</b><span>/yr, 2 months free</span>` : `<b>${money(m)}</b><span>/mo</span>`;
  });
}));

// ---------------------------------------------------------------- add-on builder
const buildPlan = $('#build-plan'), buildItems = $('#build-items'), buildTotal = $('#build-total'), buildCta = $('#build-cta');
function updateBuild() {
  const plan = $('input[name="build-plan"]:checked');
  if (!plan) return;
  const isScale = plan.value === 'scale';
  let total = +plan.dataset.m;
  const rows = [`<li><span>${plan.parentElement.textContent.trim()} plan</span><span>${money(+plan.dataset.m)}</span></li>`];
  $$('.addon').forEach((label) => {
    const box = label.querySelector('input'), name = label.querySelector('b').textContent, inc = isScale && box.dataset.scale;
    label.classList.toggle('is-included', !!inc);
    label.querySelector('em').textContent = inc ? 'Included' : '+' + money(+box.dataset.price);
    if (box.checked) {
      rows.push(`<li><span>${esc(name)}</span><span>${inc ? 'Included' : '+' + money(+box.dataset.price)}</span></li>`);
      if (!inc) total += +box.dataset.price;
    }
  });
  buildPlan.textContent = plan.parentElement.textContent.trim();
  buildItems.innerHTML = rows.join('');
  buildTotal.textContent = money(total);
  buildCta.href = 'https://mycroi.com/start?plan=' + plan.value;
}
$$('.plan-pick input, .addon input').forEach((i) => i.addEventListener('change', updateBuild));
updateBuild();

// ---------------------------------------------------------------- contact form
const form = $('#contact-form'), err = $('#form-err'), okBox = $('#form-ok'), sendBtn = $('#form-btn');
if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  err.hidden = true;
  let bad = null;
  ['name', 'business', 'email'].forEach((n) => {
    const f = form.elements[n], invalid = !f.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(f.value.trim()));
    f.setAttribute('aria-invalid', invalid);
    if (invalid && !bad) bad = f;
  });
  if (bad) { err.textContent = 'Please add your name, business name and a valid email.'; err.hidden = false; bad.focus(); return; }
  const data = Object.fromEntries(new FormData(form));
  data.sms = form.elements.sms.checked;
  sendBtn.disabled = true;
  sendBtn.querySelector('span').textContent = 'Sending…';
  try {
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error('send');
    form.hidden = true;
    okBox.hidden = false;
  } catch {
    err.textContent = "We couldn't send your message. Please try again in a moment.";
    err.hidden = false;
  } finally {
    sendBtn.disabled = false;
    sendBtn.querySelector('span').textContent = 'Send message';
  }
});
