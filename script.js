/* ==========================================================================
   LA VIEJA ESCUELA - COMING SOON + TV GLITCH EFFECT
   ========================================================================== */

// Images to flash as glitch backgrounds (renders of the bar)
const glitchImages = [
  'Fotos antes - render/Render/35a57c5f-1818-4e81-bccd-b667b930b5d7.JPG',
  'Fotos antes - render/Render/5a3996c7-16c7-42a4-b557-c31fd666ed08.JPG',
  'Fotos antes - render/Render/7585144d-1501-488a-b4d2-fbd9a00e4af0.JPG',
  'Fotos antes - render/Render/b543a704-6247-4ea7-b522-3d9543b6b259.JPG',
  'Fotos antes - render/Render/daa1dec5-00a4-4446-9496-4a7a5fe5b39e.JPG',
  'Fotos antes - render/Render/fd565bbc-c5f5-4a63-afbf-7fc9df991f0e.JPG',
];

// Preload images
function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// TV Glitch Effect Controller
function initGlitchEffect() {
  const glitchImage = document.getElementById('glitchImage');
  const scanlines = document.querySelector('.glitch-bg__scanlines');
  const noise = document.querySelector('.glitch-bg__noise');
  const staticBar = document.getElementById('staticBar');
  const body = document.body;

  if (!glitchImage || !scanlines || !noise) return;

  // Preload all images
  preloadImages(glitchImages);

  // Random helper
  const rand = (min, max) => Math.random() * (max - min) + min;

  // Single flash: show image for a very short time (50-150ms)
  function singleFlash() {
    const randomImg = glitchImages[Math.floor(Math.random() * glitchImages.length)];
    glitchImage.style.backgroundImage = `url('${randomImg}')`;
    glitchImage.classList.add('is-flashing');
    scanlines.classList.add('is-active');
    noise.classList.add('is-active');
    body.classList.add('is-glitching');

    // Randomly trigger static bar sweep
    if (Math.random() > 0.4) {
      staticBar.style.top = '-5%';
      staticBar.classList.add('is-active');
      setTimeout(() => staticBar.classList.remove('is-active'), 120);
    }

    // Occasionally do a full white flash frame
    if (Math.random() > 0.7) {
      glitchImage.style.backgroundImage = 'none';
      glitchImage.style.backgroundColor = 'rgba(255,255,255,0.8)';
      setTimeout(() => {
        glitchImage.style.backgroundColor = 'transparent';
      }, 30);
    }

    // Flash duration: ultra short (50-150ms) like a broken TV
    const flashDuration = rand(50, 150);

    setTimeout(() => {
      glitchImage.classList.remove('is-flashing');
      scanlines.classList.remove('is-active');
      noise.classList.remove('is-active');
      body.classList.remove('is-glitching');
    }, flashDuration);
  }

  // Glitch burst: rapid sequence of 2-5 flashes
  function glitchBurst() {
    const burstCount = Math.floor(rand(2, 6));
    let delay = 0;

    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => singleFlash(), delay);
      delay += rand(80, 250); // Gap between flashes in a burst
    }
  }

  // Schedule random glitch bursts
  function scheduleNextGlitch() {
    // Wait 3-8 seconds between glitch bursts
    const waitTime = rand(1000, 2000);
    setTimeout(() => {
      glitchBurst();
      scheduleNextGlitch();
    }, waitTime);
  }

  // Start after a short delay (let page load first)
  setTimeout(() => {
    scheduleNextGlitch();
  }, 2000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  initGlitchEffect();
});

console.log('🏫 La Vieja Escuela — Próximamente en Marzo');
