// nptel.js - Native Course Browser using Extracted JSON Data

let allCourses = [];
let activeFilter = 'All';

// Init
document.addEventListener('DOMContentLoaded', async () => {
  setupFilters();
  await fetchCourses();
});

async function fetchCourses() {
  try {
    const res = await fetch('./js/nptel-database.json');
    if(!res.ok) throw new Error("Failed to load JSON");
    allCourses = await res.json();
    renderCourses();
  } catch (error) {
    console.error("Error loading NPTEL data:", error);
    document.getElementById('course-grid').innerHTML = `
      <div style="color:#ef4444; text-align:center; grid-column: 1 / -1;">
        Failed to load course database. Please ensure you are running on a local server.
      </div>`;
  }
}

function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilter = e.target.dataset.filter;
      renderCourses();
    });
  });
}

function renderCourses() {
  const grid = document.getElementById('course-grid');
  const query = document.getElementById('nptel-search').value.toLowerCase();
  
  if(!grid) return;

  const filtered = allCourses.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.cat === activeFilter;
    const matchesSearch = c.title.toLowerCase().includes(query) || c.inst.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if(filtered.length === 0) {
    grid.innerHTML = '<div style="color:var(--text-dim); text-align:center; grid-column: 1 / -1; padding: 3rem;">No courses found matching your criteria.</div>';
    return;
  }

  grid.innerHTML = filtered.map(c => `
    <div class="course-card reveal">
      <span class="course-tag ${c.tag}">${c.cat}</span>
      <h3 class="course-title">${c.title}</h3>
      <div class="course-inst">${c.inst}</div>
      
      <div class="course-stats">
        <div class="stat-item">
          <span class="stat-label">Duration</span>
          <span class="stat-value">${c.weeks} Weeks</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Exam Date</span>
          <span class="stat-value">${c.examDate}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Materials</span>
          <span class="stat-value">${c.materialsCount} Docs</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Questions</span>
          <span class="stat-value">${c.questionsCount} Qs</span>
        </div>
      </div>
      
      <div class="action-bar">
        <a href="${c.hasPYQ ? c.pyqLink : '#'}" class="action-btn btn-pyq ${!c.hasPYQ ? 'disabled' : ''}" onclick="${!c.hasPYQ ? 'event.preventDefault()' : ''}">
          ${c.hasPYQ ? 'View PYQs' : 'No PYQs Yet'}
        </a>
      </div>
    </div>
  `).join('');
  
  // Re-trigger reveal animation for newly added elements
  setTimeout(() => {
    document.querySelectorAll('.course-card').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 50);
}
