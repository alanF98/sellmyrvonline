/* Scrollytelling: an illustrative 3D motorcoach driven by scroll (Three.js + GSAP ScrollTrigger).
   Libraries load only when the section is near the viewport. Without WebGL, with scripting off or with
   reduced motion, the chapters read as plain text (and a still model when WebGL works). */
(function () {
  var root = document.getElementById('story');
  if (!root) return;
  var stage = document.getElementById('story-stage');
  var host = document.getElementById('story-canvas');
  var started = false;

  var LIBS = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
  ];

  function load(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = src; s.async = false; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  function webglOk() {
    try { var c = document.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; }
  }
  function off() { root.classList.add('story--off'); }

  function start() {
    if (started) return;
    started = true;
    if (!webglOk()) return off();
    LIBS.reduce(function (p, src) { return p.then(function () { return load(src); }); }, Promise.resolve())
      .then(init).catch(off);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) start(); }, { rootMargin: '900px 0px' }).observe(root);
  } else {
    start();
  }

  function init() {
    gsap.registerPlugin(ScrollTrigger);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) root.classList.add('story--static');

    var INK = 0x1c110a;
    var scene, camera, renderer;
    var rvGroup, slideOutGroup, awningGroup, roofGroup, interiorGroup;
    var wheels = [], roadLines = [], bodyMaterials = [], roofMaterial, patioLight, interiorLight1, interiorLight2;
    var visible = true;

    var rvState = {
      camX: 7.5, camY: 2.6, camZ: 8.8, lookX: 0, lookY: 0.7, lookZ: 0, rvRotY: -0.35,
      slideOutProgress: 0, awningProgress: 0, roofOpacity: 1, driveSpeed: 1.0, patioLightIntensity: 0
    };
    var isFreeLook = false, isDragging = false, prev = { x: 0, y: 0 };
    var spherical = { theta: 0.75, phi: 1.15, radius: 11.5 };

    var paints = {
      silver:   { main: 0xd4d8e0, lower: 0x1e222a },
      obsidian: { main: 0x181a20, lower: 0x090a0d },
      desert:   { main: 0xd6cbb5, lower: 0x3b352c },
      midnight: { main: 0x1e3a5f, lower: 0x0b1528 }
    };

    function size() { return { w: Math.max(1, host.clientWidth), h: Math.max(1, host.clientHeight) }; }

    function lights() {
      scene.add(new THREE.AmbientLight(0xdbeafe, 0.55));
      var main = new THREE.DirectionalLight(0xffffff, 1.8);
      main.position.set(10, 16, 10);
      main.castShadow = true;
      main.shadow.mapSize.width = 2048; main.shadow.mapSize.height = 2048;
      main.shadow.camera.near = 2; main.shadow.camera.far = 35;
      var d = 9;
      main.shadow.camera.left = -d; main.shadow.camera.right = d; main.shadow.camera.top = d; main.shadow.camera.bottom = -d;
      main.shadow.bias = -0.0005;
      scene.add(main);
      var rim = new THREE.DirectionalLight(0x60a5fa, 1.1); rim.position.set(-12, 6, -10); scene.add(rim);
      var fill = new THREE.DirectionalLight(0xfbbf24, 0.5); fill.position.set(12, 3, -6); scene.add(fill);
    }

    function environment() {
      var floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ color: 0x120904, roughness: 0.25, metalness: 0.4 }));
      floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
      var grid = new THREE.GridHelper(60, 60, 0x3a2a1e, 0x20160e); grid.position.y = 0.01; scene.add(grid);
      var stripeGeo = new THREE.PlaneGeometry(0.16, 2.4);
      var stripeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45 });
      for (var i = -6; i <= 6; i++) {
        [-2.3, 2.3].forEach(function (x) {
          var s = new THREE.Mesh(stripeGeo, stripeMat);
          s.rotation.x = -Math.PI / 2; s.position.set(x, 0.02, i * 5);
          scene.add(s); roadLines.push(s);
        });
      }
    }

    function box(w, h, d, mat, x, y, z, parent) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      (parent || rvGroup).add(m);
      return m;
    }

    function buildRV() {
      rvGroup = new THREE.Group(); scene.add(rvGroup);

      var mainPaint = new THREE.MeshPhysicalMaterial({ color: paints.silver.main, metalness: 0.55, roughness: 0.22, clearcoat: 0.9, clearcoatRoughness: 0.1 });
      var lowerPaint = new THREE.MeshPhysicalMaterial({ color: paints.silver.lower, metalness: 0.6, roughness: 0.28, clearcoat: 0.8 });
      bodyMaterials.push(mainPaint, lowerPaint);
      var stripe = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.2, emissive: 0xf59e0b, emissiveIntensity: 0.15 });
      var glass = new THREE.MeshPhysicalMaterial({ color: 0x05070a, metalness: 0.1, roughness: 0.08, transmission: 0.4, transparent: true, opacity: 0.88, reflectivity: 1.0 });
      var chrome = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.92, roughness: 0.12 });

      // chassis and bays
      var lower = box(2.55, 0.85, 8.8, lowerPaint, 0, 0.92, 0); lower.castShadow = true; lower.receiveShadow = true;
      box(2.59, 0.08, 8.84, stripe, 0, 1.36, 0);
      for (var z = -2.4; z <= 2.41; z += 1.2) box(2.58, 0.52, 1.08, lowerPaint, 0, 0.82, z);

      // upper shell and nose
      var upper = box(2.52, 1.65, 8.5, mainPaint, 0, 2.15, -0.1); upper.castShadow = true; upper.receiveShadow = true;
      var nose = box(2.5, 1.55, 0.9, mainPaint, 0, 2.08, 4.18); nose.rotation.x = 0.16; nose.castShadow = true;
      box(2.6, 0.42, 0.55, lowerPaint, 0, 0.68, 4.42);
      var shield = box(2.36, 1.05, 0.12, glass, 0, 2.34, 4.56); shield.rotation.x = 0.16;
      [-1.38, 1.38].forEach(function (x) {
        box(0.28, 0.06, 0.35, chrome, x, 2.55, 4.45);
        box(0.12, 0.45, 0.18, chrome, x * 1.06, 2.35, 4.55);
      });
      box(0.05, 0.85, 2.4, glass, 1.25, 2.28, 2.1);
      box(0.05, 0.85, 2.6, glass, 1.25, 2.28, -1.8);
      box(0.06, 1.92, 0.82, lowerPaint, 1.25, 1.68, 0.35);
      box(0.08, 0.78, 0.56, glass, 1.25, 2.12, 0.35);

      // lights
      var head = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xe0f2fe, emissiveIntensity: 3.5 });
      [-0.88, 0.88].forEach(function (x) { box(0.58, 0.12, 0.1, head, x, 1.18, 4.66); });
      box(1.1, 0.05, 0.1, head, 0, 1.18, 4.65);
      var tail = new THREE.MeshStandardMaterial({ color: 0xff1111, emissive: 0xef4444, emissiveIntensity: 2.8 });
      box(2.35, 0.1, 0.1, tail, 0, 1.48, -4.38);
      box(1.6, 0.06, 0.12, tail, 0, 2.92, -4.36);

      // slide-out (left side)
      slideOutGroup = new THREE.Group(); rvGroup.add(slideOutGroup);
      var slide = box(0.75, 1.42, 4.2, mainPaint, -1.02, 2.12, 0.35, slideOutGroup); slide.castShadow = true;
      box(0.06, 0.78, 3.6, glass, -1.39, 2.22, 0.35, slideOutGroup);
      box(0.06, 0.07, 4.18, stripe, -1.39, 1.48, 0.35, slideOutGroup);

      // awning (right side)
      box(0.14, 0.16, 4.8, lowerPaint, 1.29, 2.9, -0.2);
      awningGroup = new THREE.Group(); awningGroup.position.set(1.32, 2.88, -0.2); rvGroup.add(awningGroup);
      var canopyGeo = new THREE.BoxGeometry(1.85, 0.04, 4.65); canopyGeo.translate(0.925, 0, 0);
      var canopy = new THREE.Mesh(canopyGeo, new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.7, metalness: 0.1 }));
      canopy.rotation.z = -0.08; canopy.castShadow = true; awningGroup.add(canopy);
      var ledGeo = new THREE.BoxGeometry(0.08, 0.03, 4.5); ledGeo.translate(1.78, -0.14, 0);
      awningGroup.add(new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
      patioLight = new THREE.PointLight(0xf59e0b, 0, 7); patioLight.position.set(2.3, 2.2, -0.2); rvGroup.add(patioLight);
      awningGroup.scale.x = 0.01;

      // interior (shows through the roof in the x-ray chapter)
      interiorGroup = new THREE.Group(); rvGroup.add(interiorGroup);
      var wood = new THREE.MeshStandardMaterial({ color: 0x452c1e, roughness: 0.4 });
      var cream = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45 });
      var quartz = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.15, metalness: 0.1 });
      var walnut = new THREE.MeshStandardMaterial({ color: 0x291d16, roughness: 0.5 });
      box(2.35, 0.06, 8.1, wood, 0, 1.4, -0.1, interiorGroup);
      [-0.58, 0.58].forEach(function (x) { box(0.55, 0.68, 0.55, cream, x, 1.78, 3.25, interiorGroup); });
      box(2.2, 0.45, 0.65, walnut, 0, 1.72, 3.95, interiorGroup);
      box(0.65, 0.55, 2.1, cream, -0.95, 1.72, 1.4, slideOutGroup);
      box(0.75, 0.62, 1.45, walnut, 0.45, 1.74, 0, interiorGroup);
      box(0.82, 0.06, 1.52, quartz, 0.45, 2.08, 0, interiorGroup);
      box(1.85, 0.38, 1.95, walnut, 0, 1.62, -2.75, interiorGroup);
      box(1.75, 0.22, 1.85, cream, 0, 1.88, -2.75, interiorGroup);
      interiorLight1 = new THREE.PointLight(0xffedd5, 0.9, 5); interiorLight1.position.set(0, 2.65, 1.5); interiorGroup.add(interiorLight1);
      interiorLight2 = new THREE.PointLight(0xfde68a, 0.9, 5); interiorLight2.position.set(0, 2.65, -2.2); interiorGroup.add(interiorLight2);

      // roof, A/C and solar
      roofGroup = new THREE.Group(); rvGroup.add(roofGroup);
      roofMaterial = new THREE.MeshPhysicalMaterial({ color: 0xe2e8f0, metalness: 0.35, roughness: 0.25, transparent: true, opacity: 1.0 });
      box(2.48, 0.14, 8.4, roofMaterial, 0, 3.02, -0.1, roofGroup);
      var ac = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      [1.6, -1.6].forEach(function (z) { box(0.95, 0.24, 1.15, ac, 0, 3.18, z, roofGroup); });
      var solar = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.15 });
      [-0.55, 0.55].forEach(function (x) { for (var z = -0.35; z <= 0.46; z += 0.8) box(0.82, 0.04, 0.68, solar, x, 3.11, z, roofGroup); });

      // six wheels
      var spots = [[-1.22, 2.75], [1.22, 2.75], [-1.22, -1.75], [1.22, -1.75], [-1.22, -2.85], [1.22, -2.85]];
      var tireGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.34, 32); tireGeo.rotateZ(Math.PI / 2);
      var tireMat = new THREE.MeshStandardMaterial({ color: 0x121316, roughness: 0.85 });
      var rimGeo = new THREE.CylinderGeometry(0.33, 0.33, 0.36, 24); rimGeo.rotateZ(Math.PI / 2);
      var spokeGeo = new THREE.BoxGeometry(0.38, 0.06, 0.62);
      spots.forEach(function (p) {
        var holder = new THREE.Group(); holder.position.set(p[0], 0.52, p[1]);
        var tire = new THREE.Mesh(tireGeo, tireMat); tire.castShadow = true; holder.add(tire);
        holder.add(new THREE.Mesh(rimGeo, chrome));
        for (var s = 0; s < 3; s++) { var sp = new THREE.Mesh(spokeGeo, chrome); sp.rotation.x = (s * Math.PI) / 3; holder.add(sp); }
        rvGroup.add(holder); wheels.push(holder);
      });
    }

    function timeline() {
      var tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 72px', end: 'bottom bottom', scrub: 1.2 }
      });
      tl.to(rvState, { camX: 11.2, camY: 2.1, camZ: 0.2, lookX: 0, lookY: 1.6, lookZ: 0, rvRotY: 0, driveSpeed: 0.3, duration: 2.5, ease: 'power2.inOut' })
        .to(rvState, { camX: 7.4, camY: 3.1, camZ: -7.5, lookX: 0.2, lookY: 1.5, lookZ: -0.2, rvRotY: 0.45, driveSpeed: 0, slideOutProgress: 1, awningProgress: 1, patioLightIntensity: 2.4, duration: 3, ease: 'power2.inOut' })
        .to(rvState, { camX: 4.8, camY: 9.2, camZ: 3.8, lookX: 0, lookY: 1.4, lookZ: -0.2, rvRotY: -0.2, roofOpacity: 0.14, duration: 3, ease: 'power2.inOut' })
        .to(rvState, { camX: 8.6, camY: 3.5, camZ: 7.6, lookX: 0, lookY: 1.5, lookZ: 0, rvRotY: -0.55, roofOpacity: 0.45, duration: 2.5, ease: 'power2.out' });
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      slideOutGroup.position.x = -rvState.slideOutProgress * 0.62;
      awningGroup.scale.x = Math.max(0.01, rvState.awningProgress);
      patioLight.intensity = rvState.patioLightIntensity;
      roofMaterial.opacity = rvState.roofOpacity;
      var boost = rvState.roofOpacity < 0.5 ? 2.2 : 0.7;
      interiorLight1.intensity = boost; interiorLight2.intensity = boost;
      if (rvState.driveSpeed > 0.01) {
        var spin = 0.09 * rvState.driveSpeed;
        wheels.forEach(function (w) { w.rotation.x += spin; });
        roadLines.forEach(function (s) { s.position.z -= 0.22 * rvState.driveSpeed; if (s.position.z < -30) s.position.z = 30; });
      }
      if (!isFreeLook) {
        camera.position.set(rvState.camX, rvState.camY, rvState.camZ);
        camera.lookAt(rvState.lookX, rvState.lookY, rvState.lookZ);
        rvGroup.rotation.y = rvState.rvRotY;
      } else {
        var x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
        var y = Math.max(0.6, spherical.radius * Math.cos(spherical.phi));
        var z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
        camera.position.set(x, y, z); camera.lookAt(0, 1.5, 0);
      }
      renderer.render(scene, camera);
    }

    function resize() {
      var s = size();
      camera.aspect = s.w / s.h;
      camera.fov = camera.aspect < 0.7 ? 82 : camera.aspect < 0.95 ? 60 : 40;
      camera.updateProjectionMatrix();
      renderer.setSize(s.w, s.h);
    }

    // controls
    function tweenTo(prop, target, extra) {
      var vars = { duration: 0.9, ease: 'power2.inOut', overwrite: 'auto' };
      vars[prop] = target;
      if (extra) for (var k in extra) vars[k] = extra[k];
      gsap.to(rvState, vars);
    }
    function setPaint(key, btn) {
      var p = paints[key]; if (!p) return;
      [[bodyMaterials[0], p.main], [bodyMaterials[1], p.lower]].forEach(function (pair) {
        gsap.to(pair[0].color, { r: ((pair[1] >> 16) & 255) / 255, g: ((pair[1] >> 8) & 255) / 255, b: (pair[1] & 255) / 255, duration: 0.6 });
      });
      [].forEach.call(root.querySelectorAll('.story-swatch'), function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    }
    function freeLook(on) {
      isFreeLook = on;
      stage.classList.toggle('free', on);
      var t = document.getElementById('story-free');
      if (t) { t.setAttribute('aria-pressed', on ? 'true' : 'false'); t.textContent = on ? 'Leave 360 view' : 'Rotate 360 degrees'; }
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(INK);
    scene.fog = new THREE.FogExp2(INK, 0.032);
    var s0 = size();
    camera = new THREE.PerspectiveCamera(40, s0.w / s0.h, 0.1, 150);
    var dpr = window.devicePixelRatio || 1;
    renderer = new THREE.WebGLRenderer({ antialias: dpr < 2, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(dpr, innerWidth < 700 ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    lights(); environment(); buildRV(); resize();

    if (reduced) {
      rvState.driveSpeed = 0;
      rvState.camX = 8.6; rvState.camY = 3.5; rvState.camZ = 7.6; rvState.lookY = 1.5; rvState.rvRotY = -0.55;
    } else {
      timeline();
    }

    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(stage);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host); else addEventListener('resize', resize);
    root.classList.add('story--live');

    host.addEventListener('pointerdown', function (e) { if (!isFreeLook) return; isDragging = true; prev.x = e.clientX; prev.y = e.clientY; });
    addEventListener('pointermove', function (e) {
      if (!isFreeLook || !isDragging) return;
      spherical.theta -= (e.clientX - prev.x) * 0.007;
      spherical.phi = Math.max(0.25, Math.min(Math.PI / 2 - 0.05, spherical.phi - (e.clientY - prev.y) * 0.006));
      prev.x = e.clientX; prev.y = e.clientY;
    });
    addEventListener('pointerup', function () { isDragging = false; });

    [].forEach.call(root.querySelectorAll('.story-swatch'), function (b) { b.addEventListener('click', function () { setPaint(b.dataset.paint, b); }); });
    document.getElementById('story-slide').addEventListener('click', function () { tweenTo('slideOutProgress', rvState.slideOutProgress > 0.5 ? 0 : 1); });
    document.getElementById('story-awning').addEventListener('click', function () {
      var on = rvState.awningProgress > 0.5 ? 0 : 1;
      tweenTo('awningProgress', on, { patioLightIntensity: on * 2.4 });
    });
    document.getElementById('story-xray').addEventListener('click', function () { tweenTo('roofOpacity', rvState.roofOpacity < 0.5 ? 1 : 0.14); });
    document.getElementById('story-free').addEventListener('click', function () { freeLook(!isFreeLook); });
    document.getElementById('story-exit').addEventListener('click', function () { freeLook(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isFreeLook) freeLook(false); });

    frame();
  }
})();
