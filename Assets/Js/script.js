/* =====================================================
   3D HERO ORB — THREE.JS
   Author: Digitora
   Purpose: Landing Page Hero Background
===================================================== */

(function () {

  /* ---------- CONFIG ---------- */
  const CONFIG = {
    orbRotationSpeed: 0.007,
    ringRotationSpeed: 0.0015,
    cameraZ: 4
  };

  /* ---------- DOM ---------- */
  const container = document.getElementById('canvas3d');
  if (!container) return;

  /* ---------- RENDERER ---------- */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  /* ---------- SCENE & CAMERA ---------- */
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = CONFIG.cameraZ;

  /* ---------- LIGHTING ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const keyLight = new THREE.PointLight(0x3dd5ff, 1.2);
  keyLight.position.set(3, 2, 4);
  scene.add(keyLight);

  /* ---------- OBJECT GROUP ---------- */
  const group = new THREE.Group();
  scene.add(group);

  /* Orb */
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0b1520,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0x082a33,
      emissiveIntensity: 0.2
    })
  );
  group.add(orb);

  /* Ring */
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.16, 80, 200),
    new THREE.MeshStandardMaterial({
      color: 0x17c6d9,
      metalness: 0.5,
      roughness: 0.3
    })
  );
  ring.rotation.x = Math.PI * 0.22;
  group.add(ring);

  /* ---------- ANIMATION LOOP ---------- */
  function animate() {
    group.rotation.y += CONFIG.orbRotationSpeed;
    ring.rotation.z += CONFIG.ringRotationSpeed;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  /* ---------- RESIZE ---------- */
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

})();