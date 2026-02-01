/* ==========================================================================
   LA VIEJA ESCUELA - JAVASCRIPT
   ========================================================================== */

// Menu Data
const menuData = {
  desayuno: [
    { name: "Combo La Vieja Escuela", desc: "Café o infusión + 2 medialunas o tortillas." },
    { name: "Combo Jarrito & Pastafrola", desc: "Café con leche en jarrito + porción de pastafrola." },
    { name: "Combo Tostado del Recreo", desc: "Café o infusión + tostado de jamón y queso." },
    { name: "Combo Power Brunch", desc: "Café o infusión + avocado toast con huevo poché." },
    { name: "Combo Dulce", desc: "Café o infusión + porción de budín." }
  ],
  cafe: [
    { name: "Café en Jarrito", desc: "Clásico intenso, servido corto." },
    { name: "Café Doble", desc: "Doble shot, más cuerpo." },
    { name: "Café con Leche", desc: "Equilibrado y cremoso." },
    { name: "Capuchino Clásico", desc: "Espuma sedosa, cacao arriba." },
    { name: "Latte", desc: "Leche texturizada, sabor suave." },
    { name: "Submarino", desc: "Cacao puro, cucharón al fondo." },
    { name: "Tés & Mate Cocido", desc: "Infusiones clásicas del patio." }
  ],
  dulce: [
    { name: "Medialunas de Manteca", desc: "Doradas y suaves." },
    { name: "Pastafrola Casera", desc: "Membrillo o batata." },
    { name: "Tarta de Ricota", desc: "Clásica, bien cremosa." },
    { name: "Roll de Canela", desc: "Glaseado justo." }
  ],
  salado: [
    { name: "Medialuna JyQ", desc: "Clásico de mostrador." },
    { name: "Tostado Jamón & Queso", desc: "Pan dorado y queso fundido." },
    { name: "Scon de Queso", desc: "Ideal para acompañar el café." }
  ],
  cantina: [
    { name: "Buñuelos de Acelga", desc: "Nubes fritas, crocantes." },
    { name: "Picada de Los Valles", desc: "Productos locales seleccionados." },
    { name: "Lengua a la Vinagreta 2.0", desc: "Versión afinada del clásico." },
    { name: "Croquetas de Osobuco", desc: "Bechamel perfecta." },
    { name: "Provoleta de la Huerta", desc: "Verduras y queso bien dorado." },
    { name: "Milanesa Napolitana", desc: "La institución del bodegón." },
    { name: "Pastel de Papas", desc: "Carne a cuchillo, costra gratinada." },
    { name: "Guiso de Lentejas", desc: "Temporada de invierno." },
    { name: "Tortelletti de Ternera", desc: "Pasta fresca, relleno intenso." },
    { name: "Hamburguesa Smash", desc: "Doble sello y queso." },
    { name: "Bondiola Braseada 6Hs", desc: "Pan de autor y jugosidad." },
    { name: "Chop Cheese de Bodega", desc: "Sabor de barrio." },
    { name: "Veggie Asado", desc: "Opción vegetal con carácter." },
    { name: "Neo-Criolla", desc: "Ensalada clásica, vuelta de tuerca." },
    { name: "Hojas Verdes, Remolacha & Azul", desc: "Texturas y contraste." },
    { name: "Tibia de Calabaza", desc: "Dulzor y tostado." }
  ]
};

// Highlights by day part
const highlights = {
  manana: {
    title: "Combo La Vieja Escuela",
    desc: "Café o infusión + 2 medialunas o tortillas."
  },
  tarde: {
    title: "Combo Jarrito & Pastafrola",
    desc: "Café con leche en jarrito + porción de pastafrola."
  },
  noche: {
    title: "Milanesa Napolitana",
    desc: "Clásico de bodegón, versión afinada."
  }
};

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const menuHighlight = document.getElementById("menuHighlight");
const siteHeader = document.getElementById("siteHeader");

/* --------------------------------------------------------------------------
   MENU RENDERING
   -------------------------------------------------------------------------- */
function renderMenu(category) {
  const items = menuData[category] || [];

  // Clear grid with fade
  menuGrid.style.opacity = "0";

  setTimeout(() => {
    menuGrid.innerHTML = items
      .map(
        (item, index) => `
          <div class="menu-item" style="animation-delay: ${index * 50}ms">
            <strong>${item.name}</strong>
            <span>${item.desc}</span>
          </div>
        `
      )
      .join("");

    // Fade in
    menuGrid.style.opacity = "1";

    // Animate items
    const menuItems = menuGrid.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 50);
    });
  }, 200);
}

