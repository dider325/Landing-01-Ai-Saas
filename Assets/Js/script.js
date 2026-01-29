/* =====================================================
   3D HERO ORB — THREE.JS
   Author: Digitora
   Purpose: Landing Page Hero Background
===================================================== */

/* =====================================================
   3D HERO ORB — THREE.JS (Theme Aware)
   Author: Digitora
===================================================== */

(function () {

  /* ---------- THEME HELPER ---------- */
  function isLightTheme() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

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
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0xffffff, 1.2);
  keyLight.position.set(3, 2, 4);
  scene.add(keyLight);

  /* ---------- OBJECT GROUP ---------- */
  const group = new THREE.Group();
  scene.add(group);

  /* ---------- ORB ---------- */
  const orbMaterial = new THREE.MeshStandardMaterial({});
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 64, 64),
    orbMaterial
  );
  group.add(orb);

  /* ---------- RING ---------- */
  const ringMaterial = new THREE.MeshStandardMaterial({});
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.16, 80, 200),
    ringMaterial
  );
  ring.rotation.x = Math.PI * 0.22;
  group.add(ring);

  /* ---------- THEME APPLY ---------- */
  function applyTheme() {
    const light = isLightTheme();

    // ORB
    orbMaterial.color.set(light ? 0xeaf2ff : 0x0b1520);
    orbMaterial.emissive.set(light ? 0x9ecbff : 0x082a33);
    orbMaterial.emissiveIntensity = light ? 0.35 : 0.2;
    orbMaterial.metalness = light ? 0.4 : 0.7;
    orbMaterial.roughness = light ? 0.45 : 0.25;

    // RING
    ringMaterial.color.set(light ? 0x4f8cff : 0x17c6d9);
    ringMaterial.metalness = light ? 0.35 : 0.5;
    ringMaterial.roughness = light ? 0.55 : 0.3;

    // LIGHT
    ambient.intensity = light ? 0.75 : 0.4;
    keyLight.intensity = light ? 0.9 : 1.2;
  }

  applyTheme(); // initial call

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

  /* ---------- THEME LISTENER ---------- */
  const observer = new MutationObserver(applyTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
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



// Gallery Section
/* =========================
   GALLERY AUTO SCROLL – FIXED FOR MOBILE
========================= */

const wrapper = document.getElementById('galleryWrapper');
const track   = document.getElementById('galleryTrack');

let autoScrollInterval = null;
let isUserInteracting = false;

/* ---------- AUTO SCROLL ---------- */
function startAutoScroll() {
  stopAutoScroll();

  if (window.innerWidth > 768) return;

  autoScrollInterval = setInterval(() => {
    if (isUserInteracting) return;

    wrapper.scrollLeft += 0.6;

    const maxScroll = track.scrollWidth - wrapper.clientWidth;
    if (wrapper.scrollLeft >= maxScroll) {
      wrapper.scrollLeft = 0;
    }
  }, 30);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

/* ---------- PAUSE / RESUME ---------- */
function pauseGallery() {
  isUserInteracting = true;
  track.style.animationPlayState = 'paused'; // 🔥 key fix
}

function resumeGallery() {
  setTimeout(() => {
    isUserInteracting = false;
    track.style.animationPlayState = 'running';
  }, 1200);
}

/* touch events (mobile) */
wrapper.addEventListener('touchstart', pauseGallery);
wrapper.addEventListener('touchend', resumeGallery);

/* mouse events (desktop safety) */
wrapper.addEventListener('mouseenter', pauseGallery);
wrapper.addEventListener('mouseleave', resumeGallery);

/* restart on resize */
window.addEventListener('resize', startAutoScroll);

/* init */
window.addEventListener('load', startAutoScroll);


 // --- THEME SWITCHER LOGIC ---
  const toggleBtn = document.getElementById('toggleMode');
  const html = document.documentElement;
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    toggleBtn.innerText = newTheme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });