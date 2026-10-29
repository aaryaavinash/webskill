import * as THREE from '../vendor/three.module.js';

const canvas = document.querySelector('#world');
const status = document.querySelector('#world-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
} catch {
  status.textContent = 'The 3D scene is unavailable. The story and install links still work.';
}

if (renderer) {
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.55;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  // ORIGINAL (preserved, not deleted — disabled by comment): renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const world = new THREE.Group();
  scene.add(world);

  // ORIGINAL (preserved, not deleted — disabled by comment): const rock = new THREE.MeshStandardMaterial({ color: 0x333d43, roughness: 0.94, flatShading: true });
  const rock = new THREE.MeshStandardMaterial({ color: 0x292f36, roughness: 0.94, flatShading: true });
  const darkRock = new THREE.MeshStandardMaterial({ color: 0x1a2229, roughness: 0.98, flatShading: true });
  const copper = new THREE.MeshStandardMaterial({ color: 0xb48663, metalness: 0.76, roughness: 0.29 });
  const copperEdge = new THREE.MeshStandardMaterial({ color: 0xe8bb8c, metalness: 0.69, roughness: 0.26 });
  // ORIGINAL (preserved, not deleted — disabled by comment): const stone = new THREE.MeshStandardMaterial({ color: 0x657279, roughness: 0.72, metalness: 0.08 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x414d53, roughness: 0.72, metalness: 0.08 });
  // ORIGINAL (preserved, not deleted — disabled by comment): const moss = new THREE.MeshStandardMaterial({ color: 0x566b5a, roughness: 0.98 });
  const moss = new THREE.MeshStandardMaterial({ color: 0x2d4940, roughness: 0.98 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xffd3a6, transparent: true, opacity: 0.85 });
  const portalUniforms = { uTime: { value: 0 }, uEnergy: { value: 0.55 }, uHue: { value: new THREE.Color(0xe6a478) } };
  const portalMat = new THREE.ShaderMaterial({
    uniforms: portalUniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: `varying vec2 vUv; uniform float uTime; uniform float uEnergy; uniform vec3 uHue;
      void main(){ vec2 p=vUv*2.-1.; float r=length(p); float a=atan(p.y,p.x); float wave=sin(a*8.+r*23.-uTime*.9)*.06;
      float rings=sin(r*33.-uTime*1.4)*.045; float edge=smoothstep(.91,.35,r+wave+rings);
      float core=1.-smoothstep(.05,.85,r); vec3 base=mix(vec3(.025,.095,.14),uHue,core*.45+uEnergy*.2);
      float veins=pow(max(0.,sin(a*11.+r*27.-uTime*1.8)),12.)*.32;
      gl_FragColor=vec4(base+uHue*(veins+pow(core,3.)*.25),edge*(.82+uEnergy*.16)); }`,
  });

  function mesh(geometry, material, parent = world) {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }

  // A layered floating terrain gives the portal a place, a horizon, and cast shadows.
  const underside = mesh(new THREE.CylinderGeometry(3.2, 1.0, 1.55, 9, 2), darkRock);
  underside.position.y = -1.5;
  underside.rotation.y = 0.12;
  const middle = mesh(new THREE.CylinderGeometry(3.38, 3.12, 0.34, 9), rock);
  middle.position.y = -0.65;
  const top = mesh(new THREE.CylinderGeometry(3.23, 3.34, 0.2, 9), stone);
  top.position.y = -0.4;
  const soil = mesh(new THREE.CylinderGeometry(2.88, 3.02, 0.055, 9), moss);
  soil.position.y = -0.265;
  // ORIGINAL (preserved, not deleted — disabled by comment): const path = mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.012, 64), new THREE.MeshStandardMaterial({ color: 0x90887b, roughness: 0.94 }));
  const path = mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.012, 64), new THREE.MeshStandardMaterial({ color: 0x6a6660, roughness: 0.94 }));
  path.position.y = -0.225;

  const gate = new THREE.Group();
  world.add(gate);
  for (const side of [-1, 1]) {
    const pillar = mesh(new THREE.CylinderGeometry(0.18, 0.25, 2.8, 8), copper, gate);
    pillar.position.set(side * 1.05, 1.12, 0);
    const foot = mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.18, 10), darkRock, gate);
    foot.position.set(side * 1.05, -0.14, 0);
    const seam = mesh(new THREE.TorusGeometry(0.2, 0.026, 5, 32), copperEdge, gate);
    seam.rotation.x = Math.PI / 2;
    seam.position.set(side * 1.05, 0.45, 0);
  }
  const arch = mesh(new THREE.TorusGeometry(1.05, 0.19, 12, 80, Math.PI), copper, gate);
  arch.position.y = 2.52;
  const archLine = mesh(new THREE.TorusGeometry(1.05, 0.018, 6, 80, Math.PI), copperEdge, gate);
  archLine.position.set(0, 2.52, 0.155);
  const portal = mesh(new THREE.CircleGeometry(1.025, 96), portalMat, gate);
  portal.castShadow = false;
  portal.receiveShadow = false;
  portal.position.set(0, 2.5, -0.1);
  const portalRing = mesh(new THREE.TorusGeometry(0.79, 0.012, 4, 96), glow, gate);
  portalRing.position.set(0, 2.5, 0.06);

  const plinth = mesh(new THREE.CylinderGeometry(0.87, 1.18, 0.42, 8), darkRock);
  plinth.position.set(0, -0.02, 0.3);
  const stairs = [];
  for (let i = 0; i < 4; i++) {
    const step = mesh(new THREE.BoxGeometry(1.8 + i * 0.32, 0.095, 0.4), stone);
    step.position.set(0, -0.03 - i * 0.075, 0.78 + i * 0.37);
    stairs.push(step);
  }

  // Small trees and fractured stones establish scale without borrowing any model asset.
  const treeMat = new THREE.MeshStandardMaterial({ color: 0x2d403d, roughness: 1, flatShading: true });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x493e36, roughness: 1 });
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.39996;
    const radius = 2.16 + (i % 3) * 0.19;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (z > 0.5 && Math.abs(x) < 1.35) continue;
    const height = 0.45 + (i % 4) * 0.11;
    const trunk = mesh(new THREE.CylinderGeometry(0.035, 0.055, height * 0.55, 5), trunkMat);
    trunk.position.set(x, -0.22 + height * 0.27, z);
    const crown = mesh(new THREE.ConeGeometry(height * 0.25, height, 6), treeMat);
    crown.position.set(x, -0.22 + height * 0.75, z);
  }
  for (let i = 0; i < 16; i++) {
    const angle = i * 2.71;
    const radius = 2.4 + (i % 4) * 0.12;
    const pebble = mesh(new THREE.IcosahedronGeometry(0.08 + (i % 3) * 0.035, 0), i % 3 ? stone : rock);
    pebble.position.set(Math.cos(angle) * radius, -0.21, Math.sin(angle) * radius);
    pebble.rotation.set(i * 0.2, i * 0.8, i * 0.3);
  }

  const fragments = [];
  for (let i = 0; i < 12; i++) {
    const shard = mesh(new THREE.TetrahedronGeometry(0.13 + (i % 4) * 0.045), i % 3 === 0 ? copper : stone);
    shard.position.set(Math.cos(i * 2.4) * (3.4 + i * 0.12), -0.5 + (i % 5) * 0.56, Math.sin(i * 2.4) * (3.0 + i * 0.08));
    shard.userData.base = shard.position.clone();
    fragments.push(shard);
  }

  const points = new Float32Array(150 * 3);
  for (let i = 0; i < 150; i++) {
    const angle = i * 2.39996;
    const radius = 1.2 + ((i * 17) % 79) / 79 * 4.2;
    points[i * 3] = Math.cos(angle) * radius;
    points[i * 3 + 1] = ((i * 37) % 83) / 83 * 4 - 0.8;
    points[i * 3 + 2] = Math.sin(angle) * radius;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xf8d7ab, size: 0.023, transparent: true, opacity: 0.7, sizeAttenuation: true }));
  world.add(particles);

  // ORIGINAL (preserved, not deleted — disabled by comment): const ambient = new THREE.HemisphereLight(0xaec2d3, 0x29242a, 2.35);
  const ambient = new THREE.HemisphereLight(0xaec2d3, 0x29242a, 1.35);
  scene.add(ambient);
  // ORIGINAL (preserved, not deleted — disabled by comment): const key = new THREE.DirectionalLight(0xffd2a2, 5.4);
  const key = new THREE.DirectionalLight(0xffd2a2, 3.4);
  key.position.set(-4, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6; key.shadow.camera.right = 6;
  key.shadow.camera.top = 7; key.shadow.camera.bottom = -6;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.PointLight(0x79bad5, 25, 12, 2);
  rim.position.set(2, 3, -2);
  scene.add(rim);
  const inner = new THREE.PointLight(0xeeb782, 13, 5, 2);
  inner.position.set(0, 2.4, 0.3);
  scene.add(inner);

  const stops = [document.querySelector('#top'), document.querySelector('#story'), ...document.querySelectorAll('.chapter'), document.querySelector('#install')];
  const shots = [
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [0.1, 2.2, 10.2], look: [-1.5, 0.6, 0], yaw: -0.32, energy: 0.55, exposure: 1.55 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [2.7, 3.2, 8.0], look: [-1.4, 0.6, 0], yaw: 0.2, energy: 0.7, exposure: 1.75 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [-2.0, 3.7, 7.2], look: [-1.3, 0.8, 0], yaw: -0.16, energy: 0.9, exposure: 1.8 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [2.8, 2.5, 6.5], look: [1.2, 0.9, 0], yaw: 0.46, energy: 1.0, exposure: 1.95 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [0.0, 1.6, 6.6], look: [-1.4, 0.8, 0], yaw: 0.0, energy: 1.4, exposure: 2.0 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [0.4, 2.1, 9.8], look: [0, 0.5, 0], yaw: 0.1, energy: 0.8, exposure: 1.65 },
    { cam: [1.0, 3.0, 14.0], look: [-3.0, 0.7, 0], yaw: -0.32, energy: 0.55, exposure: 1.48 },
    { cam: [2.4, 3.3, 12.7], look: [-2.3, 0.7, 0], yaw: 0.2, energy: 0.7, exposure: 1.58 },
    { cam: [-1.3, 3.5, 12.5], look: [-2.2, 0.8, 0], yaw: -0.16, energy: 0.9, exposure: 1.65 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [-2.0, 3.0, 12.6], look: [2.15, 0.8, 0], yaw: 0.46, energy: 1.0, exposure: 1.7 },
    { cam: [-2.0, 3.0, 13.5], look: [4.0, 0.8, 0], yaw: 0.46, energy: 1.0, exposure: 1.7 },
    // ORIGINAL (preserved, not deleted — disabled by comment): { cam: [0.0, 2.8, 12.4], look: [-2.2, 0.8, 0], yaw: 0.0, energy: 1.4, exposure: 1.75 },
    { cam: [0.0, 2.8, 14.4], look: [-3.8, 0.8, 0], yaw: 0.0, energy: 1.4, exposure: 1.75 },
    { cam: [0.4, 2.6, 13.6], look: [0, 0.5, 0], yaw: 0.1, energy: 0.8, exposure: 1.55 },
  ];
  const pos = new THREE.Vector3();
  const aim = new THREE.Vector3();
  const desiredPos = new THREE.Vector3();
  const desiredAim = new THREE.Vector3();
  let scrollState = 0;
  let pointerX = 0;
  let pointerY = 0;
  let lightValue = 0.32;
  let manualLight = false;
  const lightControl = document.querySelector('#light-control');
  const lightReadout = document.querySelector('#light-readout');
  const mobileSlots = [document.querySelector('.artifact'), ...document.querySelectorAll('.chapter-art')];
  let renderWidth = 0, renderHeight = 0;

  function layoutCanvas() {
    if (innerWidth >= 700) {
      canvas.style.left = '0px'; canvas.style.top = '0px';
      canvas.style.width = '100%'; canvas.style.height = '100%';
      canvas.style.visibility = 'visible';
      if (renderWidth !== innerWidth || renderHeight !== innerHeight) {
        renderWidth = innerWidth; renderHeight = innerHeight;
        renderer.setSize(renderWidth, renderHeight, false);
        camera.aspect = renderWidth / renderHeight;
        camera.fov = 38;
        camera.updateProjectionMatrix();
      }
      return;
    }
    let best = null, bestArea = 0;
    for (const slot of mobileSlots) {
      const r = slot.getBoundingClientRect();
      const visibleY = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
      const area = visibleY * Math.min(r.width, innerWidth);
      if (area > bestArea) { best = r; bestArea = area; }
    }
    canvas.style.visibility = bestArea > 0 ? 'visible' : 'hidden';
    if (!best) return;
    canvas.style.left = `${best.left}px`; canvas.style.top = `${best.top}px`;
    canvas.style.width = `${best.width}px`; canvas.style.height = `${best.height}px`;
    const w = Math.max(1, Math.round(best.width)), h = Math.max(1, Math.round(best.height));
    if (w !== renderWidth || h !== renderHeight) {
      renderWidth = w; renderHeight = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = 46;
      camera.updateProjectionMatrix();
    }
  }

  function measureScroll() {
    const y = scrollY + innerHeight * 0.35;
    const positions = stops.map(el => el.getBoundingClientRect().top + scrollY);
    if (y <= positions[0]) return 0;
    for (let i = 0; i < positions.length - 1; i++) {
      if (y < positions[i + 1]) return i + THREE.MathUtils.clamp((y - positions[i]) / Math.max(1, positions[i + 1] - positions[i]), 0, 1);
    }
    return shots.length - 1;
  }

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, w < 700 ? 1.5 : 2));
    // ORIGINAL (preserved, not deleted — disabled by comment): renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < 700 ? 48 : 38; camera.updateProjectionMatrix();
    layoutCanvas();
  }
  resize();
  addEventListener('resize', resize, { passive: true });
  addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse') {
      pointerX = (event.clientX / innerWidth - 0.5) * 2;
      pointerY = (event.clientY / innerHeight - 0.5) * 2;
    }
  }, { passive: true });
  lightControl.addEventListener('input', () => {
    lightValue = Number(lightControl.value) / 100;
    const hour = Math.round(6 + lightValue * 14);
    lightReadout.textContent = `${String(hour).padStart(2, '0')}:00`;
    manualLight = true;
  });
  addEventListener('scroll', () => { manualLight = false; }, { passive: true });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    document.body.classList.remove('world-ready');
    status.textContent = 'The 3D scene stopped. The story and install links still work.';
  });

  // ORIGINAL (preserved, not deleted — disabled by comment): const clock = new THREE.Clock(); let previous = 0;
  let previous = performance.now();
  let t = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    layoutCanvas();
    // ORIGINAL (preserved, not deleted — disabled by comment): const t = clock.getElapsedTime(); const dt = Math.min(0.05, Math.max(0, t - previous)); previous = t;
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0, (now - previous) / 1000));
    previous = now;
    t += dt;
    const k = reduced.matches ? 1 : 1 - Math.exp(-3.2 * dt);
    scrollState = THREE.MathUtils.lerp(scrollState, measureScroll(), k);
    const i = Math.min(shots.length - 2, Math.floor(scrollState));
    const f = THREE.MathUtils.smoothstep(scrollState - i, 0, 1);
    const a = shots[i], b = shots[i + 1];
    for (let axis = 0; axis < 3; axis++) {
      desiredPos.setComponent(axis, THREE.MathUtils.lerp(a.cam[axis], b.cam[axis], f));
      desiredAim.setComponent(axis, THREE.MathUtils.lerp(a.look[axis], b.look[axis], f));
    }
    if (innerWidth < 700) {
      // ORIGINAL (preserved, not deleted — disabled by comment): desiredPos.set(0, 2.5, 12.4); desiredAim.set(0, 2.6, 0);
      desiredPos.set(0, 2.7, 10.8);
      desiredAim.set(0, 0.55, 0);
    }
    pos.lerp(desiredPos, k);
    aim.lerp(desiredAim, k);
    camera.position.copy(pos);
    camera.lookAt(aim);
    const yaw = THREE.MathUtils.lerp(a.yaw, b.yaw, f);
    world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, yaw + (reduced.matches ? 0 : pointerX * 0.06), k);
    world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, reduced.matches ? 0 : pointerY * 0.025, k);
    world.position.y = reduced.matches ? 0 : Math.sin(t * 0.43) * 0.08;
    const energy = THREE.MathUtils.lerp(a.energy, b.energy, f);
    portalUniforms.uTime.value = reduced.matches ? 0 : t;
    portalUniforms.uEnergy.value = energy;
    portalRing.rotation.z = reduced.matches ? 0 : t * 0.08;
    portalRing.material.opacity = 0.6 + energy * 0.18;
    particles.rotation.y = reduced.matches ? 0 : t * 0.025;
    for (let j = 0; j < fragments.length; j++) {
      const shard = fragments[j];
      shard.position.y = shard.userData.base.y + (reduced.matches ? 0 : Math.sin(t * 0.6 + j) * 0.08);
      shard.rotation.y = reduced.matches ? 0 : t * (j % 2 ? 0.07 : -0.05);
    }
    const automaticLight = 0.32 + scrollState / (shots.length - 1) * 0.48;
    // ORIGINAL (preserved, not deleted — disabled by comment): const day = drag ? lightValue : THREE.MathUtils.lerp(lightValue, automaticLight, 1 - Math.exp(-0.3 * dt));
    const day = manualLight ? lightValue : THREE.MathUtils.lerp(lightValue, automaticLight, 1 - Math.exp(-0.3 * dt));
    // ORIGINAL (preserved, not deleted — disabled by comment): if (!drag) { lightValue = day; lightControl.value = String(Math.round(day * 100)); lightReadout.textContent = `${String(Math.round(6 + day * 14)).padStart(2, '0')}:00`; }
    if (!manualLight) { lightValue = day; lightControl.value = String(Math.round(day * 100)); lightReadout.textContent = `${String(Math.round(6 + day * 14)).padStart(2, '0')}:00`; }
    const sunAngle = day * Math.PI;
    key.position.set(Math.cos(sunAngle) * 6, 2.8 + Math.sin(sunAngle) * 5, 4);
    key.color.setHSL(0.075 + Math.sin(sunAngle) * 0.035, 0.62, 0.65);
    key.intensity = 2.7 + Math.sin(sunAngle) * 3.7;
    // ORIGINAL (preserved, not deleted — disabled by comment): ambient.intensity = 1.25 + Math.sin(sunAngle) * 1.3;
    ambient.intensity = 0.9 + Math.sin(sunAngle) * 0.8;
    inner.intensity = 8 + energy * 8 + (1 - Math.sin(sunAngle)) * 6;
    renderer.toneMappingExposure = THREE.MathUtils.lerp(a.exposure, b.exposure, f);
    renderer.render(scene, camera);
  }

  try {
    scrollState = measureScroll();
    const shot = shots[Math.min(shots.length - 1, Math.floor(scrollState))];
    pos.set(...shot.cam); aim.set(...shot.look);
    if (innerWidth < 700) { pos.set(0, 2.7, 10.8); aim.set(0, 0.55, 0); }
    camera.position.copy(pos); camera.lookAt(aim);
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
    document.body.classList.add('world-ready');
    status.textContent = '3D scene ready. Scroll to see it change; use the light control in the story.';
    frame();
  } catch {
    status.textContent = 'The 3D scene is unavailable. The story and install links still work.';
  }
}
