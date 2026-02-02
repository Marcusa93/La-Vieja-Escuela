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
// Highlights by day part with suggested category
const highlights = {
  manana: {
    title: "Combo La Vieja Escuela",
    desc: "Café o infusión + 2 medialunas o tortillas.",
    category: "desayuno"
  },
  tarde: {
    title: "Combo Jarrito & Pastafrola",
    desc: "Café con leche en jarrito + porción de pastafrola.",
    category: "dulce"
  },
  noche: {
    title: "Milanesa Napolitana",
    desc: "Clásico de bodegón, versión afinada.",
    category: "cantina"
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

  // Update UI Tabs
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("is-active", t.dataset.category === category);
  });

  // Clear grid with fade
  menuGrid.style.opacity = "0";

  setTimeout(() => {
    if (items.length === 0) {
      // Empty state
      menuGrid.innerHTML = `
        <div class="empty-state">
          <p>No hay items disponibles por ahora.</p>
        </div>
      `;
    } else {
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
    }

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

function setHighlight(daypart, shouldUpdateUrl = true) {
  const data = highlights[daypart];
  if (!data) return;

  // Update Pills
  document.querySelectorAll(".pill").forEach(p => {
    p.classList.toggle("is-active", p.dataset.daypart === daypart);
  });

  const titleEl = menuHighlight.querySelector(".menu-highlight__title");
  const descEl = menuHighlight.querySelector(".menu-highlight__desc");

  // Animate card out
  menuHighlight.style.transform = "scale(0.98)";
  menuHighlight.style.opacity = "0.7";

  setTimeout(() => {
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    // Animate card in
    menuHighlight.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
    menuHighlight.style.transform = "scale(1)";
    menuHighlight.style.opacity = "1";
  }, 150);

  // Switch category if relevant
  if (data.category) {
    renderMenu(data.category);
  }

  // Update URL
  if (shouldUpdateUrl) {
    const url = new URL(window.location);
    url.searchParams.set("momento", daypart);
    window.history.pushState({}, "", url);
  }
}

// Initialize menu from URL or default
function initMenu() {
  const params = new URLSearchParams(window.location.search);
  const initialMoment = params.get("momento") || "manana";

  if (highlights[initialMoment]) {
    setHighlight(initialMoment, false);
  } else {
    setHighlight("manana", false);
  }
}

// Call init instead of direct render
initMenu();

/* --------------------------------------------------------------------------
   TAB CONTROLS
   -------------------------------------------------------------------------- */
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Manual category switch doesn't change "moment"
    renderMenu(tab.dataset.category);
  });
});