function setHighlight(daypart) {
  const data = highlights[daypart];
  if (!data) return;

  const titleEl = menuHighlight.querySelector(".menu-highlight__title");
  const descEl = menuHighlight.querySelector(".menu-highlight__desc");

  // Animate out
  menuHighlight.style.transform = "scale(0.95)";
  menuHighlight.style.opacity = "0.5";

  setTimeout(() => {
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    // Animate in
    menuHighlight.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    menuHighlight.style.transform = "scale(1)";
    menuHighlight.style.opacity = "1";
  }, 150);
}

// Initialize menu
renderMenu("desayuno");

/* --------------------------------------------------------------------------
   TAB CONTROLS
   -------------------------------------------------------------------------- */
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderMenu(tab.dataset.category);
  });
});

const pills = document.querySelectorAll(".pill");
pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((p) => p.classList.remove("is-active"));
    pill.classList.add("is-active");
    setHighlight(pill.dataset.daypart);
  });
});

/* --------------------------------------------------------------------------
   SMOOTH SCROLL
   -------------------------------------------------------------------------- */
const scrollButtons = document.querySelectorAll("[data-scroll]");
scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

/* --------------------------------------------------------------------------
   HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;

  // Add scrolled class when scrolled past threshold
  if (currentScroll > 50) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
}

window.addEventListener("scroll", handleScroll, { passive: true });

/* --------------------------------------------------------------------------
   NOTIFY BUTTON HANDLERS
   -------------------------------------------------------------------------- */
function bindNotify(id) {
  const btn = document.getElementById(id);
  if (!btn) return;

  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector('input');
    const email = input ? input.value.trim() : '';

    if (email && email.includes('@')) {
      // Success state
      btn.textContent = "✓ Anotado";
      btn.disabled = true;
      btn.style.background = "linear-gradient(135deg, #166f85, #0f4f61)";
      btn.style.borderColor = "#166f85";

      if (input) {
        input.disabled = true;
        input.style.opacity = "0.5";
      }
    } else {
      // Error state
      btn.textContent = "Email inválido";
      btn.style.background = "#ed5c35";
      btn.style.borderColor = "#ed5c35";

      setTimeout(() => {
        btn.textContent = id === "notifyBtn" ? "Avisame" : "Sumarme";
        btn.style.background = "";
        btn.style.borderColor = "";
      }, 2000);
    }
  });
}

bindNotify("notifyBtn");
bindNotify("aulaBtn");

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER FOR ANIMATIONS
   -------------------------------------------------------------------------- */
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeInObserver.observe(section);
});

/* --------------------------------------------------------------------------
   DYNAMIC HERO PARALLAX
   -------------------------------------------------------------------------- */
const heroBackground = document.querySelector(".hero-background img");

if (heroBackground) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector(".hero").offsetHeight;

    if (scrolled < heroHeight) {
      const parallaxValue = scrolled * 0.4;
      heroBackground.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   PRELOAD CRITICAL IMAGES
   -------------------------------------------------------------------------- */
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

// Preload hero background
const heroImg = document.querySelector(".hero-background img");
if (heroImg && heroImg.src) {
  preloadImage(heroImg.src);
}

/* --------------------------------------------------------------------------
   INITIALIZE
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Remove loader if exists
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }

  // Add loaded class to body
  document.body.classList.add("loaded");

  // Initialize new features
  initCustomCursor();
  initHeroSlideshow();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (!cursorDot || !cursorRing || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let dotX = 0, dotY = 0;
  let angle = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth movement and rotation
  function animateCursor() {
    // Dot (Medialuna) followed with slight lag for smoothness
    const dx = mouseX - dotX;
    const dy = mouseY - dotY;

    dotX += dx * 0.2;
    dotY += dy * 0.2;

    // Calculate rotation based on movement speed/direction
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed > 1) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      angle += (targetAngle - angle) * 0.1;
    }

    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) rotate(${angle}deg)`;

    // Ring follows with more lag
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Click animation
  document.addEventListener('mousedown', () => {
    cursorDot.style.scale = '0.8';
    cursorRing.style.scale = '1.3';
    cursorRing.style.borderColor = 'var(--accent-light)';
  });

  document.addEventListener('mouseup', () => {
    cursorDot.style.scale = '1';
    cursorRing.style.scale = '1';
    cursorRing.style.borderColor = 'var(--accent)';
  });

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, .cuadro-card, .menu-item, .sticker, .tab, .pill');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}

/* --------------------------------------------------------------------------
   HERO SLIDESHOW
   -------------------------------------------------------------------------- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const intervalTime = 5000; // 5 seconds per slide

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
  }

  // Start slideshow
  setInterval(nextSlide, intervalTime);
}

/* --------------------------------------------------------------------------
   SCROLL REVEAL ANIMATIONS (Enhanced)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '-50px',
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

console.log("🏫 La Vieja Escuela — Neo‑Bodegón · Bar Café · Tucumán");
console.log("✨ UI Innovations loaded: VHS texture, custom cursor, slideshow, reveals");
