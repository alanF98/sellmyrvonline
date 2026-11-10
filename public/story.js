/* Scrollytelling with three photographs of the coach: scroll zooms out from the cab to the full coach, crossfades to
   the desert shot and then to the camp shot. Pins explain what is visible; a magnifier inspects the paint and wheels.
   Plain canvas 2D, no third-party libraries. The photographs load only when the section is near the viewport.
   If they fail to load, or with scripting off, the chapters read as plain text. */
(function () {
  var root = document.getElementById('story');
  if (!root) return;
  var stage = document.getElementById('story-stage');
  var host = document.getElementById('story-canvas');
  var pinsHost = document.getElementById('story-pins');
  var info = document.getElementById('story-info');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAV = 72;

  // Each shot: the file and the share of its width the coach spans (used to frame it on a phone).
  var SHOTS = {
    cab:    { src: '/rv/cab.jpg',    span: 0.80 },
    desert: { src: '/rv/desert.jpg', span: 0.52 },
    camp:   { src: '/rv/camp.jpg',   span: 0.46 }
  };
  var ORDER = ['cab', 'desert', 'camp'];

  // Pins: positions are fractions of each photograph (u, v), checked against the photos.
  var PINS = [
    { id: 'windshield', from: 0.00, to: 0.45, title: 'Panoramic windshield', text: 'A wide, curved windshield gives the driver an open view of the road.',
      at: { cab: [0.66, 0.45], desert: [0.80, 0.57], camp: [0.75, 0.57] } },
    { id: 'mirrors', from: 0.00, to: 0.45, title: 'Chrome mirrors', text: 'Tall chrome mirror arms reach out past the front corners.',
      at: { cab: [0.53, 0.52], desert: [0.73, 0.62], camp: [0.73, 0.64] } },
    { id: 'lights', from: 0.00, to: 0.38, title: 'Headlights', text: 'Headlights with fog lights set low in the front bumper.',
      at: { cab: [0.57, 0.75], desert: [0.75, 0.78], camp: [0.72, 0.755] } },
    { id: 'paint', from: 0.14, to: 0.72, title: 'Full-body paint', text: 'Flowing graphics in espresso, champagne and bronze run the length of the coach.',
      at: { cab: [0.21, 0.63], desert: [0.47, 0.65], camp: [0.47, 0.56] } },
    { id: 'wheels', from: 0.16, to: 0.80, title: 'Polished wheels', text: 'Polished wheels, with two axles at the rear.',
      at: { cab: [0.40, 0.83], desert: [0.65, 0.82], camp: [0.63, 0.78] } },
    { id: 'seats', from: 0.72, to: 1.00, title: 'Outdoor seating', text: 'Camp chairs on a rug beside the coach, set up for the evening.',
      at: { camp: [0.40, 0.72] } }
  ];

  var images = {}, bgs = {}, loaded = 0, started = false, visible = false;
  var canvas, ctx, vw = 0, vh = 0, dpr = 1;
  var target = 0, cur = 0, dirty = true, pinsOn = true, loupe = false, mouse = { x: -1, y: -1 }, activeKey = 'cab', activeT = null;
  var pinEls = {};

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function off() { root.classList.add('story--off'); }

  function start() {
    if (started) return;
    started = true;
    ORDER.forEach(function (k) {
      var im = new Image();
      im.onload = function () { loaded++; if (loaded === ORDER.length) ready(); };
      im.onerror = off;
      im.src = SHOTS[k].src;
      images[k] = im;
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) start(); }, { rootMargin: '900px 0px' }).observe(root);
  } else {
    start();
  }

  function ready() {
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    ctx = canvas.getContext('2d', { alpha: false });
    host.appendChild(canvas);
    PINS.forEach(buildPin);
    resize();
    readScroll(true);
    root.classList.add('story--live');
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; dirty = true; }).observe(stage);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host); else addEventListener('resize', resize);
    addEventListener('scroll', function () { readScroll(false); }, { passive: true });
    wire();
    frame();
  }

  // ---------------------------------------------------------------- layout
  function resize() {
    vw = Math.max(1, host.clientWidth); vh = Math.max(1, host.clientHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(vw * dpr); canvas.height = Math.round(vh * dpr);
    canvas.style.width = vw + 'px'; canvas.style.height = vh + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ORDER.forEach(buildBg);
    dirty = true;
  }

  // A tiny cover-fit copy of each photo, scaled up behind the photo on tall phone screens (a soft blurred fill).
  function buildBg(k) {
    var im = images[k], w = 24, h = Math.max(8, Math.round(24 * vh / vw));
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var g = c.getContext('2d');
    var s = Math.max(w / im.naturalWidth, h / im.naturalHeight), dw = im.naturalWidth * s, dh = im.naturalHeight * s;
    g.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
    // Upscale in steps so the fill stays soft instead of showing blocks.
    for (var i = 0; i < 3; i++) {
      var n = document.createElement('canvas'); n.width = c.width * 2; n.height = c.height * 2;
      var ng = n.getContext('2d'); ng.imageSmoothingQuality = 'high'; ng.drawImage(c, 0, 0, n.width, n.height);
      c = n;
    }
    bgs[k] = c;
  }

  function portrait() { return vw / vh < 0.9; }

  function transform(k, zoom, fx, fy) {
    var im = images[k], iw = im.naturalWidth, ih = im.naturalHeight, va = vw / vh, ia = iw / ih, scale, tx, ty;
    if (!portrait()) { scale = (va > ia ? vw / iw : vh / ih) * zoom; tx = 0.54; ty = 0.53; }
    else { scale = (vw / iw) * (0.9 / SHOTS[k].span) * zoom; tx = 0.5; ty = 0.34; }
    var dw = iw * scale, dh = ih * scale;
    var x = vw * tx - fx * dw, y = vh * ty - fy * dh;
    x = dw >= vw ? clamp(x, vw - dw, 0) : (vw - dw) / 2;
    y = dh >= vh ? clamp(y, vh - dh, 0) : clamp(y, 0, vh - dh);
    return { x: x, y: y, w: dw, h: dh };
  }

  function camera(k, p) {
    var pt = portrait();
    if (k === 'cab') { var t = smooth(0, 0.48, p); return transform(k, lerp(pt ? 1.35 : 1.52, 1, t), lerp(0.63, 0.48, t), lerp(0.56, 0.54, t)); }
    if (k === 'desert') { var u = smooth(0.33, 0.68, p); return transform(k, lerp(pt ? 1.2 : 1.36, 1.02, u), lerp(0.63, 0.55, u), lerp(0.64, 0.56, u)); }
    var w = smooth(0.64, 0.96, p); return transform(k, lerp(pt ? 1.15 : 1.18, 1, w), lerp(0.57, 0.5, w), lerp(0.61, 0.54, w));
  }

  function drawShot(k, tr, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    if (tr.w < vw || tr.h < vh) {
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(bgs[k], 0, 0, vw, vh);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(0, 0, vw, vh);
    }
    ctx.drawImage(images[k], tr.x, tr.y, tr.w, tr.h);
    ctx.restore();
  }

  function render() {
    var p = cur;
    var b12 = smooth(0.33, 0.50, p), b23 = smooth(0.64, 0.83, p);
    ctx.fillStyle = '#120904'; ctx.fillRect(0, 0, vw, vh);
    var tr = {};
    if (b12 < 0.999) { tr.cab = camera('cab', p); drawShot('cab', tr.cab, 1); }
    if (b12 > 0.001 && b23 < 0.999) { tr.desert = camera('desert', p); drawShot('desert', tr.desert, b12 < 0.999 ? b12 : 1); }
    if (b23 > 0.001) {
      if (!tr.desert) { tr.desert = camera('desert', p); if (b12 >= 0.999) drawShot('desert', tr.desert, 1); }
      tr.camp = camera('camp', p); drawShot('camp', tr.camp, b23);
    }
    activeKey = b23 > 0.5 ? 'camp' : b12 > 0.5 ? 'desert' : 'cab';
    activeT = tr[activeKey];
    placePins(p);
    if (loupe && activeT) drawLoupe();
  }

  // ---------------------------------------------------------------- pins
  function buildPin(h) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'story-pin'; b.setAttribute('aria-label', h.title); b.hidden = true;
    b.innerHTML = '<span class="story-pin-dot" aria-hidden="true"></span><span class="story-pin-tip">' + h.title + '</span>';
    b.addEventListener('click', function (e) { e.stopPropagation(); openInfo(h); });
    pinsHost.appendChild(b); pinEls[h.id] = b;
  }
  function placePins(p) {
    PINS.forEach(function (h) {
      var el = pinEls[h.id], uv = h.at[activeKey];
      var on = pinsOn && !loupe && activeT && uv && p >= h.from && p <= h.to;
      if (!on) { el.hidden = true; return; }
      el.hidden = false;
      el.style.left = (activeT.x + uv[0] * activeT.w) + 'px';
      el.style.top = (activeT.y + uv[1] * activeT.h) + 'px';
    });
  }
  function openInfo(h) {
    document.getElementById('story-info-title').textContent = h.title;
    document.getElementById('story-info-text').textContent = h.text;
    info.hidden = false;
  }

  // ---------------------------------------------------------------- magnifier
  function drawLoupe() {
    var r = stage.getBoundingClientRect(), mx = mouse.x - r.left, my = mouse.y - r.top;
    if (mouse.x < 0 || mx < 0 || my < 0 || mx > vw || my > vh) return;
    var radius = vw < 700 ? 72 : 110, boost = 2.4, tr = activeT;
    var u = (mx - tr.x) / tr.w, v = (my - tr.y) / tr.h;
    if (u < 0 || u > 1 || v < 0 || v > 1) return;
    ctx.save();
    ctx.beginPath(); ctx.arc(mx, my, radius, 0, Math.PI * 2); ctx.clip();
    var zw = tr.w * boost, zh = tr.h * boost;
    ctx.drawImage(images[activeKey], mx - u * zw, my - v * zh, zw, zh);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = '#f1ece6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(mx, my, radius, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  // ---------------------------------------------------------------- scroll and loop
  function total() { return Math.max(1, root.offsetHeight - (innerHeight - NAV)); }
  function readScroll(snap) {
    target = clamp((NAV - root.getBoundingClientRect().top) / total(), 0, 1);
    if (snap || reduced) cur = target;
    dirty = true;
  }
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    var d = target - cur;
    if (Math.abs(d) > 0.0002) { cur += d * 0.14; dirty = true; } else if (cur !== target) { cur = target; dirty = true; }
    if (loupe) dirty = true;
    if (!dirty) return;
    dirty = false;
    render();
  }

  function jump(p) {
    var top = root.getBoundingClientRect().top + scrollY - NAV + p * total();
    scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
  }
  function setLoupe(on) {
    loupe = on;
    stage.classList.toggle('free', on);
    var t = document.getElementById('story-free');
    if (t) { t.setAttribute('aria-pressed', on ? 'true' : 'false'); t.textContent = on ? 'Leave magnifier' : 'Magnifier'; }
    dirty = true;
  }
  function wire() {
    document.getElementById('story-free').addEventListener('click', function () { setLoupe(!loupe); });
    document.getElementById('story-exit').addEventListener('click', function () { setLoupe(false); });
    document.getElementById('story-pinstoggle').addEventListener('click', function () {
      pinsOn = !pinsOn; this.setAttribute('aria-pressed', pinsOn ? 'true' : 'false'); if (!pinsOn) info.hidden = true; dirty = true;
    });
    document.getElementById('story-info-close').addEventListener('click', function () { info.hidden = true; });
    [].forEach.call(root.querySelectorAll('[data-jump]'), function (b) { b.addEventListener('click', function () { jump(parseFloat(b.dataset.jump)); }); });
    stage.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    stage.addEventListener('pointerdown', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    stage.addEventListener('pointerleave', function () { mouse.x = -1; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (loupe) setLoupe(false); info.hidden = true; } });
  }
})();
