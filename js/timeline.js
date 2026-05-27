// timeline.js – Learning path timeline
const TIMELINE = [
  { phase: 'PHASE 1 – FOUNDATION', title: '🧱 Build Core Skills', desc: 'Start with programming fundamentals, discrete math, and basic data structures. Complete 2–3 NPTEL courses.' },
  { phase: 'PHASE 2 – INTERMEDIATE', title: '⚙️ Deepen Your Knowledge', desc: 'Tackle OS, DBMS, Computer Networks. Use FFCS planner to balance subjects. Maintain CGPA above 8.5.' },
  { phase: 'PHASE 3 – SPECIALIZATION', title: '🚀 Choose Your Domain', desc: 'Pick ML/AI, Web Dev, Cyber Security, or Embedded Systems. Work on projects and get NPTEL certifications.' },
  { phase: 'PHASE 4 – PLACEMENT PREP', title: '💼 Land Your Dream Job', desc: 'Practice DSA daily, build a strong portfolio, solve PYQs, and apply to internships. Use our Placement Toolkit.' },
  { phase: 'PHASE 5 – LAUNCH', title: '🎓 Graduate & Grow', desc: 'Complete your degree with a strong CGPA, relevant certifications and real-world projects. You\'re ready!' },
];

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  container.innerHTML = TIMELINE.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="tl-phase">${item.phase}</div>
        <div class="tl-title">${item.title}</div>
        <div class="tl-desc">${item.desc}</div>
      </div>
    </div>
  `).join('');
}

renderTimeline();
