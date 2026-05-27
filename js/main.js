// main.js – initializes the site

// Navigation toggle (hamburger)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// IntersectionObserver for scroll-triggered animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Add "in-view" to all sections that should animate
document.querySelectorAll('.section').forEach(section => {
  scrollObserver.observe(section);
});

// Initialize modules (they register themselves on load)
import './hero-scene.js';
import './globe-scene.js';
import './cards.js';
import './stats.js';
import './testimonials.js';
import './timeline.js';
import './animations.js';
