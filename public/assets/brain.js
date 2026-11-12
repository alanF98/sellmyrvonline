// The particle brain: one point cloud that morphs between shapes (brain, myCROI logo, browser window, ring,
// star field, burst) as the page scrolls. Neural links pulse while it is a brain; the cursor pushes particles aside.
import * as THREE from 'three';

function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function onSphere(r) {
  const u = r() * 2 - 1, th = r() * Math.PI * 2, s = Math.sqrt(1 - u * u);
  return [s * Math.cos(th), u, s * Math.sin(th)];
}

// ---------------------------------------------------------------- shapes (all with the same point count)
function brainShape(n) {
  const r = rng(11), out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = r();
    let x, y, z;
    if (k < 0.76) {
      // two hemispheres with cortical folds and a flat medial face
      const side = i % 2 ? 1 : -1;
      const [dx, dy, dz] = onSphere(r);
      const theta = Math.atan2(dz, dx), phi = Math.acos(dy);
      const fold = 0.075 * Math.sin(9 * theta + 3 * Math.sin(5 * phi)) * Math.cos(7 * phi + theta * 2) + 0.03 * Math.sin(23 * phi + 4 * theta);
      const rr = 1 + fold + (r() - 0.5) * 0.03;
      let lx = dx * 0.98 * rr, ly = dy * 0.92 * rr, lz = dz * 1.32 * rr;
      if (lx * side < 0) lx *= 0.28;               // flatten toward the midline
      if (ly < -0.35 && Math.abs(lz) < 0.6) ly *= 0.85; // temporal lobe tuck
      x = side * 0.6 + lx; y = ly + 0.08; z = lz;
    } else if (k < 0.89) {
      // cerebellum with fine striations
      const [dx, dy, dz] = onSphere(r);
      const rr = 1 + 0.06 * Math.sin(28 * dy) + (r() - 0.5) * 0.03;
      x = dx * 0.95 * rr; y = -0.78 + dy * 0.42 * rr; z = -0.98 + dz * 0.55 * rr;
    } else if (k < 0.94) {
      // brain stem
      const t = r(), a = r() * Math.PI * 2, rad = 0.17 * (1 - t * 0.3) * Math.sqrt(r());
      x = Math.cos(a) * rad; y = -0.62 - t * 0.95; z = -0.42 + t * 0.12 + Math.sin(a) * rad;
    } else {
      // a faint inner volume
      const [dx, dy, dz] = onSphere(r), m = Math.cbrt(r()) * 0.82;
      x = dx * 1.5 * m; y = dy * 0.85 * m + 0.05; z = dz * 1.25 * m;
    }
    out[i * 3] = x; out[i * 3 + 1] = y; out[i * 3 + 2] = z;
  }
  return out;
}

function lerpSeg(r, a, b, jitter, zj) {
  const t = r();
  return [a[0] + (b[0] - a[0]) * t + (r() - 0.5) * jitter, a[1] + (b[1] - a[1]) * t + (r() - 0.5) * jitter, (r() - 0.5) * zj];
}

function polyline(r, pts, jitter, zj) {
  // pick a segment weighted by length
  const lens = [], total = pts.slice(1).reduce((s, p, i) => { const l = Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]); lens.push(l); return s + l; }, 0);
  let x = r() * total, i = 0;
  while (x > lens[i] && i < lens.length - 1) { x -= lens[i]; i++; }
  return lerpSeg(r, pts[i], pts[i + 1], jitter, zj);
}

function logoShape(n) {
  // the myCROI mark: a hexagon with a rising chart line (from the 30x30 favicon path)
  const r = rng(23), out = new Float32Array(n * 3), s = 0.17;
  const P = (x, y) => [(x - 15) * s, -(y - 15) * s];
  const hex = [P(15, 4), P(25, 10), P(25, 20), P(15, 26), P(5, 20), P(5, 10), P(15, 4)];
  const chart = [P(10, 17), P(14, 12), P(17, 15), P(21, 10)];
  for (let i = 0; i < n; i++) {
    const k = r();
    let p;
    if (k < 0.62) p = polyline(r, hex, 0.12, 0.35);
    else if (k < 0.86) p = polyline(r, chart, 0.1, 0.3);
    else { const [dx, dy, dz] = onSphere(r), m = 2.2 + r() * 1.6; p = [dx * m, dy * m * 0.8, dz * m * 0.4]; }
    out.set(p, i * 3);
  }
  return out;
}