const pills = document.querySelectorAll(".pill");
pills.forEach((pill) => {
  pill.addEventListener("click", () => {
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
/* --------------------------------------------------------------------------
   HEADER SCROLL & SCROLL SPY
   -------------------------------------------------------------------------- */
let lastScroll = 0;
const siteHeaderEl = document.getElementById("siteHeader");

function handleScroll() {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    siteHeaderEl.classList.add("scrolled");
  } else {
    siteHeaderEl.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
}

window.addEventListener("scroll", handleScroll, { passive: true });

// Scroll Spy
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Active when section is near top
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Remove active from all
        navLinks.forEach(link => link.classList.remove("active"));

        // Add active to current
        const activeLink = document.querySelector(`.site-nav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

document.addEventListener("DOMContentLoaded", initScrollSpy);

/* --------------------------------------------------------------------------
   FORM HANDLERS
   -------------------------------------------------------------------------- */
function initEmailForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const input = form.querySelector("input[type='email']");
  const button = form.querySelector("button");
  const message = form.querySelector(".form-message");

  // Real-time validation
  input.addEventListener("input", () => {
    // Clear errors on type
    input.classList.remove("input-error");
    message.className = "form-message";
    message.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset states
    input.classList.remove("input-error", "input-success");
    message.className = "form-message";

    if (!emailRegex.test(email)) {
      // Error State
      input.classList.add("input-error");
      message.textContent = "Por favor, ingresá un email válido.";
      message.classList.add("error");
      input.focus();
      return;
    }

    // Success State (Simulated API call)
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Enviando...";

    setTimeout(() => {
      input.classList.add("input-success");
      message.textContent = "¡Gracias! Te avisaremos pronto.";
      message.classList.add("success");

      button.textContent = "✓ Listo";
      button.style.background = "var(--teal)";
      button.style.borderColor = "var(--teal)";
      button.style.color = "#fff";

      form.reset();
      input.disabled = true;
    }, 1500);
  });
}

initEmailForm("formProximamente");
initEmailForm("formAula");

/* --------------------------------------------------------------------------
   MAP ACTIONS
   -------------------------------------------------------------------------- */
function initMapActions() {
  const btnCopy = document.getElementById("btnCopyAddress");
  if (!btnCopy) return;

  btnCopy.addEventListener("click", () => {
    const address = btnCopy.dataset.address;

    navigator.clipboard.writeText(address).then(() => {
      const originalText = btnCopy.querySelector("span").textContent;
      btnCopy.querySelector("span").textContent = "¡Copiado!";
      btnCopy.classList.add("btn-primary");
      btnCopy.classList.remove("btn-outline");

      setTimeout(() => {
        btnCopy.querySelector("span").textContent = originalText;
        btnCopy.classList.remove("btn-primary");
        btnCopy.classList.add("btn-outline");
      }, 2000);
    }).catch(err => {
      console.error("Error al copiar: ", err);
    });
  });
}

initMapActions();

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
// Observe sections for fade-in animation
document.querySelectorAll(".section").forEach((section) => {
  // If section handles its own reveal, skip generic fade-in
  if (section.classList.contains("reveal")) return;

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
  initMobileMenu();
  initCustomCursor();
  initHeroSlideshow();
  initScrollReveal();
  initComicBubbles();
});

/* --------------------------------------------------------------------------
   MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.querySelector('.site-nav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-active');
    siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when clicking a link
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-active');
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

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

    // Smoother "floaty" feel
    dotX += dx * 0.15;
    dotY += dy * 0.15;

    // Calculate rotation based on movement speed/direction
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed > 1) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      // Smoother rotation interpolation
      angle += (targetAngle - angle) * 0.08;
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

/* --------------------------------------------------------------------------
   DECO HAND ANIMATIONS
   -------------------------------------------------------------------------- */
function initHandAnimations() {
  const hands = document.querySelectorAll('.deco-hand');
  if (!hands.length) return;

  // Observe parent SECTIONS, not the hands themselves
  // (Hands start off-screen so they never "intersect")
  const sectionsWithHands = new Set();
  hands.forEach(hand => {
    const section = hand.closest('section');
    if (section) sectionsWithHands.add(section);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Find all hands inside this section
      const handsInSection = entry.target.querySelectorAll('.deco-hand');
      handsInSection.forEach(hand => {
        if (entry.isIntersecting) {
          hand.classList.remove('hidden');
          hand.classList.add('active');
        } else {
          hand.classList.remove('active');
          hand.classList.add('hidden');
        }
      });
    });
  }, {
    threshold: 0.2, // Trigger when 20% of section is visible
    rootMargin: '0px'
  });

  sectionsWithHands.forEach(section => sectionObserver.observe(section));
}

/* --------------------------------------------------------------------------
   COMIC BUBBLES
   -------------------------------------------------------------------------- */
function initComicBubbles() {
  const cuadros = document.querySelectorAll('.cuadro-card');

  cuadros.forEach(cuadro => {
    // Create bubble element
    const bubble = document.createElement('div');
    bubble.classList.add('comic-bubble');
    bubble.textContent = cuadro.dataset.speech;
    cuadro.appendChild(bubble);

    // Handle click
    cuadro.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing immediately

      // Close other bubbles and remove active class from other cards
      document.querySelectorAll('.comic-bubble').forEach(b => {
        if (b !== bubble) {
          b.classList.remove('show');
          b.parentElement.classList.remove('has-bubble');
        }
      });

      // Toggle current
      bubble.classList.toggle('show');
      cuadro.classList.toggle('has-bubble');
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.comic-bubble').forEach(b => {
      b.classList.remove('show');
      b.parentElement.classList.remove('has-bubble');
    });
  });
}

console.log("🏫 La Vieja Escuela — Neo‑Bodegón · Bar Café · Tucumán");
console.log("✨ UI Innovations loaded: VHS texture, custom cursor, slideshow, reveals, comic bubbles");
