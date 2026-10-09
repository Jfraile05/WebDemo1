import * as THREE from './vendor/three.module.min.js';

/**
 * A small, working model of an intake, routing, and delivery machine.
 * run(visual, onBeat) plays one errand. visual is { glyph: 'form' | 'call'
 * | 'email', sector: 0 | 1 | 2, approval }. onBeat receives 1, 2, 'wait'
 * (approval only), 3, and 'done', each once and in order. A run that
 * waits holds still until approve(). Reduced motion snaps between beats.
 * onLayout(points, width, height) gets the three station anchors in CSS
 * pixels, each [x, y, shown], whenever a frame renders. rotate(delta)
 * takes radians.
 * No frames are scheduled while idle, done, or waiting.
 */
export function initAutomationScene(host, { onLayout } = {}) {
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
  camera.position.set(5.6, 4.8, 11);
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
    lavender: material('#94b4cc', 0.24, 0.16),
    lilac: material('#afa0c1', 0.43),
    plum: material('#382c3e', 0.38),
    ink: material('#251e2a', 0.64),
    orange: material('#f06532', 0.24, 0.12),
    paper: material('#fff7df', 0.77),
    cream: material('#eae3cd', 0.38),
    brass: material('#b49a58', 0.4, 0.46),
    steel: material('#a19b9c', 0.32, 0.55),
    olive: material('#62755a', 0.5),
    approveLight: material('#df5438', 0.28),
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
  // Small parts stay out of the shadow pass.
  const quiet = group => group.traverse(part => { part.castShadow = false; });

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
  // Colored sectors on the dial face, one per kind of errand.
  const sectorColors = [color.olive, color.orange, color.plum];
  const needleTargets = [0.7, 0, -0.7];
  for (const [index, target] of needleTargets.entries()) {
    const sector = mesh(new THREE.RingGeometry(0.43, 0.5, 20, 1, Math.PI / 2 + target - 0.3, 0.6), sectorColors[index]);
    sector.position.set(-0.06, 1.86, 0.649);
    sector.castShadow = false;
  }
  const dial = new THREE.Group();
  dial.position.set(-0.06, 1.86, 0.68);
  model.add(dial);
  block(0.075, 0.42, 0.026, color.orange, 0, 0.12, 0, 0.019, dial);
  cylinder(0.106, 0.063, color.plum, 0, 0, 0.014, 'z', dial);
  dial.rotation.z = 1.2;
  // The lilac front is a drawer; the AI's price sheet lives inside.
  const drawer = new THREE.Group();
  model.add(drawer);
  block(0.68, 0.16, 0.34, color.ink, -0.06, 1.17, 0.388, 0.03, drawer);
  const sheet = block(0.44, 0.01, 0.26, color.paper, -0.06, 1.255, 0.388, 0.02, drawer);
  for (const z of [-0.02, 0.06]) block(0.28, 0.004, 0.024, color.plum, 0, 0.008, z, 0.006, sheet);
  quiet(sheet);
  block(0.75, 0.22, 0.032, color.lilac, -0.06, 1.17, 0.574, 0.03, drawer);
  for (let i = 0; i < 4; i += 1) {
    block(0.049, 0.085, 0.019, color.cream, -0.3 + i * 0.16, 1.17, 0.602, 0.006, drawer);
  }
  cylinder(0.2, 0.12, color.ink, 0.42, 2.75, -0.27);
  const button = cylinder(0.151, 0.12, color.approveLight, 0.42, 2.85, -0.27);
  cylinder(0.17, 0.055, color.brass, -0.48, 2.747, -0.27);
  cylinder(0.065, 0.15, color.cream, -0.48, 2.83, -0.27);
  for (const x of [-0.77, 0.65]) screw(x, 2.39, 0.57);

  // Delivery: a compact lavender press with exposed drive wheels.
  block(1.75, 0.15, 1.44, color.plum, 2.41, 0.52, -0.15);
  block(1.8, 1.2, 1.48, color.lavender, 2.41, 1.22, -0.17, 0.17);
  block(1.92, 0.15, 1.54, color.lilac, 2.41, 1.885, -0.17, 0.08);
  block(1.37, 0.19, 0.05, color.plum, 2.41, 1.23, 0.606, 0.044);
  const pressRoller = cylinder(0.17, 1.17, color.cream, 2.41, 1.53, 0.675, 'x');
  const pressAxle = cylinder(0.061, 1.54, color.brass, 2.41, 1.53, 0.675, 'x');
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
    for (let i = 0; i < 12; i += 1) {
      const angle = i * Math.PI / 6;
      const tooth = block(0.07, 0.06, 0.045, color.brass,
        Math.cos(angle) * radius, Math.sin(angle) * radius, 0.025, 0.008, wheel);
      tooth.rotation.z = angle;
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

  // Visible signals connect the intake, decision, and delivery beats.
  const signalMaterial = material('#f7e589', 0.2, 0.18);
  signalMaterial.emissive.set('#f06532');
  signalMaterial.emissiveIntensity = 0.8;
  const signalPaths = [
    [[-2.56, 1.76, -0.58], [-2.28, 2.46, -0.7], [-1.4, 2.54, -0.81], [-0.82, 2.12, -0.58]],
    [[0.67, 2.29, -0.76], [1.05, 2.6, -0.94], [1.9, 2.32, -0.94], [2.29, 1.97, -0.58]],
  ].map(points => new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point))));
  const signals = signalPaths.map(() => {
    const signal = mesh(new THREE.SphereGeometry(0.12, 16, 10), signalMaterial);
    signal.castShadow = false;
    signal.visible = false;
    return signal;
  });

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

  // A mailbox on a short post just past the belt takes whatever goes to the
  // customer. Its parts are sized in small units and the group is scaled up
  // as one piece.
  cylinder(0.12, 0.03, color.brass, 3.92, 0.435, 1.0);
  cylinder(0.055, 0.42, color.plum, 3.92, 0.63, 1.0);
  const mailbox = new THREE.Group();
  mailbox.position.set(3.92, 0.82, 1.0);
  mailbox.scale.setScalar(1.7);
  model.add(mailbox);
  block(0.42, 0.24, 0.4, color.lavender, 0, 0.12, 0, 0.05, mailbox);
  const roof = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.42, 24, 1, false, 0, Math.PI), color.lavender, mailbox);
  roof.position.y = 0.24;
  roof.rotation.z = Math.PI / 2;
  const slot = block(0.02, 0.05, 0.22, color.plum, -0.215, 0.17, 0, 0.01, mailbox);
  slot.castShadow = false;
  cylinder(0.024, 0.03, color.brass, 0.22, 0.14, 0, 'x', mailbox).castShadow = false;
  const flag = new THREE.Group();
  flag.position.set(-0.1, 0.1, 0.215);
  mailbox.add(flag);
  cylinder(0.03, 0.03, color.brass, 0, 0, 0, 'z', flag);
  block(0.035, 0.24, 0.02, color.orange, 0, 0.12, 0.02, 0.012, flag);
  block(0.1, 0.07, 0.022, color.orange, 0.04, 0.205, 0.02, 0.016, flag);
  quiet(flag);

  // The errand: a slip with a glyph that becomes an index card, all built
  // once from blocks and switched with visibility.
  const item = new THREE.Group();
  model.add(item);
  const slip = new THREE.Group();
  item.add(slip);
  block(0.96, 0.016, 0.58, color.paper, 0, 0, 0, 0.04, slip);
  const glyphs = { form: new THREE.Group(), call: new THREE.Group(), email: new THREE.Group() };
  for (const glyph of Object.values(glyphs)) {
    glyph.position.y = 0.011;
    slip.add(glyph);
  }
  block(0.52, 0.006, 0.07, color.lilac, -0.1, 0, -0.15, 0.02, glyphs.form);
  block(0.52, 0.006, 0.07, color.lilac, -0.1, 0, -0.03, 0.02, glyphs.form);
  block(0.22, 0.008, 0.08, color.orange, 0.17, 0, 0.14, 0.035, glyphs.form);
  glyphs.call.rotation.y = 0.35;
  block(0.34, 0.03, 0.08, color.plum, 0, 0.012, 0, 0.03, glyphs.call);
  for (const x of [-0.17, 0.17]) block(0.1, 0.05, 0.15, color.plum, x, 0.02, 0.03, 0.035, glyphs.call);
  for (const side of [-1, 1]) {
    const strip = block(0.5, 0.006, 0.03, color.plum, side * 0.225, 0, -0.05, 0.01, glyphs.email);
    strip.rotation.y = side * 0.45;
  }
  cylinder(0.06, 0.012, color.orange, 0, 0.004, 0.06, 'y', glyphs.email);
  quiet(slip);
  slip.children[0].castShadow = true;

  const card = new THREE.Group();
  item.add(card);
  block(1.0, 0.022, 0.6, color.paper, 0, 0, 0, 0.04, card);
  const cardDetail = new THREE.Group();
  cardDetail.position.y = 0.013;
  card.add(cardDetail);
  block(0.96, 0.006, 0.1, color.butter, 0, 0, -0.24, 0.02, cardDetail);
  for (let i = 0; i < 3; i += 1) {
    block(0.16, 0.005, 0.045, color.plum, -0.3, 0, -0.1 + i * 0.13, 0.012, cardDetail);
    block(0.46, 0.005, 0.045, color.lilac, 0.05, 0, -0.1 + i * 0.13, 0.012, cardDetail);
  }
  const tabPivot = new THREE.Group();
  tabPivot.position.set(0.49, 0, -0.17);
  card.add(tabPivot);
  const tab = block(0.14, 0.012, 0.18, color.olive, 0.07, 0, 0, 0.03, tabPivot);
  quiet(cardDetail);
  quiet(tabPivot);

  // What the card splits into: one piece for the customer, one for you.
  const envelope = new THREE.Group();
  block(0.34, 0.014, 0.24, color.paper, 0, 0, 0, 0.03, envelope);
  for (const side of [-1, 1]) {
    const fold = block(0.2, 0.004, 0.02, color.plum, side * 0.08, 0.009, -0.05, 0.006, envelope);
    fold.rotation.y = side * 0.55;
  }
  const bubble = new THREE.Group();
  block(0.34, 0.03, 0.24, color.lilac, 0, 0, 0, 0.08, bubble);
  block(0.08, 0.03, 0.08, color.lilac, -0.12, 0, 0.13, 0.02, bubble).rotation.y = 0.6;
  const note = new THREE.Group();
  block(0.42, 0.012, 0.42, color.butter, 0, 0, 0, 0.03, note);
  for (const x of [-0.02, 0.08]) block(0.024, 0.004, 0.28, color.plum, x, 0.008, 0, 0.006, note);
  const noteBand = block(0.08, 0.006, 0.42, color.orange, -0.17, 0.008, 0, 0.02, note);
  for (const token of [envelope, bubble, note]) {
    token.visible = false;
    model.add(token);
    quiet(token);
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
  let waiting = false;
  let approved = false;
  let snapping = false;
  let frameId = 0;
  let previousTime = null;
  let elapsed = 0;
  let runToken = 0;
  let callback = null;
  let beats = [];
  let nextBeat = 0;
  let stages = [];
  let stage = 0;
  let snapTimers = [];
  let pendingSnap = -1;
  let width = 0;
  let height = 0;
  const idleVisual = { glyph: 'form', sector: 0, approval: false };
  let visual = idleVisual;
  const canRender = () => !disposed && !failed && intersecting && !document.hidden;
  const span = (time, start, length) => THREE.MathUtils.clamp((time - start) / length, 0, 1);
  const ease = value => value * value * (3 - 2 * value);
  const arc = value => Math.sin(Math.PI * value);
  // Settles by 700 ms with one visible overshoot.
  const swing = ms => ms <= 0 ? 0 : ms >= 700 ? 1 : 1 - Math.exp(-ms / 150) * Math.cos(ms / 70);
  // The card leaves the sorter at 3,500 ms, or at 4,400 ms after an approval.
  const departure = current => current.approval ? 4400 : 3500;
  const finish = current => departure(current) + 2300;
  const splitPoint = new THREE.Vector3(2.3, 0.95, 1.0);
  const mailSlot = new THREE.Vector3(3.5, 1.11, 1.0);
  const noteTarget = new THREE.Vector3(3.322, 1.3, -0.12);
  // A curve that passes through (3.6, 1.75, 0.75) keeps the note outside the cabinet.
  const noteBend = new THREE.Vector3(3.6, 1.75, 0.75).multiplyScalar(2)
    .sub(splitPoint.clone().add(noteTarget).multiplyScalar(0.5));
  // During a run the camera leans in on the working station, in model space
  // so it follows a rotated machine, and is back at the full view by done.
  const homeTarget = new THREE.Vector3(0, 0.98, 0);
  const homePosition = camera.position.clone();
  const lensFocus = new THREE.Vector3();
  const lensShift = new THREE.Vector3();
  const upAxis = new THREE.Vector3(0, 1, 0);
  let lensWeight = 0;
  // Where the camera looks at stations 1, 2 and 3, as model x and y.
  const stationFocus = [[-1.6, 1.3], [-0.06, 1.15], [2.7, 1.2]];
  let pushZoom = 1.3;

  // Every value is a function of time, so any moment can be drawn directly.
  // A negative time is the idle pose.
  function pose(time, current, held = false) {
    const idle = time < 0;
    const start = departure(current);
    const hop = span(time, 1300, 500);
    const squash = arc(span(time, 350, 120));
    const toSort = ease(span(time, 1900, 800));
    const toPress = ease(span(time, start, 800));
    signals.forEach((signal, index) => {
      const progress = span(time, index ? start : 1900, 800);
      signal.visible = !idle && progress > 0 && progress < 1 && !snapping;
      signal.position.copy(signalPaths[index].getPoint(progress));
    });
    item.position.set(
      -3.2 + 0.64 * ease(span(time, 450, 550)) + 2.5 * toSort + 2.36 * toPress,
      (idle ? 0.915 : 2.1 - 1.185 * span(time, 0, 350) ** 2) + 0.45 * arc(hop),
      1.0 + 0.08 * arc(hop),
    );
    item.rotation.x = hop < 0.5 ? Math.PI * hop : Math.PI * (hop - 1);
    item.scale.set(1 + 0.06 * squash, 1, 1 - 0.05 * squash);
    item.visible = idle || time < start + 1200;
    slip.visible = idle || hop < 0.5;
    card.visible = !slip.visible;
    for (const [name, glyph] of Object.entries(glyphs)) glyph.visible = name === current.glyph;
    for (const roller of rollers) roller.rotation.y = -item.position.x / 0.074;
    scanBar.position.x = -2.95 + 0.79 * arc(span(time, 1000, 500));

    dial.rotation.z = 1.2 + (needleTargets[current.sector] - 1.2) * swing(time - 2700);
    const pop = span(time, 3150, 300);
    tab.material = sectorColors[current.sector];
    tabPivot.visible = pop > 0;
    tabPivot.scale.x = Math.max(0.001, pop < 0.7 ? 1.15 * pop / 0.7 : 1.15 - 0.15 * (pop - 0.7) / 0.3);
    const checking = current.approval && !idle;
    drawer.position.z = checking ? 0.3 * (ease(span(time, 3400, 300)) - ease(span(time, 4100, 300))) : 0;
    sheet.position.y = 1.255 + (checking ? 0.2 * (ease(span(time, 3550, 250)) - ease(span(time, 4000, 200))) : 0);
    button.position.y = 2.85 - (checking && !held ? arc(span(time, 4400, 280)) * 0.07 : 0);
    color.approveLight.emissive.set(held ? '#c34c24' : '#000000');
    color.approveLight.emissiveIntensity = held ? 0.35 : 0;

    const dip = 0.12 * arc(span(time, start + 900, 350));
    pressRoller.position.y = 1.53 - dip;
    pressAxle.position.y = 1.53 - dip;
    const spin = Math.PI * 2 * ease(span(time, start + 800, 600));
    for (const [index, wheel] of wheels.entries()) wheel.rotation.z = (index ? -1 : 1) * spin;

    const split = !idle && time >= start + 1200;
    const customer = current.glyph === 'call' ? bubble : envelope;
    (customer === bubble ? envelope : bubble).visible = false;
    const toSlot = span(time, start + 1200, 500);
    customer.visible = split && toSlot < 1;
    customer.position.lerpVectors(splitPoint, mailSlot, ease(toSlot));
    customer.position.y += 0.45 * arc(toSlot);
    customer.scale.setScalar(1 - 0.7 * span(time, start + 1580, 120));
    flag.rotation.z = -Math.PI / 2 * (1 - swing((time - start - 1700) * 1.75));
    const fly = ease(span(time, start + 1350, 600));
    const rest = 1 - fly;
    note.visible = split;
    note.position.copy(splitPoint).multiplyScalar(rest * rest)
      .addScaledVector(noteBend, 2 * rest * fly)
      .addScaledVector(noteTarget, fly * fly);
    note.rotation.set(0.07 * fly, 0, -Math.PI / 2 * fly);
    note.scale.setScalar(1 + 0.08 * arc(span(time, start + 1950, 120)));
    noteBand.visible = current.glyph === 'call';

    const switchOn = [0, 2700, start + 900];
    for (const [index, lamp] of lamps.entries()) {
      const lit = !idle && time >= switchOn[index];
      lamp.color.set(lit ? '#e9643e' : '#b5b19b');
      lamp.emissive.set(lit ? '#c34c24' : '#000000');
      lamp.emissiveIntensity = lit ? 0.18 : 0;
    }

    // The camera rides with the card between stations on the same curves.
    const [[x1, y1], [x2, y2], [x3, y3]] = stationFocus;
    lensFocus.set(x1 + (x2 - x1) * toSort + (x3 - x2) * toPress, y1 + (y2 - y1) * toSort + (y3 - y2) * toPress, 0.4);
    lensWeight = idle || snapping ? 0 : ease(span(time, 0, 700)) * (1 - ease(span(time, start + 1850, 450)));
  }

  // Applied just before each render, so rotating while zoomed keeps the station framed.
  function aim() {
    lensShift.copy(lensFocus).applyAxisAngle(upAxis, model.rotation.y).sub(homeTarget).multiplyScalar(lensWeight);
    camera.position.copy(homePosition).add(lensShift);
    const zoom = 1 + (pushZoom - 1) * lensWeight;
    if (camera.zoom !== zoom) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }
  }

  function reportThrough(time) {
    const token = runToken;
    while (token === runToken && nextBeat < beats.length && beats[nextBeat][0] <= time) {
      const beat = beats[nextBeat][1];
      nextBeat += 1;
      if (callback) callback(beat);
    }
  }

  // Label anchors above each station, in model space.
  const anchors = [[-2.56, 1.77, 0.55], [-0.06, 2.5, 0.55], [2.41, 1.8, 0.55]];
  const projected = new THREE.Vector3();
  const points = anchors.map(() => [0, 0, 1]);

  function draw() {
    if (disposed || failed) return;
    aim();
    renderer.render(scene, camera);
    if (!context.isContextLost() && !failed) host.classList.add('scene-ready');
    if (typeof onLayout !== 'function' || !width || !height) return;
    for (const [index, anchor] of anchors.entries()) {
      projected.set(...anchor).applyMatrix4(model.matrixWorld).project(camera);
      const x = (projected.x + 1) / 2 * width;
      const y = (1 - projected.y) / 2 * height;
      points[index][0] = x;
      points[index][1] = y;
      // The third value is 0 once the zoom carries a station off the stage, so its
      // tape hides as it rides off with its station. Tapes hang above their
      // anchor, so the top edge allows for one.
      points[index][2] = x >= 24 && x <= width - 24 && y >= 30 && y <= height - 8 ? 1 : 0;
    }
    onLayout(points, width, height);
  }

  function schedule() {
    if (!frameId && canRender()) frameId = requestAnimationFrame(frame);
  }

  function frame(time) {
    frameId = 0;
    if (!canRender()) return;
    const playing = running && !waiting && !snapping;
    if (playing) {
      if (previousTime !== null) elapsed += Math.min(time - previousTime, 100);
      previousTime = time;
      if (visual.approval && !approved && elapsed >= 4400) {
        elapsed = 4400;
        waiting = true;
        previousTime = null;
      }
      elapsed = Math.min(elapsed, finish(visual));
      if (elapsed >= finish(visual)) {
        running = false;
        previousTime = null;
      }
      pose(elapsed, visual, waiting);
      reportThrough(elapsed);
    }
    draw();
    if (running && !waiting && !snapping) schedule();
  }

  function pauseOrResume() {
    previousTime = null;
    if (!canRender()) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    } else {
      if (pendingSnap >= 0) snapLater(pendingSnap);
      pendingSnap = -1;
      schedule();
    }
  }

  function resize() {
    if (disposed) return;
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.5 : 2));
    renderer.setSize(width, height, false);
    pushZoom = height < 300 ? 1.2 : 1.3;
    const aspect = width / height;
    const vertical = Math.max(5.6, 9.65 / aspect);
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
    runToken += 1;
    running = false;
    waiting = false;
    approved = false;
    snapping = false;
    elapsed = 0;
    previousTime = null;
    callback = null;
    beats = [];
    nextBeat = 0;
    snapTimers.forEach(clearTimeout);
    snapTimers = [];
    pendingSnap = -1;
    pose(-1, idleVisual);
    schedule();
  }

  // Reduced motion shows one still frame per beat, 2.4 seconds apart.
  // Offscreen or hidden, the next beat waits and gets a fresh 2.4 seconds on return.
  function snapLater(index) {
    snapTimers.push(setTimeout(() => {
      if (canRender()) snap(index);
      else pendingSnap = index;
    }, 2400));
  }

  function snap(index) {
    const [time, through] = stages[index];
    stage = index;
    waiting = through === 4400;
    elapsed = through;
    if (index === stages.length - 1) {
      running = false;
      snapping = false;
    } else if (!waiting) snapLater(index + 1);
    pose(time, visual, waiting);
    schedule();
    reportThrough(through);
  }

  function run(nextVisual, onBeat) {
    if (disposed || failed || !nextVisual || !(nextVisual.glyph in glyphs)) return false;
    reset();
    visual = nextVisual;
    callback = typeof onBeat === 'function' ? onBeat : null;
    const start = departure(visual);
    beats = [[0, 1], [2700, 2], ...(visual.approval ? [[4400, 'wait']] : []), [start + 900, 3], [start + 2300, 'done']];
    stages = [[1850, 1850], [3450, 3450], ...(visual.approval ? [[3850, 4400]] : []), [start + 2300, start + 2300]];
    running = true;
    if (reducedMotion.matches) {
      snapping = true;
      snap(0);
    } else {
      pose(0, visual);
      schedule();
      reportThrough(0);
    }
    return true;
  }

  function approve() {
    if (disposed || !waiting) return false;
    waiting = false;
    approved = true;
    previousTime = null;
    if (snapping) snap(stage + 1);
    else schedule();
    return true;
  }

  function onMotionChange() {
    if (!reducedMotion.matches || !running || snapping) return;
    snapping = true;
    previousTime = null;
    if (waiting) {
      stage = stages.length - 2;
      // Redraw the held frame at the full view.
      pose(elapsed, visual, true);
      schedule();
      return;
    }
    snap(approved ? stages.length - 1 : Math.min(nextBeat - 1, stages.length - 1));
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
    snapTimers.forEach(clearTimeout);
    pendingSnap = -1;
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
    pose(-1, idleVisual);
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
  return { run, approve, reset, rotate, dispose };
}
