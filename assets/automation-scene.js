import * as THREE from './vendor/three.module.min.js';

/**
 * A small, working model of an intake, routing, and delivery machine.
 * run(callback) reports 0 immediately, 1 at 1,500 ms, 2 at 3,000 ms,
 * and 3 at 4,500 ms of visible playback. Reduced motion reports all
 * four steps synchronously and displays the finished state.
 * rotate(delta) takes radians. No frames are scheduled while idle.
 */
export function initAutomationScene(host) {
  if (!host) return null;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  if (!context) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  } catch {
    return null;
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 60);
  camera.position.set(7, 6.4, 10);
  camera.lookAt(0, 0.98, 0);

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'automation-canvas';
  Object.assign(canvas.style, {
    display: 'block', width: '100%', height: '100%', touchAction: 'pan-y', cursor: 'grab',
  });

  const materials = new Set();
  const geometries = new Set();
  const material = (color, roughness = 0.42, metalness = 0.02) => {
    const value = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    materials.add(value);
    return value;
  };
  const color = {
    butter: material('#ead77f', 0.56),
    lavender: material('#d4c7e5', 0.3),
    lilac: material('#afa0c1', 0.43),
    plum: material('#382c3e', 0.38),
    ink: material('#251e2a', 0.64),
    orange: material('#df5438', 0.28),
    paper: material('#fff7df', 0.77),
    cream: material('#eae3cd', 0.38),
    brass: material('#b49a58', 0.4, 0.46),
    steel: material('#a19b9c', 0.32, 0.55),
  };

  const model = new THREE.Group();
  model.rotation.y = -0.12;
  scene.add(model);
  const register = geometry => {
    geometries.add(geometry);
    return geometry;
  };
  const mesh = (geometry, surface, parent = model) => {
    const item = new THREE.Mesh(register(geometry), surface);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  };

  // A rounded face plus a small bevel gives the cabinets a ceramic edge.
  function roundedGeometry(width, height, depth, radius = 0.09) {
    const bevel = Math.min(radius * 0.32, depth * 0.22, 0.045);
    const w = width / 2 - bevel;
    const h = height / 2 - bevel;
    const r = Math.min(radius, w, h);
    const outline = new THREE.Shape();
    outline.moveTo(-w + r, -h);
    outline.lineTo(w - r, -h);
    outline.quadraticCurveTo(w, -h, w, -h + r);
    outline.lineTo(w, h - r);
    outline.quadraticCurveTo(w, h, w - r, h);
    outline.lineTo(-w + r, h);
    outline.quadraticCurveTo(-w, h, -w, h - r);
    outline.lineTo(-w, -h + r);
    outline.quadraticCurveTo(-w, -h, -w + r, -h);
    const geometry = new THREE.ExtrudeGeometry(outline, {
      depth: Math.max(0.002, depth - bevel * 2),
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 5,
    });
    geometry.translate(0, 0, -depth / 2 + bevel);
    return geometry;
  }

  function block(w, h, d, surface, x, y, z, r = 0.08, parent = model) {
    const item = mesh(roundedGeometry(w, h, d, r), surface, parent);
    item.position.set(x, y, z);
    return item;
  }

  function cylinder(radius, length, surface, x, y, z, axis = 'y', parent = model) {
    const item = mesh(new THREE.CylinderGeometry(radius, radius, length, 32), surface, parent);
    item.position.set(x, y, z);
    if (axis === 'z') item.rotation.x = Math.PI / 2;
    if (axis === 'x') item.rotation.z = Math.PI / 2;
    return item;
  }

  function cable(points, surface, radius = 0.045) {
    const path = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    return mesh(new THREE.TubeGeometry(path, 48, radius, 8, false), surface);
  }

  function screw(x, y, z, surface = color.brass) {
    cylinder(0.037, 0.017, surface, x, y, z, 'z');
    block(0.039, 0.008, 0.008, color.ink, x, y, z + 0.011, 0.003);
  }

  // Plinth, rubber feet, and inset fasteners.
  for (const x of [-3.3, 3.3]) {
    for (const z of [-1.32, 1.32]) {
      cylinder(0.16, 0.16, color.plum, x, 0.035, z);
    }
  }
  block(8.25, 0.31, 3.95, color.butter, 0, 0.24, 0, 0.16);
  block(7.98, 0.035, 3.7, color.cream, 0, 0.405, 0, 0.13);
  for (const x of [-3.73, 3.73]) {
    for (const z of [-1.55, 1.55]) cylinder(0.044, 0.017, color.brass, x, 0.43, z);
  }
  block(0.78, 0.13, 0.025, color.plum, 2.89, 0.22, 1.987, 0.025);
  for (let i = 0; i < 3; i += 1) {
    block(0.045, 0.037, 0.01, color.butter, 2.68 + i * 0.09, 0.225, 2.005, 0.007);
  }

  // The belt is a physical connection between all three stations.
  block(7.42, 0.2, 0.92, color.plum, 0, 0.64, 0.89, 0.1);
  block(7.25, 0.052, 0.72, color.lilac, 0, 0.769, 0.89, 0.02);
  const rollers = [];
  for (let x = -3.45; x < 3.5; x += 0.48) {
    const roller = cylinder(0.074, 0.66, color.cream, x, 0.808, 0.89, 'z');
    rollers.push(roller);
    cylinder(0.045, 0.08, color.brass, x, 0.808, 1.25, 'z');
  }
  cable([[-3.7, 0.93, 0.47], [0, 0.93, 0.47], [3.7, 0.93, 0.47]], color.steel, 0.026);
  for (const x of [-3.5, -1.15, 1.3, 3.5]) {
    cylinder(0.025, 0.24, color.steel, x, 0.81, 0.47);
  }

  // Intake: soft lavender body, paper roll, and a red scanning slit.
  block(1.56, 0.18, 1.39, color.plum, -2.56, 0.52, -0.1);
  block(1.65, 1.17, 1.44, color.lavender, -2.56, 1.18, -0.13, 0.16);
  block(1.39, 0.13, 1.23, color.cream, -2.56, 1.824, -0.13, 0.05);
  block(1.27, 0.6, 0.055, color.cream, -2.56, 1.29, 0.614, 0.075);
  block(1.08, 0.115, 0.035, color.ink, -2.56, 1.27, 0.657, 0.034);
  const scanBar = block(0.14, 0.03, 0.017, color.orange, -2.95, 1.27, 0.685, 0.012);
  for (const x of [-3.12, -2]) screw(x, 1.49, 0.653);
  for (const x of [-3.03, -2.12]) {
    block(0.12, 0.59, 0.47, color.plum, x, 2.03, -0.14, 0.04);
  }
  cylinder(0.28, 0.79, color.paper, -2.58, 2.22, -0.14, 'x');
  cylinder(0.32, 0.055, color.lilac, -3.0, 2.22, -0.14, 'x');
  cylinder(0.32, 0.055, color.lilac, -2.16, 2.22, -0.14, 'x');
  cylinder(0.094, 1.13, color.brass, -2.56, 2.22, -0.14, 'x');
  for (let i = 0; i < 4; i += 1) {
    block(0.58, 0.034, 0.022, color.lilac, -2.56, 0.945 + i * 0.068, 0.617, 0.008);
  }

  // Routing: an aubergine cabinet with a large mechanical selector.
  block(1.78, 0.16, 1.5, color.ink, -0.06, 0.51, -0.2);
  block(1.87, 1.92, 1.53, color.plum, -0.06, 1.58, -0.22, 0.19);
  block(1.94, 0.2, 1.61, color.lavender, -0.06, 2.61, -0.22, 0.08);
  block(1.39, 0.11, 0.06, color.ink, -0.06, 0.99, 0.574, 0.03);
  cylinder(0.59, 0.045, color.brass, -0.06, 1.86, 0.576, 'z');
  cylinder(0.52, 0.07, color.cream, -0.06, 1.86, 0.611, 'z');
  for (let i = 0; i < 9; i += 1) {
    const angle = -Math.PI * 0.75 + i * Math.PI * 1.5 / 8;
    const mark = block(0.025, 0.073, 0.012, color.plum,
      -0.06 + Math.sin(angle) * 0.406, 1.86 + Math.cos(angle) * 0.406, 0.657, 0.004);
    mark.rotation.z = -angle;
  }
  const dial = new THREE.Group();
  dial.position.set(-0.06, 1.86, 0.68);
  model.add(dial);
  block(0.075, 0.42, 0.026, color.orange, 0, 0.12, 0, 0.019, dial);
  cylinder(0.106, 0.063, color.plum, 0, 0, 0.014, 'z', dial);
  dial.rotation.z = 1.2;
  block(0.75, 0.22, 0.032, color.lilac, -0.06, 1.17, 0.574, 0.03);
  for (let i = 0; i < 4; i += 1) {
    block(0.049, 0.085, 0.019, color.cream, -0.3 + i * 0.16, 1.17, 0.602, 0.006);
  }
  cylinder(0.2, 0.12, color.ink, 0.42, 2.75, -0.27);
  const button = cylinder(0.151, 0.12, color.orange, 0.42, 2.85, -0.27);
  cylinder(0.17, 0.055, color.brass, -0.48, 2.747, -0.27);
  cylinder(0.065, 0.15, color.cream, -0.48, 2.83, -0.27);
  for (const x of [-0.77, 0.65]) screw(x, 2.39, 0.57);

  // Delivery: a compact lavender press with exposed drive wheels.
  block(1.75, 0.15, 1.44, color.plum, 2.41, 0.52, -0.15);
  block(1.8, 1.2, 1.48, color.lavender, 2.41, 1.22, -0.17, 0.17);
  block(1.92, 0.15, 1.54, color.lilac, 2.41, 1.885, -0.17, 0.08);
  block(1.37, 0.19, 0.05, color.plum, 2.41, 1.23, 0.606, 0.044);
  cylinder(0.17, 1.17, color.cream, 2.41, 1.53, 0.675, 'x');
  cylinder(0.061, 1.54, color.brass, 2.41, 1.53, 0.675, 'x');
  const wheels = [];
  for (const [x, y, radius] of [[2.73, 0.94, 0.2], [2.32, 0.94, 0.15]]) {
    const wheel = new THREE.Group();
    wheel.position.set(x, y, 0.642);
    model.add(wheel);
    cylinder(radius, 0.045, color.plum, 0, 0, 0, 'z', wheel);
    cylinder(radius * 0.72, 0.045, color.brass, 0, 0, 0.03, 'z', wheel);
    for (let i = 0; i < 3; i += 1) {
      const spoke = block(radius * 1.16, 0.031, 0.02, color.plum, 0, 0, 0.06, 0.005, wheel);
      spoke.rotation.z = i * Math.PI / 3;
    }
    cylinder(0.043, 0.031, color.cream, 0, 0, 0.075, 'z', wheel);
    wheels.push(wheel);
  }
  for (let i = 0; i < 5; i += 1) {
    block(0.024, 0.38, 0.06, color.plum, 2.12 + i * 0.14, 1.87, 0.405, 0.006);
  }

  // Supple cables connect the rear of the cabinets, away from the paper path.
  cable([[-2.56, 1.76, -0.58], [-2.28, 2.46, -0.7], [-1.4, 2.54, -0.81], [-0.82, 2.12, -0.58]], color.plum, 0.068);
  cable([[0.67, 2.29, -0.76], [1.05, 2.6, -0.94], [1.9, 2.32, -0.94], [2.29, 1.97, -0.58]], color.orange, 0.061);
  cable([[-2.55, 0.64, -0.96], [-1.47, 0.49, -1.33], [0.0, 0.51, -1.31], [0.52, 0.68, -1.03]], color.lilac, 0.04);

  const lamps = [-2.56, -0.06, 2.41].map((x, index) => {
    const y = [1.6, 2.38, 1.7][index];
    const z = [0.63, 0.58, 0.606][index];
    cylinder(0.082, 0.024, color.brass, x, y, z, 'z');
    const lampMaterial = material('#b5b19b', 0.28);
    const lamp = mesh(new THREE.SphereGeometry(0.053, 16, 10), lampMaterial);
    lamp.position.set(x, y, z + 0.025);
    lamp.scale.z = 0.48;
    return lampMaterial;
  });

  // A receipt is printed with small blocks rather than a raster texture.
  function receipt(parent) {
    block(0.8, 0.014, 0.56, color.paper, 0, 0, 0, 0.036, parent);
    for (let i = 0; i < 3; i += 1) {
      block(0.34 - i * 0.06, 0.004, 0.019, color.lilac, -0.09, 0.011, -0.13 + i * 0.067, 0.003, parent);
    }
    block(0.12, 0.005, 0.12, color.orange, 0.25, 0.011, 0.105, 0.016, parent);
    for (let i = 0; i < 5; i += 1) {
      block(0.026, 0.004, 0.012, color.lilac, -0.22 + i * 0.1, 0.011, 0.22, 0.003, parent);
    }
  }
  const ticket = new THREE.Group();
  receipt(ticket);
  model.add(ticket);
  const outputStack = new THREE.Group();
  outputStack.position.set(3.18, 0.86, 0.89);
  outputStack.rotation.y = -0.06;
  model.add(outputStack);
  for (let i = 0; i < 3; i += 1) {
    const sheet = block(0.8, 0.021, 0.56, color.paper, 0, i * 0.024, 0, 0.035, outputStack);
    sheet.rotation.y = i * 0.025;
  }

  const shadow = new THREE.ShadowMaterial({ opacity: 0.16 });
  materials.add(shadow);
  const ground = mesh(new THREE.PlaneGeometry(200, 200), shadow, scene);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.058;
  ground.castShadow = false;
  scene.add(new THREE.HemisphereLight('#fff7ec', '#9d83a5', 2.7));
  const key = new THREE.DirectionalLight('#fff7e7', 3.5);
  key.position.set(-3, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.setScalar(coarsePointer.matches ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 6, bottom: -6, near: 0.1, far: 25 });
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new THREE.DirectionalLight('#e9defd', 1.1);
  fill.position.set(4, 3, -5);
  scene.add(fill);

  let disposed = false;
  let failed = false;
  let intersecting = true;
  let running = false;
  let frameId = 0;
  let previousTime = null;
  let elapsed = 0;
  let reportedStep = -1;
  let callback = null;
  const duration = 4500;
  const canRender = () => !disposed && !failed && intersecting && !document.hidden;
  const ease = value => value * value * (3 - 2 * value);

  function setPose(time, idle = false) {
    const progress = Math.min(time / duration, 1);
    const x = -3.2 + 6.36 * ease(progress);
    ticket.position.set(x, 0.916 + (progress > 0.93 ? (progress - 0.93) * 0.2 : 0), 0.89);
    ticket.rotation.y = progress > 0.9 ? -0.06 * (progress - 0.9) * 10 : 0;
    dial.rotation.z = 1.2 - 2.4 * ease(Math.max(0, Math.min((time - 1400) / 1700, 1)));
    button.position.y = 2.85 - (time > 0 && time < 280 ? Math.sin(time / 280 * Math.PI) * 0.07 : 0);
    scanBar.position.x = -2.95 + (time < 1500 && time > 0 ? (Math.sin(time / 1500 * Math.PI) * 0.79) : 0);
    for (const roller of rollers) roller.rotation.y = time * 0.004;
    for (const [index, wheel] of wheels.entries()) wheel.rotation.z = (index ? -1 : 1) * time * 0.003;
    const step = Math.min(3, Math.floor(time / 1500));
    for (const [index, lamp] of lamps.entries()) {
      const lit = !idle && index <= step;
      lamp.color.set(lit ? '#e9643e' : '#b5b19b');
      lamp.emissive.set(lit ? '#c34c24' : '#000000');
      lamp.emissiveIntensity = lit ? 0.18 : 0;
    }
  }

  function reportThrough(step) {
    while (reportedStep < step) {
      reportedStep += 1;
      if (callback) callback(reportedStep);
    }
  }

  function draw() {
    if (disposed || failed) return;
    renderer.render(scene, camera);
    if (!context.isContextLost() && !failed) host.classList.add('scene-ready');
  }

  function schedule() {
    if (!frameId && canRender()) frameId = requestAnimationFrame(frame);
  }

  function frame(time) {
    frameId = 0;
    if (!canRender()) return;
    if (running) {
      if (previousTime !== null) elapsed += Math.min(time - previousTime, 100);
      previousTime = time;
      elapsed = Math.min(elapsed, duration);
      setPose(elapsed);
      reportThrough(Math.min(3, Math.floor(elapsed / 1500)));
      if (elapsed >= duration) {
        running = false;
        previousTime = null;
      }
    }
    draw();
    if (running) schedule();
  }

  function pauseOrResume() {
    previousTime = null;
    if (!canRender()) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    } else schedule();
  }

  function resize() {
    if (disposed) return;
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.5 : 2));
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const vertical = Math.max(5.85, 9.65 / aspect);
    camera.left = -vertical * aspect / 2;
    camera.right = vertical * aspect / 2;
    camera.top = vertical / 2;
    camera.bottom = -vertical / 2;
    camera.updateProjectionMatrix();
    schedule();
  }

  function rotate(delta) {
    if (disposed || !Number.isFinite(delta)) return;
    model.rotation.y = THREE.MathUtils.clamp(model.rotation.y + delta, -0.62, 0.48);
    schedule();
  }

  function reset() {
    if (disposed) return;
    running = false;
    elapsed = 0;
    previousTime = null;
    reportedStep = -1;
    callback = null;
    setPose(0, true);
    schedule();
  }

  function run(stepCallback) {
    if (disposed || failed) return false;
    reset();
    callback = typeof stepCallback === 'function' ? stepCallback : null;
    reportThrough(0);
    if (reducedMotion.matches) {
      elapsed = duration;
      setPose(duration);
      reportThrough(3);
      schedule();
    } else {
      running = true;
      setPose(0);
      schedule();
    }
    return true;
  }

  function onMotionChange() {
    if (reducedMotion.matches && running) {
      running = false;
      elapsed = duration;
      previousTime = null;
      setPose(duration);
      reportThrough(3);
      schedule();
    }
  }

  let drag = null;
  const events = new AbortController();
  const eventOptions = { signal: events.signal };
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, active: event.pointerType !== 'touch' };
    if (drag.active) canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
  }, eventOptions);
  canvas.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.active) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
        drag = null;
        canvas.style.cursor = 'grab';
        return;
      }
      if (Math.abs(dx) < 6) return;
      drag.active = true;
      canvas.setPointerCapture(event.pointerId);
    }
    rotate((event.clientX - drag.lastX) * 0.004);
    drag.lastX = event.clientX;
  }, eventOptions);
  const endDrag = () => { drag = null; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerup', endDrag, eventOptions);
  canvas.addEventListener('pointercancel', endDrag, eventOptions);
  canvas.addEventListener('lostpointercapture', endDrag, eventOptions);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    failed = true;
    host.classList.remove('scene-ready');
    pauseOrResume();
  }, eventOptions);
  canvas.addEventListener('webglcontextrestored', () => {
    failed = false;
    pauseOrResume();
  }, eventOptions);
  document.addEventListener('visibilitychange', pauseOrResume, eventOptions);
  reducedMotion.addEventListener('change', onMotionChange, eventOptions);
  coarsePointer.addEventListener('change', resize, eventOptions);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver(entries => {
    intersecting = entries[0].isIntersecting;
    pauseOrResume();
  }, { threshold: 0 });
  intersectionObserver.observe(host);

  function dispose() {
    if (disposed) return;
    disposed = true;
    running = false;
    cancelAnimationFrame(frameId);
    events.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    for (const geometry of geometries) geometry.dispose();
    for (const surface of materials) surface.dispose();
    key.shadow.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    host.classList.remove('scene-ready');
  }

  renderer.debug.onShaderError = () => { failed = true; };
  host.append(canvas);
  try {
    setPose(0, true);
    resize();
    draw();
    if (failed || context.isContextLost()) {
      dispose();
      return null;
    }
  } catch {
    dispose();
    return null;
  }
  return { run, reset, rotate, dispose };
}
