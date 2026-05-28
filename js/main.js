/* main.js – initializes the site (non-module) */

// Navigation toggle (hamburger)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Reveal-on-scroll (matches CSS: .reveal.visible)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

try {
  const scrollObserver = new IntersectionObserver(revealOnScroll, observerOptions);

  // Only animate elements that are explicitly marked as reveal
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// Only animate elements that are explicitly marked as reveal
document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

// Ensure hero is visible immediately (prevents "blank" feeling)
const hero = document.getElementById('hero');
if (hero) hero.style.opacity = '1';
