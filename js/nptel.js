// nptel.js – NPTEL courses data and render with filter
const NPTEL_COURSES = [
  { emoji: '💻', tag: 'tag-cs', cat: 'CS', title: 'Data Structures & Algorithms', inst: 'IIT Bombay', weeks: 8, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '🧠', tag: 'tag-cs', cat: 'CS', title: 'Deep Learning', inst: 'IIT Madras', weeks: 12, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '🗄️', tag: 'tag-cs', cat: 'CS', title: 'Database Management', inst: 'IIT Kharagpur', weeks: 8, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '📐', tag: 'tag-math', cat: 'Math', title: 'Mathematics for ML', inst: 'IIT Roorkee', weeks: 6, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '🔢', tag: 'tag-math', cat: 'Math', title: 'Probability & Statistics', inst: 'IISc Bangalore', weeks: 8, cert: false, link: 'https://nptel.ac.in' },
  { emoji: '⚡', tag: 'tag-ee', cat: 'EE', title: 'Power Systems', inst: 'IIT Delhi', weeks: 10, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '🔌', tag: 'tag-ee', cat: 'EE', title: 'Digital Electronics', inst: 'IIT Bombay', weeks: 8, cert: true, link: 'https://nptel.ac.in' },
  { emoji: '⚙️', tag: 'tag-mech', cat: 'Mech', title: 'Engineering Mechanics', inst: 'IIT Madras', weeks: 8, cert: false, link: 'https://nptel.ac.in' },
  { emoji: '🌡️', tag: 'tag-mech', cat: 'Mech', title: 'Thermodynamics', inst: 'IIT Kharagpur', weeks: 10, cert: true, link: 'https://nptel.ac.in' },
];

let currentFilter = 'all';

function renderNPTEL(filter) {
  const grid = document.getElementById('nptelGrid');
  if (!grid) return;
  const list = filter === 'all' ? NPTEL_COURSES : NPTEL_COURSES.filter(c => c.cat === filter);
  grid.innerHTML = list.map(c => `
    <div class="card reveal">
      <div class="card-emoji">${c.emoji}</div>
      <span class="card-tag ${c.tag}">${c.cat}</span>
      <h3>${c.title}</h3>
      <p>Offered by <strong style="color:#fff">${c.inst}</strong>${c.cert ? ' • 🏅 NPTEL Certificate' : ''}</p>
      <div class="card-meta">
        <span>📅 ${c.weeks} weeks</span>
        <span>${c.cert ? '✅ Certified' : '📖 Audit'}</span>
      </div>
      <a href="${c.link}" target="_blank" class="card-link">View Course →</a>
    </div>
  `).join('');
  observeReveal();
}

function filterNPTEL(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNPTEL(cat);
}

renderNPTEL('all');
