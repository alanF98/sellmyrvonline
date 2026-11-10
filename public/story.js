/* Scrollytelling: a 3D luxury diesel-pusher coach driven by scroll (Three.js r160 + GSAP ScrollTrigger).
   The libraries load only when the section is near the viewport. Without WebGL, with scripting off or
   with reduced motion, the chapters read as plain text (and a still model when WebGL works).
   Three.js resolves through the import map in the page head. */
(function () {
  var root = document.getElementById('story');
  if (!root) return;
  var stage = document.getElementById('story-stage');
  var host = document.getElementById('story-canvas');
  var started = false;

  var GSAP = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
  ];

  function loadScript(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = src; s.async = false; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  function webglOk() {
    try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
  }
  function off() { root.classList.add('story--off'); }

  function start() {
    if (started) return;
    started = true;
    if (!webglOk()) return off();
    Promise.all([
      GSAP.reduce(function (p, src) { return p.then(function () { return loadScript(src); }); }, Promise.resolve()),
      import('three'),
      import('three/addons/controls/OrbitControls.js'),
      import('three/addons/geometries/RoundedBoxGeometry.js')
    ]).then(function (r) {
      build(r[1], r[2].OrbitControls, r[3].RoundedBoxGeometry);
    }).catch(function (e) { if (window.console) console.error(e); off(); });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) start(); }, { rootMargin: '900px 0px' }).observe(root);
  } else {
    start();
  }

  function build(THREE, OrbitControls, RoundedBoxGeometry) {
    gsap.registerPlugin(ScrollTrigger);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) root.classList.add('story--static');
    var phone = innerWidth < 700;

    var scene, camera, renderer, controls;
    var coachRoot, chassisGroup, slideLeftFront, slideLeftRear, slideRightPatio;
    var awningArmGroup, roofAssemblyGroup;
    var bayDoorsLeft = [], bayDoorsRight = [], wheelAssemblies = [], roadStreaks = [], desertSceneryItems = [];
    var captainChairLeft, captainChairRight, patioWarmLight, underbodyGlowLight;
    var liveryTexture, liveryCanvas, liveryCtx, mainCoachBodyMat, roofShellMat;
    var visible = true, isOrbitMode = false;

    var state = {
      camX: 8.2, camY: 2.15, camZ: 10.2, targetX: 0, targetY: 1.45, targetZ: 0.4, coachRotY: -0.38,
      suspensionDrop: 0, slideProgress: 0, bayDoorProgress: 0, awningProgress: 0,
      roofLift: 0, roofOpacity: 1.0, wheelSpeed: 1.0, chairSwivel: 0
    };

    var liveries = {
      obsidian: { base: '#0d0f14', upper: '#1a1d24', swoosh1: '#d4af37', swoosh2: '#e2e8f0', accent: '#f59e0b', lowerSkirt: '#090a0f' },
      titanium: { base: '#cbd5e1', upper: '#0f172a', swoosh1: '#38bdf8', swoosh2: '#475569', accent: '#0284c7', lowerSkirt: '#1e293b' },
      crimson:  { base: '#141418', upper: '#7f1d1d', swoosh1: '#ef4444', swoosh2: '#d4d4d8', accent: '#dc2626', lowerSkirt: '#09090b' },
      emerald:  { base: '#071712', upper: '#064e3b', swoosh1: '#d4af37', swoosh2: '#34d399', accent: '#10b981', lowerSkirt: '#040d0a' }
    };

    function size() { return { w: Math.max(1, host.clientWidth), h: Math.max(1, host.clientHeight) }; }
    function canvas2d(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

    // ---------------------------------------------------------------- procedural textures
    function createMasterworkLiveryTexture(key) {
      if (!liveryCanvas) { liveryCanvas = canvas2d(2048, 1024); liveryCtx = liveryCanvas.getContext('2d'); }
      var ctx = liveryCtx, w = liveryCanvas.width, h = liveryCanvas.height, p = liveries[key || 'obsidian'];
      var baseGrad = ctx.createLinearGradient(0, 0, 0, h);
      baseGrad.addColorStop(0, p.upper); baseGrad.addColorStop(0.48, p.base); baseGrad.addColorStop(1, p.lowerSkirt);
      ctx.fillStyle = baseGrad; ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, h * 0.62);
      ctx.bezierCurveTo(w * 0.32, h * 0.40, w * 0.65, h * 0.78, w, h * 0.45);
      ctx.lineTo(w, h * 0.60);
      ctx.bezierCurveTo(w * 0.65, h * 0.90, w * 0.32, h * 0.52, 0, h * 0.75);
      ctx.closePath();
      var sw = ctx.createLinearGradient(0, 0, w, 0);
      sw.addColorStop(0, p.swoosh1); sw.addColorStop(0.6, p.swoosh2); sw.addColorStop(1, p.swoosh1);
      ctx.fillStyle = sw; ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, h * 0.52);
      ctx.bezierCurveTo(w * 0.38, h * 0.28, w * 0.68, h * 0.62, w, h * 0.32);
      ctx.lineWidth = 16; ctx.strokeStyle = p.accent; ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.08, h * 0.14);
      ctx.quadraticCurveTo(w * 0.5, h * 0.22, w * 0.94, h * 0.12);
      ctx.lineWidth = 10; ctx.strokeStyle = p.swoosh1; ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)'; ctx.lineWidth = 4;
      for (var x = w * 0.18; x < w * 0.82; x += w * 0.09) { ctx.beginPath(); ctx.moveTo(x, h * 0.68); ctx.lineTo(x, h * 0.96); ctx.stroke(); }
      ctx.restore();

      if (!liveryTexture) {
        liveryTexture = new THREE.CanvasTexture(liveryCanvas);
        liveryTexture.colorSpace = THREE.SRGBColorSpace;
        liveryTexture.anisotropy = phone ? 2 : 8;
      } else {
        liveryTexture.needsUpdate = true;
      }
      return liveryTexture;
    }

    function createCalacattaMarbleTexture() {
      var c = canvas2d(1024, 1024), ctx = c.getContext('2d');
      ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, 1024, 1024);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.32)'; ctx.lineWidth = 3;
      for (var i = 0; i < 28; i++) {
        ctx.beginPath(); ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
        ctx.bezierCurveTo(Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024, Math.random() * 1024);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)'; ctx.lineWidth = 2;
      for (var j = 0; j <= 1024; j += 128) {
        ctx.beginPath(); ctx.moveTo(j, 0); ctx.lineTo(j, 1024); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(1024, j); ctx.stroke();
      }
      var tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 1);
      return tex;
    }

    function createSolarGridTexture() {
      var c = canvas2d(512, 512), ctx = c.getContext('2d');
      ctx.fillStyle = '#091526'; ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
      for (var i = 0; i <= 512; i += 64) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      }
      var tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
    }

    function createRearEngineLouversTexture() {
      var c = canvas2d(512, 512), ctx = c.getContext('2d');
      ctx.fillStyle = '#111318'; ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = '#040507';
      for (var y = 24; y < 488; y += 22) ctx.fillRect(28, y, 456, 12);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 8; ctx.strokeRect(20, 16, 472, 480);
      var tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
    }

    function createArizonaSkyTexture() {
      var c = canvas2d(2048, 1024), ctx = c.getContext('2d');
      var g = ctx.createLinearGradient(0, 0, 0, 1024);
      g.addColorStop(0.00, '#0f1026'); g.addColorStop(0.18, '#2b193d'); g.addColorStop(0.34, '#6b2038');
      g.addColorStop(0.45, '#b83c28'); g.addColorStop(0.51, '#f57f20'); g.addColorStop(0.54, '#ffd166');
      g.addColorStop(0.58, '#8c3b2b'); g.addColorStop(1.00, '#2a120c');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 2048, 1024);
      var sunX = 1480, sunY = 515;
      var glow = ctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, 340);
      glow.addColorStop(0.0, 'rgba(255, 252, 230, 1.0)'); glow.addColorStop(0.12, 'rgba(255, 215, 110, 0.92)');
      glow.addColorStop(0.38, 'rgba(249, 115, 22, 0.45)'); glow.addColorStop(1.0, 'rgba(249, 115, 22, 0.0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, 2048, 1024);
      for (var i = 0; i < 45; i++) {
        var cx = Math.random() * 2048, cy = 220 + Math.random() * 250, cw = 120 + Math.random() * 320, ch = 6 + Math.random() * 18;
        var cg = ctx.createLinearGradient(cx, cy, cx + cw, cy);
        cg.addColorStop(0, 'rgba(253, 186, 116, 0)'); cg.addColorStop(0.5, 'rgba(253, 186, 116, 0.16)'); cg.addColorStop(1, 'rgba(253, 186, 116, 0)');
        ctx.fillStyle = cg; ctx.fillRect(cx, cy, cw, ch);
      }
      var tex = new THREE.CanvasTexture(c);
      tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createArizonaSandTexture() {
      var c = canvas2d(1024, 1024), ctx = c.getContext('2d');
      ctx.fillStyle = '#8a3e28'; ctx.fillRect(0, 0, 1024, 1024);
      for (var y = 0; y < 1024; y += 16) { ctx.fillStyle = y % 32 === 0 ? 'rgba(168, 76, 46, 0.35)' : 'rgba(92, 36, 22, 0.30)'; ctx.fillRect(0, y, 1024, 8); }
      for (var i = 0; i < 6000; i++) {
        var r = 1 + Math.random() * 3;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(217, 119, 87, 0.35)' : 'rgba(69, 26, 16, 0.45)';
        ctx.fillRect(Math.random() * 1024, Math.random() * 1024, r, r);
      }
      var tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(28, 28);
      return tex;
    }

    function createDesertHighwayTexture() {
      var c = canvas2d(512, 512), ctx = c.getContext('2d');
      ctx.fillStyle = '#1c1b1d'; ctx.fillRect(0, 0, 512, 512);
      var ld = ctx.createLinearGradient(0, 0, 90, 0);
      ld.addColorStop(0, '#8a3e28'); ld.addColorStop(0.45, 'rgba(138, 62, 40, 0.45)'); ld.addColorStop(1, 'rgba(28, 27, 29, 0)');
      ctx.fillStyle = ld; ctx.fillRect(0, 0, 90, 512);
      var rd = ctx.createLinearGradient(422, 0, 512, 0);
      rd.addColorStop(0, 'rgba(28, 27, 29, 0)'); rd.addColorStop(0.55, 'rgba(138, 62, 40, 0.45)'); rd.addColorStop(1, '#8a3e28');
      ctx.fillStyle = rd; ctx.fillRect(422, 0, 90, 512);
      ctx.fillStyle = 'rgba(241, 245, 249, 0.75)'; ctx.fillRect(54, 0, 8, 512); ctx.fillRect(450, 0, 8, 512);
      for (var i = 0; i < 3500; i++) { ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.18)'; ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
      var tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 16);
      return tex;
    }

    // ---------------------------------------------------------------- scenery
    function setupLights() {
      var sun = new THREE.DirectionalLight(0xffb366, 3.1);
      sun.position.set(-18, 9.5, -14);
      sun.castShadow = true;
      sun.shadow.mapSize.set(phone ? 1024 : 2048, phone ? 1024 : 2048);
      sun.shadow.camera.near = 2; sun.shadow.camera.far = 55;
      var d = 12;
      sun.shadow.camera.left = -d; sun.shadow.camera.right = d; sun.shadow.camera.top = d; sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0005;
      scene.add(sun);
      scene.add(new THREE.HemisphereLight(0xfca5a5, 0x7c2d12, 1.15));
      var fill = new THREE.DirectionalLight(0xfde68a, 1.1); fill.position.set(12, 6, 12); scene.add(fill);
    }

    function createSaguaroCactus(scale, seed) {
      var group = new THREE.Group();
      var mat = new THREE.MeshStandardMaterial({ color: 0x2d5a36, roughness: 0.72, metalness: 0.05, flatShading: true });
      var mainHeight = 3.2 + (seed % 3) * 0.65;
      var trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, mainHeight, 12), mat);
      trunk.position.y = mainHeight / 2; trunk.castShadow = true; trunk.receiveShadow = true; group.add(trunk);
      var cap = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), mat); cap.position.y = mainHeight; group.add(cap);

      function addArm(dirX, attachY, armHeight, rotY) {
        var arm = new THREE.Group(); arm.position.set(0, attachY, 0); arm.rotation.y = rotY;
        var horiz = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.62, 10), mat);
        horiz.rotation.z = Math.PI / 2; horiz.position.x = dirX * 0.31; horiz.castShadow = true; arm.add(horiz);
        var elbow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat); elbow.position.x = dirX * 0.62; arm.add(elbow);
        var vert = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, armHeight, 10), mat);
        vert.position.set(dirX * 0.62, armHeight / 2, 0); vert.castShadow = true; arm.add(vert);
        var tip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), mat); tip.position.set(dirX * 0.62, armHeight, 0); arm.add(tip);
        group.add(arm);
      }
      addArm(1, mainHeight * 0.46, 1.35, 0.15);
      addArm(-1, mainHeight * 0.58, 1.15, -0.2);
      if (seed % 2 === 0) addArm(1, mainHeight * 0.68, 0.85, 1.3);
      group.scale.setScalar(scale);
      return group;
    }

    function createRedRockMesa(width, height, depth) {
      var g = new THREE.Group();
      var sandstone = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.88, metalness: 0.04, flatShading: true });
      var strata = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.82, metalness: 0.05, flatShading: true });
      var base = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.62, width, height * 0.45, 9), sandstone); base.position.y = height * 0.22; g.add(base);
      var mid = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.48, width * 0.60, height * 0.35, 8), strata); mid.position.y = height * 0.58; mid.rotation.y = 0.4; g.add(mid);
      var cap = new THREE.Mesh(new THREE.CylinderGeometry(width * 0.42, width * 0.46, height * 0.25, 7), sandstone); cap.position.y = height * 0.86; cap.rotation.y = 0.9; g.add(cap);
      g.scale.z = depth / width;
      return g;
    }

    function buildFloorAndScenery() {
      var desert = new THREE.Mesh(new THREE.PlaneGeometry(320, 320), new THREE.MeshStandardMaterial({ map: createArizonaSandTexture(), roughness: 0.92, metalness: 0.04 }));
      desert.rotation.x = -Math.PI / 2; desert.position.y = -0.02; desert.receiveShadow = true; scene.add(desert);

      var road = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 180), new THREE.MeshStandardMaterial({ map: createDesertHighwayTexture(), roughness: 0.78, metalness: 0.08 }));
      road.rotation.x = -Math.PI / 2; road.position.y = 0.005; road.receiveShadow = true; scene.add(road);

      var sc = canvas2d(512, 512), sctx = sc.getContext('2d');
      var sg = sctx.createRadialGradient(256, 256, 40, 256, 256, 250);
      sg.addColorStop(0, 'rgba(0,0,0,0.88)'); sg.addColorStop(0.65, 'rgba(0,0,0,0.48)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = sg; sctx.fillRect(0, 0, 512, 512);
      var contact = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 13.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
      contact.rotation.x = -Math.PI / 2; contact.position.y = 0.018; scene.add(contact);

      var dashGeo = new THREE.PlaneGeometry(0.14, 2.6);
      var dashMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 });
      for (var i = -10; i <= 10; i++) {
        var dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2; dash.position.set(-2.15, 0.015, i * 6.0);
        scene.add(dash); roadStreaks.push(dash);
      }

      [
        { x: -68, z: -85, w: 26, h: 24, d: 20, ry: 0.3 }, { x: -24, z: -105, w: 34, h: 30, d: 24, ry: 1.1 },
        { x: 38, z: -95, w: 28, h: 26, d: 22, ry: 2.2 }, { x: 85, z: -70, w: 32, h: 22, d: 26, ry: 0.7 },
        { x: -85, z: -20, w: 24, h: 20, d: 28, ry: 1.8 }, { x: 92, z: 15, w: 28, h: 19, d: 22, ry: 2.5 },
        { x: -75, z: 65, w: 30, h: 22, d: 24, ry: 0.4 }, { x: 65, z: 85, w: 25, h: 21, d: 20, ry: 1.5 }
      ].forEach(function (m) {
        var mesa = createRedRockMesa(m.w, m.h, m.d); mesa.position.set(m.x, -0.2, m.z); mesa.rotation.y = m.ry; scene.add(mesa);
      });

      var rockMat = new THREE.MeshStandardMaterial({ color: 0x8f3921, roughness: 0.88, metalness: 0.04, flatShading: true });
      var scrubMat = new THREE.MeshStandardMaterial({ color: 0x4d6b3c, roughness: 0.85, flatShading: true });
      [
        { x: -7.5, z: -48, type: 's', scale: 1.1, seed: 1 }, { x: 8.2, z: -42, type: 'b', scale: 1.4, seed: 2 },
        { x: -12.5, z: -34, type: 's', scale: 1.35, seed: 3 }, { x: 7.2, z: -26, type: 's', scale: 0.95, seed: 4 },
        { x: -6.8, z: -18, type: 'b', scale: 1.1, seed: 5 }, { x: 13.5, z: -12, type: 's', scale: 1.25, seed: 6 },
        { x: -9.4, z: -5, type: 's', scale: 1.05, seed: 7 }, { x: 6.8, z: 4, type: 'b', scale: 0.9, seed: 8 },
        { x: -14.0, z: 11, type: 's', scale: 1.4, seed: 9 }, { x: 9.2, z: 18, type: 's', scale: 1.15, seed: 10 },
        { x: -7.2, z: 26, type: 'b', scale: 1.3, seed: 11 }, { x: 11.8, z: 35, type: 's', scale: 1.0, seed: 12 },
        { x: -10.5, z: 44, type: 's', scale: 1.2, seed: 13 }, { x: 7.8, z: 52, type: 'b', scale: 1.2, seed: 14 }
      ].forEach(function (item, idx) {
        var prop = new THREE.Group();
        if (item.type === 's') {
          var sag = createSaguaroCactus(item.scale, item.seed); sag.rotation.y = idx * 1.1; prop.add(sag);
          var br = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 1), rockMat);
          br.scale.set(1.4, 0.65, 1.1); br.position.set(0.55, 0.18, 0.35); br.castShadow = true; prop.add(br);
        } else {
          var mb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85 * item.scale, 1), rockMat);
          mb.scale.set(1.5, 0.72, 1.2); mb.position.y = 0.35 * item.scale; mb.rotation.set(0.2, idx, 0.1); mb.castShadow = true; mb.receiveShadow = true; prop.add(mb);
          var sb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.48 * item.scale, 1), rockMat);
          sb.scale.set(1.2, 0.6, 1.1); sb.position.set(0.75 * item.scale, 0.2, 0.45); sb.castShadow = true; prop.add(sb);
          var scrub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38 * item.scale, 1), scrubMat);
          scrub.scale.set(1.3, 0.65, 1.3); scrub.position.set(-0.55, 0.18, 0.5); prop.add(scrub);
        }
        prop.position.set(item.x, 0, item.z); scene.add(prop); desertSceneryItems.push(prop);
      });
    }

    // ---------------------------------------------------------------- the coach
    function rbox(w, h, d, seg, r) { return new RoundedBoxGeometry(w, h, d, seg, r); }

    function buildMotorcoach() {
      coachRoot = new THREE.Group(); scene.add(coachRoot);
      chassisGroup = new THREE.Group(); coachRoot.add(chassisGroup);

      mainCoachBodyMat = new THREE.MeshPhysicalMaterial({ map: createMasterworkLiveryTexture('obsidian'), metalness: 0.72, roughness: 0.16, clearcoat: 1.0, clearcoatRoughness: 0.05, envMapIntensity: 1.45 });
      var trim = new THREE.MeshPhysicalMaterial({ color: 0x0b0d12, metalness: 0.8, roughness: 0.18, clearcoat: 1.0, clearcoatRoughness: 0.06 });
      var chrome = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.05, envMapIntensity: 2.0 });
      var darkChrome = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.92, roughness: 0.15 });
      var glass = new THREE.MeshPhysicalMaterial({ color: 0x040609, metalness: 0.15, roughness: 0.04, transmission: phone ? 0 : 0.35, transparent: true, opacity: 0.90, clearcoat: 1.0, reflectivity: 1.0, envMapIntensity: 1.8 });
      var led = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xe0f2fe, emissiveIntensity: 4.5 });
      var amber = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 3.2 });
      var ruby = new THREE.MeshStandardMaterial({ color: 0xff1111, emissive: 0xef4444, emissiveIntensity: 3.8 });

      // shell and nose
      var shell = new THREE.Mesh(rbox(2.58, 2.26, 9.4, 8, 0.14), mainCoachBodyMat);
      shell.position.set(0, 1.82, -0.15); shell.castShadow = true; shell.receiveShadow = true; chassisGroup.add(shell);
      var nose = new THREE.Mesh(rbox(2.54, 2.15, 1.15, 8, 0.24), mainCoachBodyMat);
      nose.position.set(0, 1.78, 4.45); nose.rotation.x = 0.11; nose.castShadow = true; chassisGroup.add(nose);
      var bumper = new THREE.Mesh(rbox(2.60, 0.48, 0.72, 6, 0.12), trim); bumper.position.set(0, 0.68, 4.78); chassisGroup.add(bumper);
      for (var i = 0; i < 3; i++) { var bar = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.025, 0.05), chrome); bar.position.set(0, 0.56 + i * 0.06, 5.14); chassisGroup.add(bar); }

      // windshield and wipers
      var frit = new THREE.Mesh(rbox(2.38, 1.18, 0.12, 6, 0.08), trim); frit.position.set(0, 2.22, 4.91); frit.rotation.x = 0.14; chassisGroup.add(frit);
      var shield = new THREE.Mesh(rbox(2.26, 1.06, 0.14, 6, 0.06), glass); shield.position.set(0, 2.22, 4.92); shield.rotation.x = 0.14; chassisGroup.add(shield);
      [-0.55, 0.55].forEach(function (x) {
        var wg = new THREE.Group(); wg.position.set(x, 1.68, 5.02);
        var arm = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.52, 0.03), trim); arm.position.set(0.12, 0.22, 0); arm.rotation.z = -0.45;
        var blade = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.025, 0.03), trim); blade.position.set(0.22, 0.42, 0.01); blade.rotation.z = -0.08;
        wg.add(arm, blade); chassisGroup.add(wg);
      });

      // headlights
      [-0.92, 0.92].forEach(function (xs) {
        var housing = new THREE.Mesh(rbox(0.58, 0.24, 0.18, 4, 0.05), darkChrome); housing.position.set(xs, 1.14, 4.98); chassisGroup.add(housing);
        [-0.12, 0.12].forEach(function (o) {
          var lens = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.08, 24), led); lens.rotation.x = Math.PI / 2; lens.position.set(xs + o, 1.14, 5.05); chassisGroup.add(lens);
        });
        var drl = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.03, 0.06), led); drl.position.set(xs, 1.03, 5.06); chassisGroup.add(drl);
        var fog = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 16), led); fog.rotation.x = Math.PI / 2; fog.position.set(xs * 1.04, 0.64, 5.12); chassisGroup.add(fog);
      });
      [-0.8, -0.4, 0, 0.4, 0.8].forEach(function (x) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.035, 0.06), amber); m.position.set(x, 2.84, 4.78); chassisGroup.add(m); });

      // mirrors
      [-1, 1].forEach(function (dir) {
        var curve = new THREE.CatmullRomCurve3([new THREE.Vector3(dir * 1.18, 2.68, 4.75), new THREE.Vector3(dir * 1.48, 2.62, 5.18), new THREE.Vector3(dir * 1.54, 2.15, 5.22)]);
        chassisGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.032, 12, false), chrome));
        var head = new THREE.Mesh(rbox(0.16, 0.56, 0.22, 5, 0.05), chrome); head.position.set(dir * 1.54, 2.04, 5.22); chassisGroup.add(head);
        var turn = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.04, 0.14), amber); turn.position.set(dir * 1.55, 2.04, 5.26); chassisGroup.add(turn);
      });

      // rear
      var rearCap = new THREE.Mesh(rbox(2.56, 2.22, 0.45, 6, 0.12), mainCoachBodyMat); rearCap.position.set(0, 1.82, -4.82); chassisGroup.add(rearCap);
      var engineDoor = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 1.05), new THREE.MeshStandardMaterial({ map: createRearEngineLouversTexture(), roughness: 0.35, metalness: 0.6 }));
      engineDoor.rotation.y = Math.PI; engineDoor.position.set(0, 1.28, -5.06); chassisGroup.add(engineDoor);
      [-1.12, 1.12].forEach(function (x) { var tb = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.95, 0.08), ruby); tb.position.set(x, 1.62, -5.05); chassisGroup.add(tb); });
      var brake = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.05, 0.08), ruby); brake.position.set(0, 2.86, -5.04); chassisGroup.add(brake);
      var exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 24), chrome); exhaust.rotation.x = Math.PI / 2; exhaust.position.set(-0.98, 0.62, -4.98); chassisGroup.add(exhaust);

      // slide-outs
      slideLeftFront = new THREE.Group(); chassisGroup.add(slideLeftFront);
      var a = new THREE.Mesh(rbox(0.75, 1.38, 3.85, 6, 0.06), mainCoachBodyMat); a.position.set(-0.96, 2.08, 1.45); a.castShadow = true; slideLeftFront.add(a);
      var ag = new THREE.Mesh(rbox(0.06, 0.78, 3.45, 4, 0.03), glass); ag.position.set(-1.32, 2.18, 1.45); slideLeftFront.add(ag);
      slideLeftRear = new THREE.Group(); chassisGroup.add(slideLeftRear);
      var b = new THREE.Mesh(rbox(0.65, 1.28, 2.45, 6, 0.06), mainCoachBodyMat); b.position.set(-1.01, 2.08, -2.55); b.castShadow = true; slideLeftRear.add(b);
      var bg = new THREE.Mesh(rbox(0.06, 0.68, 1.95, 4, 0.03), glass); bg.position.set(-1.32, 2.16, -2.55); slideLeftRear.add(bg);
      slideRightPatio = new THREE.Group(); chassisGroup.add(slideRightPatio);
      var c = new THREE.Mesh(rbox(0.62, 1.35, 3.1, 6, 0.06), mainCoachBodyMat); c.position.set(1.02, 2.08, -0.45); c.castShadow = true; slideRightPatio.add(c);
      var cg = new THREE.Mesh(rbox(0.06, 0.78, 2.75, 4, 0.03), glass); cg.position.set(1.32, 2.18, -0.45); slideRightPatio.add(cg);

      var door = new THREE.Mesh(rbox(0.08, 1.96, 0.86, 4, 0.04), trim); door.position.set(1.27, 1.72, 2.35); chassisGroup.add(door);
      var doorGlass = new THREE.Mesh(rbox(0.10, 0.88, 0.62, 4, 0.03), glass); doorGlass.position.set(1.27, 2.16, 2.35); chassisGroup.add(doorGlass);
      var rw = new THREE.Mesh(rbox(0.08, 0.78, 1.85, 4, 0.03), glass); rw.position.set(1.27, 2.18, -3.15); chassisGroup.add(rw);

      // basement bays
      var recess = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.56, 3.4), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7 })); recess.position.set(0, 1.02, 0.2); chassisGroup.add(recess);
      var strip = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.04, 3.2), new THREE.MeshBasicMaterial({ color: 0xfef08a })); strip.position.set(0, 1.26, 0.2); chassisGroup.add(strip);
      [-0.85, 0.2, 1.25].forEach(function (z) {
        var dl = new THREE.Group(); dl.position.set(-1.28, 1.02, z);
        var pl = new THREE.Mesh(rbox(0.06, 0.58, 0.98, 4, 0.03), trim);
        var ll = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.16), chrome); ll.position.set(-0.02, 0.15, 0);
        dl.add(pl, ll); chassisGroup.add(dl); bayDoorsLeft.push(dl);
        var dr = new THREE.Group(); dr.position.set(1.28, 1.02, z);
        var pr = new THREE.Mesh(rbox(0.06, 0.58, 0.98, 4, 0.03), trim);
        var lr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.16), chrome); lr.position.set(0.02, 0.15, 0);
        dr.add(pr, lr); chassisGroup.add(dr); bayDoorsRight.push(dr);
      });

      // awning
      var cassette = new THREE.Mesh(rbox(0.16, 0.18, 5.4, 4, 0.04), trim); cassette.position.set(1.28, 2.86, 0.1); chassisGroup.add(cassette);
      awningArmGroup = new THREE.Group(); awningArmGroup.position.set(1.32, 2.85, 0.1); chassisGroup.add(awningArmGroup);
      var canopyGeo = new THREE.BoxGeometry(2.15, 0.035, 5.25); canopyGeo.translate(1.075, 0, 0);
      var canopy = new THREE.Mesh(canopyGeo, new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65, metalness: 0.15 }));
      canopy.rotation.z = -0.09; canopy.castShadow = true; awningArmGroup.add(canopy);
      var railGeo = new THREE.BoxGeometry(0.07, 0.06, 5.26); railGeo.translate(2.14, -0.19, 0); awningArmGroup.add(new THREE.Mesh(railGeo, chrome));
      var ledGeo = new THREE.BoxGeometry(0.05, 0.025, 5.1); ledGeo.translate(2.08, -0.21, 0); awningArmGroup.add(new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0xfde047 })));
      awningArmGroup.scale.x = 0.01;
      patioWarmLight = new THREE.PointLight(0xfbbf24, 0, 8.5); patioWarmLight.position.set(2.6, 2.1, 0.1); chassisGroup.add(patioWarmLight);
      underbodyGlowLight = new THREE.PointLight(0xf59e0b, 0, 6); underbodyGlowLight.position.set(0, 0.35, 0.2); chassisGroup.add(underbodyGlowLight);

      // interior
      var interior = new THREE.Group(); chassisGroup.add(interior);
      var floor = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.06, 8.8), new THREE.MeshStandardMaterial({ map: createCalacattaMarbleTexture(), roughness: 0.15, metalness: 0.1 }));
      floor.position.set(0, 1.42, -0.1); interior.add(floor);
      var leather = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.38 });
      var walnut = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.32, metalness: 0.1 });
      var quartz = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.15 });

      function chair() {
        var g = new THREE.Group();
        var ped = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.22, 16), chrome); ped.position.y = 0.11;
        var cush = new THREE.Mesh(rbox(0.56, 0.14, 0.56, 4, 0.04), leather); cush.position.y = 0.26;
        var back = new THREE.Mesh(rbox(0.54, 0.68, 0.14, 4, 0.04), leather); back.position.set(0, 0.62, -0.22); back.rotation.x = -0.12;
        g.add(ped, cush, back); return g;
      }
      captainChairLeft = chair(); captainChairLeft.position.set(-0.62, 1.45, 3.55); interior.add(captainChairLeft);
      captainChairRight = chair(); captainChairRight.position.set(0.62, 1.45, 3.55); interior.add(captainChairRight);
      var cockpit = new THREE.Mesh(rbox(2.28, 0.48, 0.68, 4, 0.06), trim); cockpit.position.set(0, 1.72, 4.32); interior.add(cockpit);
      var sofa = new THREE.Mesh(rbox(0.68, 0.52, 2.35, 4, 0.06), leather); sofa.position.set(-0.88, 1.72, 1.85); slideLeftFront.add(sofa);
      var island = new THREE.Mesh(rbox(0.76, 0.68, 1.55, 4, 0.04), walnut); island.position.set(-0.48, 1.78, -0.05); interior.add(island);
      var qtop = new THREE.Mesh(rbox(0.84, 0.06, 1.62, 4, 0.02), quartz); qtop.position.set(-0.48, 2.15, -0.05); interior.add(qtop);
      var bedBase = new THREE.Mesh(rbox(1.88, 0.36, 1.95, 4, 0.05), walnut); bedBase.position.set(-0.18, 1.64, -2.55); slideLeftRear.add(bedBase);
      var mattress = new THREE.Mesh(rbox(1.78, 0.24, 1.86, 4, 0.06), leather); mattress.position.set(-0.14, 1.90, -2.55); slideLeftRear.add(mattress);
      [-2.6, 0.0, 2.4].forEach(function (z) { var pl = new THREE.PointLight(0xffedd5, 0.8, 5.5); pl.position.set(0, 2.65, z); interior.add(pl); });

      // roof assembly
      roofAssemblyGroup = new THREE.Group(); chassisGroup.add(roofAssemblyGroup);
      roofShellMat = new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, metalness: 0.3, roughness: 0.2, transparent: true, opacity: 1.0, clearcoat: 0.8 });
      var roofCap = new THREE.Mesh(rbox(2.50, 0.12, 9.2, 6, 0.05), roofShellMat); roofCap.position.set(0, 2.96, -0.1); roofAssemblyGroup.add(roofCap);
      [-2.6, 0.0, 2.5].forEach(function (z) { var ac = new THREE.Mesh(rbox(0.96, 0.22, 1.18, 6, 0.08), roofShellMat); ac.position.set(0, 3.12, z); roofAssemblyGroup.add(ac); });
      var solarMat = new THREE.MeshStandardMaterial({ map: createSolarGridTexture(), metalness: 0.85, roughness: 0.15 });
      [-0.68, 0.68].forEach(function (x) { [-1.3, 1.25].forEach(function (z) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.03, 1.15), solarMat); p.position.set(x, 3.04, z); roofAssemblyGroup.add(p); }); });
      [-0.75, -0.58].forEach(function (x) { var h = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.02, 0.62, 16), chrome); h.rotation.x = Math.PI / 2; h.position.set(x, 3.07, 4.1); roofAssemblyGroup.add(h); });
      var dome = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), roofShellMat); dome.position.set(0.55, 3.02, 3.65); roofAssemblyGroup.add(dome);

      // wheels
      var rubber = new THREE.MeshStandardMaterial({ color: 0x121316, roughness: 0.78, metalness: 0.08 });
      var caliperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.6, roughness: 0.25 });
      [
        { x: -1.18, z: 2.95, dual: false }, { x: 1.18, z: 2.95, dual: false },
        { x: -1.18, z: -1.95, dual: true }, { x: 1.18, z: -1.95, dual: true },
        { x: -1.18, z: -3.12, dual: false }, { x: 1.18, z: -3.12, dual: false }
      ].forEach(function (cfg) {
        var wg = new THREE.Group(); wg.position.set(cfg.x, 0.54, cfg.z);
        var spin = new THREE.Group(); wg.add(spin);
        var tw = cfg.dual ? 0.44 : 0.34;
        var tire = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.54, tw, 36), rubber); tire.rotation.z = Math.PI / 2; tire.castShadow = true; spin.add(tire);
        var sign = Math.sign(cfg.x);
        var bulge = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.13, 16, 36), rubber); bulge.rotation.y = Math.PI / 2; bulge.position.x = sign * (tw * 0.32); spin.add(bulge);
        var rim = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, tw + 0.03, 32), chrome); rim.rotation.z = Math.PI / 2; spin.add(rim);
        var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, tw + 0.07, 20), chrome); hub.rotation.z = Math.PI / 2; spin.add(hub);
        for (var n = 0; n < 10; n++) {
          var ang = (n / 10) * Math.PI * 2;
          var lug = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, tw + 0.06, 8), chrome); lug.rotation.z = Math.PI / 2; lug.position.set(0, Math.cos(ang) * 0.18, Math.sin(ang) * 0.18); spin.add(lug);
          var vent = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, tw + 0.04, 12), trim); vent.rotation.z = Math.PI / 2; vent.position.set(0, Math.cos(ang + 0.31) * 0.255, Math.sin(ang + 0.31) * 0.255); spin.add(vent);
        }
        var caliper = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.12), caliperMat); caliper.position.set(-sign * 0.06, 0.14, 0.18); wg.add(caliper);
        coachRoot.add(wg); wheelAssemblies.push(spin);
      });
    }

    // ---------------------------------------------------------------- scroll choreography
    function timeline() {
      var tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 72px', end: 'bottom bottom', scrub: 1.2 } });
      tl.to(state, { camX: -7.8, camY: 1.55, camZ: -6.4, targetX: 0, targetY: 1.35, targetZ: -1.8, coachRotY: -0.18, wheelSpeed: 1.4, duration: 2.8, ease: 'power2.inOut' })
        .to(state, { camX: 8.6, camY: 2.75, camZ: 6.8, targetX: 0.2, targetY: 1.55, targetZ: 0.2, coachRotY: -0.45, wheelSpeed: 0, suspensionDrop: 1, slideProgress: 1, bayDoorProgress: 1, awningProgress: 1, duration: 3.4, ease: 'power2.inOut' })
        .to(state, { camX: 5.4, camY: 9.2, camZ: 4.2, targetX: 0, targetY: 1.6, targetZ: -0.2, coachRotY: -0.22, roofLift: 1, roofOpacity: 0.12, chairSwivel: 1, duration: 3.2, ease: 'power2.inOut' })
        .to(state, { camX: 9.2, camY: 3.1, camZ: 8.4, targetX: 0, targetY: 1.55, targetZ: 0, coachRotY: -0.52, roofLift: 0.35, roofOpacity: 0.38, duration: 2.8, ease: 'power2.out' });
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      chassisGroup.position.y = -state.suspensionDrop * 0.14;
      slideLeftFront.position.x = -state.slideProgress * 0.58;
      slideLeftRear.position.x = -state.slideProgress * 0.52;
      slideRightPatio.position.x = state.slideProgress * 0.54;
      bayDoorsLeft.forEach(function (d) { d.position.x = -1.28 - state.bayDoorProgress * 0.22; d.position.y = 1.02 + state.bayDoorProgress * 0.38; });
      bayDoorsRight.forEach(function (d) { d.position.x = 1.28 + state.bayDoorProgress * 0.22; d.position.y = 1.02 + state.bayDoorProgress * 0.38; });
      awningArmGroup.scale.x = Math.max(0.01, state.awningProgress);
      patioWarmLight.intensity = state.awningProgress * 3.2;
      underbodyGlowLight.intensity = state.bayDoorProgress * 2.2;
      roofAssemblyGroup.position.y = state.roofLift * 1.35;
      roofShellMat.opacity = state.roofOpacity;
      captainChairLeft.rotation.y = state.chairSwivel * Math.PI * 0.85;
      captainChairRight.rotation.y = -state.chairSwivel * Math.PI * 0.85;
      if (state.wheelSpeed > 0.01) {
        var spin = 0.11 * state.wheelSpeed;
        wheelAssemblies.forEach(function (w) { w.rotation.x += spin; });
        roadStreaks.forEach(function (s) { s.position.z -= 0.28 * state.wheelSpeed; if (s.position.z < -60) s.position.z += 120; });
        desertSceneryItems.forEach(function (it) { it.position.z -= 0.28 * state.wheelSpeed; if (it.position.z < -55) it.position.z += 110; });
      }
      if (!isOrbitMode) {
        camera.position.set(state.camX, state.camY, state.camZ);
        camera.lookAt(state.targetX, state.targetY, state.targetZ);
        coachRoot.rotation.y = state.coachRotY;
      } else {
        controls.update();
      }
      renderer.render(scene, camera);
    }

    function resize() {
      var s = size();
      camera.aspect = s.w / s.h;
      camera.fov = camera.aspect < 0.7 ? 72 : camera.aspect < 0.95 ? 52 : 36;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h);
    }

    // ---------------------------------------------------------------- controls
    function setLivery(key, btn) {
      if (!liveries[key]) return;
      createMasterworkLiveryTexture(key);
      [].forEach.call(root.querySelectorAll('.story-swatch'), function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    }
    function orbit(on) {
      isOrbitMode = on;
      controls.enabled = on;
      stage.classList.toggle('free', on);
      if (on) { controls.target.set(0, 1.5, 0); controls.update(); }
      var t = document.getElementById('story-free');
      if (t) { t.setAttribute('aria-pressed', on ? 'true' : 'false'); t.textContent = on ? 'Leave 360 view' : 'Rotate 360 degrees'; }
    }

    // ---------------------------------------------------------------- init
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9e3d25);
    scene.fog = new THREE.FogExp2(0xb84a2c, 0.011);
    var s0 = size();
    camera = new THREE.PerspectiveCamera(36, s0.w / s0.h, 0.1, 240);
    var dpr = window.devicePixelRatio || 1;
    renderer = new THREE.WebGLRenderer({ antialias: dpr < 2, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(dpr, phone ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    var skyTex = createArizonaSkyTexture();
    var pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    scene.environment = pmrem.fromEquirectangular(skyTex).texture;
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(180, 48, 32), new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false })));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; controls.minDistance = 4.2; controls.maxDistance = 24;
    controls.enabled = false;

    setupLights(); buildFloorAndScenery(); buildMotorcoach(); resize();

    if (reduced) {
      state.wheelSpeed = 0;
      state.camX = 9.2; state.camY = 3.1; state.camZ = 8.4; state.targetY = 1.55; state.targetZ = 0; state.coachRotY = -0.52;
    } else {
      timeline();
    }

    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(stage);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host); else addEventListener('resize', resize);
    root.classList.add('story--live');

    [].forEach.call(root.querySelectorAll('.story-swatch'), function (b) { b.addEventListener('click', function () { setLivery(b.dataset.paint, b); }); });
    document.getElementById('story-slide').addEventListener('click', function () {
      var t = state.slideProgress > 0.5 ? 0 : 1;
      gsap.to(state, { slideProgress: t, suspensionDrop: t, duration: 1.1, ease: 'power2.inOut' });
    });
    document.getElementById('story-awning').addEventListener('click', function () {
      var t = state.awningProgress > 0.5 ? 0 : 1;
      gsap.to(state, { awningProgress: t, bayDoorProgress: t, duration: 1.1, ease: 'power2.inOut' });
    });
    document.getElementById('story-xray').addEventListener('click', function () {
      var open = state.roofOpacity < 0.5;
      gsap.to(state, { roofLift: open ? 0 : 1, roofOpacity: open ? 1.0 : 0.12, chairSwivel: open ? 0 : 1, duration: 1.1, ease: 'power2.inOut' });
    });
    document.getElementById('story-free').addEventListener('click', function () { orbit(!isOrbitMode); });
    document.getElementById('story-exit').addEventListener('click', function () { orbit(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOrbitMode) orbit(false); });

    frame();
  }
})();
