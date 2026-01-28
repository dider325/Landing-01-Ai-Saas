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

const reveals = document.querySelectorAll(
  '.card, .step, .price, .faq div, .footer-grid > div'
);

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('show');
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

document.querySelectorAll('.btn,.footer-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.setProperty('--x',e.clientX-r.left+'px');
    btn.style.setProperty('--y',e.clientY-r.top+'px');
  });
});


document.querySelectorAll('.faq-item').forEach(item=>{
  item.addEventListener('click',()=>{
    item.classList.toggle('active');
  });
});


document.querySelectorAll(".faq-item").forEach(item=>{
  item.addEventListener("click",()=>{
    item.classList.toggle("active");
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.15});

document.querySelectorAll(".card, .step, .price, .faq-item")
  .forEach(el=>observer.observe(el));

  document.querySelectorAll(".faq-item").forEach(item=>{
  item.addEventListener("click",()=>{
    item.classList.toggle("active");
  });
});


const wrapper = document.querySelector(".gallery-wrapper");
const track = document.querySelector(".gallery-track");

let isTouching = false;

wrapper.addEventListener("touchstart", () => {
  isTouching = true;
  track.style.animationPlayState = "paused";
});

wrapper.addEventListener("touchmove", (e) => {
  wrapper.scrollLeft -= e.touches[0].clientX;
});

wrapper.addEventListener("touchend", () => {
  isTouching = false;
  track.style.animationPlayState = "running";
});









