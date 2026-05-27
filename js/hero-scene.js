// hero-scene.js – Three.js animated hero background
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const pt1 = new THREE.PointLight(0x2563eb, 3, 20);
  pt1.position.set(5, 5, 5);
  scene.add(pt1);
  const pt2 = new THREE.PointLight(0x7c3aed, 2, 20);
  pt2.position.set(-5, -3, 3);
  scene.add(pt2);

  // Shared material
  const mat = (color) => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.6,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
    wireframe: false
  });

  // Floating shapes
  const shapes = [
    { geo: new THREE.IcosahedronGeometry(1.2, 1), color: 0x2563eb, pos: [-3, 1.5, -2], speed: [0.006, 0.004, 0] },
    { geo: new THREE.TorusGeometry(0.9, 0.35, 16, 60), color: 0x7c3aed, pos: [3, -1, -1], speed: [0.003, 0.007, 0.002] },
    { geo: new THREE.OctahedronGeometry(0.8), color: 0x06b6d4, pos: [2.5, 2, -3], speed: [0.008, 0.003, 0.005] },
    { geo: new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8), color: 0x3b82f6, pos: [-2.5, -2, -1], speed: [0.004, 0.006, 0.003] },
    { geo: new THREE.DodecahedronGeometry(0.6), color: 0xa78bfa, pos: [0, 3, -4], speed: [0.007, 0.002, 0.004] },
  ];

  const meshes = shapes.map(s => {
    const mesh = new THREE.Mesh(s.geo, mat(s.color));
    mesh.position.set(...s.pos);
    mesh.userData.speed = s.speed;
    scene.add(mesh);
    return mesh;
  });

  // Mouse parallax
  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Animate
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    meshes.forEach((m, i) => {
      m.rotation.x += m.userData.speed[0];
      m.rotation.y += m.userData.speed[1];
      m.rotation.z += m.userData.speed[2];
      m.position.y += Math.sin(t + i) * 0.003;
    });
    camera.position.x += (mx * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-my * 0.5 - camera.position.y) * 0.05;
    renderer.render(scene, camera);
  }
  animate();
})();