function browserShape(n) {
  const r = rng(37), out = new Float32Array(n * 3);
  const W = 2.4, H = 1.55;
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  const parts = [
    [0.22, () => polyline(r, rect(-W, -H, W, H), 0.03, 0.06)],
    [0.06, () => lerpSeg(r, [-W, H - 0.32], [W, H - 0.32], 0.02, 0.04)],
    [0.03, () => { const c = [-W + 0.25 + Math.floor(r() * 3) * 0.2, H - 0.16]; const a = r() * Math.PI * 2, m = 0.06 * Math.sqrt(r()); return [c[0] + Math.cos(a) * m, c[1] + Math.sin(a) * m, 0]; }],
    [0.06, () => polyline(r, rect(-W + 0.3, H - 0.62, W - 0.3, H - 0.46), 0.02, 0.04)],
    [0.16, () => { const row = Math.floor(r() * 3), len = [3.2, 2.6, 1.6][row]; return lerpSeg(r, [-W + 0.35, 0.65 - row * 0.32], [-W + 0.35 + len, 0.65 - row * 0.32], 0.05, 0.05); }],
    [0.05, () => polyline(r, rect(-W + 0.35, -0.5, -W + 1.45, -0.22), 0.02, 0.04)],
    [0.22, () => { const c = Math.floor(r() * 3), x0 = -W + 0.35 + c * 1.55; return polyline(r, rect(x0, -H + 0.25, x0 + 1.35, -0.75), 0.03, 0.06); }],
    [0.2, () => { const row = Math.floor(r() * 4), x0 = 0.6 + (row % 2) * 0.25, len = 0.6 + ((row * 37) % 10) / 10; return lerpSeg(r, [x0, 0.1 - row * 0.2], [x0 + len, 0.1 - row * 0.2], 0.03, 0.05); }]
  ];
  for (let i = 0; i < n; i++) {
    let k = r(), j = 0;
    while (k > parts[j][0] && j < parts.length - 1) { k -= parts[j][0]; j++; }
    out.set(parts[j][1](), i * 3);
  }
  return out;
}

function ringShape(n) {
  const r = rng(51), out = new Float32Array(n * 3), R = 2.1, tilt = -1.05, ct = Math.cos(tilt), st = Math.sin(tilt);
  for (let i = 0; i < n; i++) {
    const k = r();
    let x, y, z;
    if (k < 0.66) {
      const a = r() * Math.PI * 2, b = r() * Math.PI * 2, m = 0.07 * Math.sqrt(r());
      x = (R + Math.cos(b) * m) * Math.cos(a); y = Math.sin(b) * m; z = (R + Math.cos(b) * m) * Math.sin(a);
    } else if (k < 0.92) {
      const node = Math.floor(r() * 6), a = node / 6 * Math.PI * 2 - Math.PI / 2;
      const [dx, dy, dz] = onSphere(r), m = 0.24 * Math.cbrt(r());
      x = R * Math.cos(a) + dx * m; y = dy * m; z = R * Math.sin(a) + dz * m;
    } else {
      const a = r() * Math.PI * 2, m = R * (0.2 + r() * 1.3);
      x = Math.cos(a) * m; y = (r() - 0.5) * 0.6; z = Math.sin(a) * m;
    }
    out[i * 3] = x; out[i * 3 + 1] = y * ct - z * st; out[i * 3 + 2] = y * st + z * ct;
  }
  return out;
}

function starShape(n) {
  const r = rng(73), out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = onSphere(r), m = 5 + r() * 8;
    out[i * 3] = dx * m * 1.4; out[i * 3 + 1] = dy * m * 0.8; out[i * 3 + 2] = dz * m - 4;
  }
  return out;
}

function burstShape(n) {
  const r = rng(89), out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = onSphere(r), ray = r() < 0.5 ? 1 + Math.pow(r(), 3) * 3.5 : 1 + (r() - 0.5) * 0.05;
    const m = 2.4 * ray;
    out[i * 3] = dx * m; out[i * 3 + 1] = dy * m; out[i * 3 + 2] = dz * m;
  }
  return out;
}

