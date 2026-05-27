// cards.js – Featured course cards
const COURSES = [
  { emoji: '🤖', tag: 'tag-cs', tagLabel: 'CS', title: 'Machine Learning A–Z', desc: 'Build ML models from scratch using Python, scikit-learn and TensorFlow.', level: 'Intermediate', hours: '42h', rating: '4.9' },
  { emoji: '🌐', tag: 'tag-cs', tagLabel: 'CS', title: 'Full-Stack Web Dev', desc: 'Master HTML, CSS, JavaScript, React, Node.js and MongoDB end-to-end.', level: 'Beginner', hours: '60h', rating: '4.8' },
  { emoji: '📊', tag: 'tag-data', tagLabel: 'Data', title: 'Data Science Bootcamp', desc: 'Pandas, NumPy, Matplotlib, Seaborn and real-world data analysis projects.', level: 'Intermediate', hours: '35h', rating: '4.9' },
  { emoji: '🔐', tag: 'tag-cs', tagLabel: 'CS', title: 'Cyber Security Essentials', desc: 'Ethical hacking, network security, cryptography and OWASP top 10.', level: 'Advanced', hours: '28h', rating: '4.7' },
  { emoji: '📐', tag: 'tag-math', tagLabel: 'Math', title: 'Linear Algebra for ML', desc: 'Vectors, matrices, eigenvalues and their applications in machine learning.', level: 'Intermediate', hours: '18h', rating: '4.8' },
  { emoji: '⚡', tag: 'tag-ee', tagLabel: 'EE', title: 'Circuit Analysis', desc: 'DC/AC analysis, Thevenin, Norton, phasors and filter design fundamentals.', level: 'Beginner', hours: '24h', rating: '4.6' },
];

function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  grid.innerHTML = COURSES.map(c => `
    <div class="card reveal">
      <div class="card-emoji">${c.emoji}</div>
      <span class="card-tag ${c.tag}">${c.tagLabel}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="card-meta">
        <span>📈 ${c.level}</span>
        <span>⏱ ${c.hours}</span>
        <span>⭐ ${c.rating}</span>
      </div>
      <a href="#" class="card-link">Enroll Now →</a>
    </div>
  `).join('');
}

renderCourses();
