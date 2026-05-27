// testimonials.js – Render testimonial cards
const TESTIMONIALS = [
  { emoji: '👨‍💻', name: 'Arjun Sharma', role: 'CSE Final Year, VIT Vellore', stars: 5, quote: 'The FFCS planner saved me so much stress during course registration. I planned my entire semester in minutes instead of hours!' },
  { emoji: '👩‍🔬', name: 'Priya Nair', role: 'ECE 3rd Year, VIT Chennai', stars: 5, quote: 'The CGPA calculator is incredibly accurate. I finally know exactly what GPA I need in my last semester to hit my target. Game changer!' },
  { emoji: '🧑‍💼', name: 'Rohan Mehta', role: 'IT 2nd Year, VIT Bhopal', stars: 5, quote: 'NPTEL courses listed here helped me score extra credits and land an internship. Best platform for VIT students!' },
  { emoji: '👩‍🎓', name: 'Sneha Reddy', role: 'AIDS Final Year, VIT Vellore', stars: 4, quote: 'Everything in one place. No more jumping between 10 different websites to find tools and resources. Absolutely love it!' },
  { emoji: '🧑‍🚀', name: 'Aditya Kumar', role: 'MTECH CSE, VIT Vellore', stars: 5, quote: 'The PYQ section and placement resources are really helpful. The 3D design is also mind-blowing — feels very premium!' },
  { emoji: '👩‍💻', name: 'Kavya Menon', role: 'CSE 3rd Year, VIT AP', stars: 5, quote: 'I recommended this to my entire class. The GPA converter and CGPA planner alone are worth bookmarking. Thank you EduHub!' },
];

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card reveal">
      <div class="t-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="t-quote">"${t.quote}"</p>
      <div class="t-author">
        <div class="t-avatar">${t.emoji}</div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function goToSlide(idx) {
  document.querySelectorAll('.nav-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

renderTestimonials();