// ---------------------------------------------------------------- shaders
const VERT = `
attribute vec3 aFrom; attribute vec3 aTo; attribute float aRand; attribute vec3 aColor;
uniform float uMix, uTime, uSize, uPixel, uSwirl, uMouseOn; uniform vec3 uMouse;
varying vec3 vColor; varying float vTw;
float ease(float t){ return t < .5 ? 4.*t*t*t : 1. - pow(-2.*t + 2., 3.) / 2.; }
void main(){
  float t = ease(clamp(uMix * 1.6 - aRand * 0.6, 0., 1.));
  vec3 p = mix(aFrom, aTo, t);
  float mid = sin(t * 3.14159);
  vec3 n = vec3(sin(aRand*40. + uTime*1.3 + p.y*2.), cos(aRand*33. + uTime*1.1 + p.x*2.), sin(aRand*21. + uTime*.9 + p.z*2.));
  p += n * (1.1 * mid * uSwirl + 0.018);
  vec2 d = p.xy - uMouse.xy;
  float f = smoothstep(1.3, 0., length(d)) * uMouseOn;
  p.xy += normalize(d + 1e-4) * f * 0.55;
  p.z += f * 0.4;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixel * (0.55 + aRand * 0.9) / -mv.z;
  vColor = aColor + f * 0.35;
  vTw = 0.6 + 0.4 * sin(uTime * 2. + aRand * 30.);
}`;
const FRAG = `
uniform float uOpacity; varying vec3 vColor; varying float vTw;
void main(){
  float d = length(gl_PointCoord - .5);
  if (d > .5) discard;
  float a = smoothstep(.5, .0, d);
  gl_FragColor = vec4(vColor, a * a * vTw * uOpacity);
}`;
const LVERT = `
attribute float aT; attribute float aSeed; varying float vT; varying float vSeed;
void main(){ vT = aT; vSeed = aSeed; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;
const LFRAG = `
uniform float uTime, uAlpha; varying float vT; varying float vSeed;
void main(){
  float head = fract(uTime * (0.25 + vSeed * 0.35) + vSeed * 7.);
  float pulse = exp(-pow((vT - head) * 9., 2.));
  vec3 c = mix(vec3(0.43, 0.9, 0.95), vec3(0.78, 0.96, 0.26), pulse);
  gl_FragColor = vec4(c, (0.05 + pulse * 0.9) * uAlpha);
}`;

export function createBrain(canvas, opts) {
  const mobile = opts.mobile, reduced = opts.reduced;
  const N = opts.count;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  const pixel = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
  renderer.setPixelRatio(pixel);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 9);
  const group = new THREE.Group();
  scene.add(group);

  const shapes = { brain: brainShape(N), logo: logoShape(N), browser: browserShape(N), ring: ringShape(N), stars: starShape(N), burst: burstShape(N) };

  const geo = new THREE.BufferGeometry();
  const from = new Float32Array(shapes.stars), to = new Float32Array(shapes.brain);
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  geo.setAttribute('aFrom', new THREE.BufferAttribute(from, 3));
  geo.setAttribute('aTo', new THREE.BufferAttribute(to, 3));
  const rand = new Float32Array(N), col = new Float32Array(N * 3), r = rng(5);
  const lime = new THREE.Color('#c8f542'), cyan = new THREE.Color('#6ee7f2'), white = new THREE.Color('#eef1ea');
  for (let i = 0; i < N; i++) {
    rand[i] = r();
    const k = r(), c = k < 0.55 ? lime.clone().lerp(cyan, r() * 0.35) : k < 0.92 ? cyan.clone().lerp(lime, r() * 0.3) : white;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);

  const uniforms = {
    uMix: { value: 0 }, uTime: { value: 0 }, uSize: { value: mobile ? 34 : 30 }, uPixel: { value: pixel },
    uSwirl: { value: 1 }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uMouseOn: { value: 0 }, uOpacity: { value: 1 }
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  group.add(points);

  // neural links between nearby points of the brain
  const B = shapes.brain, L = mobile ? 420 : 900, lp = new Float32Array(L * 6), lt = new Float32Array(L * 2), ls = new Float32Array(L * 2);
  const lr = rng(97);
  for (let i = 0; i < L; i++) {
    const a = Math.floor(lr() * N * 0.76);
    let best = -1, bd = 9;
    for (let c = 0; c < 40; c++) {
      const b = Math.floor(lr() * N * 0.76);
      const d = Math.hypot(B[a * 3] - B[b * 3], B[a * 3 + 1] - B[b * 3 + 1], B[a * 3 + 2] - B[b * 3 + 2]);
      if (d > 0.18 && d < bd) { bd = d; best = b; }
    }
    if (best < 0 || bd > 0.75) best = a;
    lp.set([B[a * 3], B[a * 3 + 1], B[a * 3 + 2], B[best * 3], B[best * 3 + 1], B[best * 3 + 2]], i * 6);
    lt[i * 2] = 0; lt[i * 2 + 1] = 1;
    const s = lr(); ls[i * 2] = s; ls[i * 2 + 1] = s;
  }
  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute('position', new THREE.BufferAttribute(lp, 3));
  lgeo.setAttribute('aT', new THREE.BufferAttribute(lt, 1));
  lgeo.setAttribute('aSeed', new THREE.BufferAttribute(ls, 1));
  const lmat = new THREE.ShaderMaterial({ vertexShader: LVERT, fragmentShader: LFRAG, uniforms: { uTime: uniforms.uTime, uAlpha: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const links = new THREE.LineSegments(lgeo, lmat);
  group.add(links);

  // ---------------------------------------------------------------- state
  let current = 'brain', mixing = false, mixStart = 0;
  const MIX_MS = reduced ? 1 : 1700;
  const target = { x: 0, y: 0, s: 1, o: 1, spin: 0.08 };
  const pose = { x: 0, y: 0, s: 1, o: 0 };
  const pointer = { x: 0, y: 0, on: 0 }, tilt = { x: 0, y: 0 };
  let velocity = 0, spinAngle = 0, raf = 0, last = performance.now(), running = true;

  function setTarget(cfg) {
    Object.assign(target, cfg);
    if (cfg.shape && cfg.shape !== current) {
      from.set(shapes[current]);
      to.set(shapes[cfg.shape]);
      geo.attributes.aFrom.needsUpdate = true;
      geo.attributes.aTo.needsUpdate = true;
      current = cfg.shape;
      uniforms.uMix.value = 0;
      mixing = true; mixStart = performance.now();
    }
  }
  // first shape: stars gather into the brain
  mixing = true; mixStart = performance.now() + 250;

  function setPointer(x, y) { pointer.x = x; pointer.y = y; pointer.on = 1; }
  function leavePointer() { pointer.on = 0; }
  function setVelocity(v) { velocity = v; }

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    uniforms.uTime.value += dt;

    if (mixing) {
      const k = Math.max(0, Math.min(1, (now - mixStart) / MIX_MS));
      uniforms.uMix.value = k;
      if (k >= 1) mixing = false;
    }
    lmat.uniforms.uAlpha.value += (((current === 'brain' && !mixing) ? 1 : 0) - lmat.uniforms.uAlpha.value) * Math.min(1, dt * 3);

    const ease = Math.min(1, dt * 2.2);
    pose.x += (target.x - pose.x) * ease;
    pose.y += (target.y - pose.y) * ease;
    pose.s += (target.s - pose.s) * ease;
    pose.o += (target.o - pose.o) * ease;
    group.position.set(pose.x, pose.y, 0);
    group.scale.setScalar(pose.s);
    uniforms.uOpacity.value = pose.o;

    const TAU = Math.PI * 2, spins = current !== 'logo' && current !== 'browser';
    if (spins && !reduced) spinAngle += dt * (target.spin + Math.min(1.5, Math.abs(velocity) * 0.02));
    else spinAngle += (Math.round(spinAngle / TAU) * TAU - spinAngle) * ease;
    tilt.x += ((pointer.on ? pointer.x : 0) - tilt.x) * ease;
    tilt.y += ((pointer.on ? pointer.y : 0) - tilt.y) * ease;
    const px = tilt.x, py = tilt.y;
    group.rotation.y = spinAngle + px * 0.35;
    group.rotation.x = -py * 0.2 + (current === 'brain' ? 0.12 : 0);

    // pointer in the group's local space
    ndc.set(px, py);
    ray.setFromCamera(ndc, camera);
    if (pointer.on && ray.ray.intersectPlane(plane, hit)) {
      group.worldToLocal(hit);
      uniforms.uMouse.value.lerp(hit, Math.min(1, dt * 8));
    }
    uniforms.uMouseOn.value += ((pointer.on && !reduced ? 1 : 0) - uniforms.uMouseOn.value) * Math.min(1, dt * 4);

    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; last = performance.now(); });

  return { setTarget, setPointer, leavePointer, setVelocity, resize };
}
