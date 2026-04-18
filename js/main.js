// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

// ─── Typewriter typing effect ────────────────────────────────
function typeWriter(elementId, text, speed, onDone) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (onDone) onDone();
    }
  }, speed);
}

// Hero tagline — starts immediately on load
window.addEventListener('load', () => {
  setTimeout(() => {
    typeWriter(
      'typed-tagline',
      'Some voices are meant to be silenced.\nThis is the story of one that refused.',
      38
    );
  }, 600);
});

// Interlude quote — triggers when the section enters view
let interludeDone = false;
const interludeSection = document.querySelector('.typewriter-interlude');
const interludeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !interludeDone) {
      interludeDone = true;
      typeWriter(
        'interlude-text',
        '"The truth doesn\'t care if you\'re ready to hear it."',
        45
      );
    }
  });
}, { threshold: 0.4 });
if (interludeSection) interludeObserver.observe(interludeSection);

// Paper strip date
const dateEl = document.getElementById('paper-date');
if (dateEl) {
  const d = new Date();
  dateEl.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ─── Scroll reveal ───────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.book-text-side, .book-cover-side, .paper-strip, ' +
  '.author-text, .author-photo-wrap, ' +
  '.order-inner, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealTargets.forEach(el => revealObserver.observe(el));

// ─── Forms ───────────────────────────────────────────────────
document.getElementById('notifyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('orderSuccess').classList.add('show');
});

// ─── CAPTCHA ─────────────────────────────────────────────────
let captchaAnswer = 0;

function generateCaptcha() {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  const ops = [
    { label: `${a} + ${b}`, answer: a + b },
    { label: `${a + b} - ${b}`, answer: a },
    { label: `${a} \u00d7 ${b > 5 ? 2 : b}`, answer: a * (b > 5 ? 2 : b) },
  ];
  const chosen = ops[Math.floor(Math.random() * ops.length)];
  captchaAnswer = chosen.answer;
  const el = document.getElementById('captchaChallenge');
  if (el) el.textContent = chosen.label + ' =';
  const input = document.getElementById('captchaAnswer');
  if (input) input.value = '';
}

generateCaptcha();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('captchaAnswer');
  const error = document.getElementById('captchaError');
  if (parseInt(input.value, 10) !== captchaAnswer) {
    error.classList.add('visible');
    input.value = '';
    generateCaptcha();
    input.focus();
    return;
  }
  error.classList.remove('visible');
  this.style.display = 'none';
  document.getElementById('contactSuccess').classList.add('show');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
