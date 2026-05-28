// ffcs.js – Advanced FFCS Planner

const FFCS_DATA = [
  { code: 'CSE1001', name: 'Problem Solving & OOP', credits: 5, slots: ['A1','L1'], color: '#2563eb' },
  { code: 'CSE1002', name: 'Data Structures', credits: 5, slots: ['B1','L3'], color: '#7c3aed' },
  { code: 'CSE2001', name: 'Operating Systems', credits: 4, slots: ['C1','L5'], color: '#06b6d4' },
  { code: 'CSE2002', name: 'Computer Networks', credits: 4, slots: ['D1','L7'], color: '#10b981' },
  { code: 'CSE3001', name: 'Database Management', credits: 4, slots: ['E1','L9'], color: '#f59e0b' },
  { code: 'CSE3002', name: 'Software Engineering', credits: 4, slots: ['F1','L11'], color: '#ef4444' },
  { code: 'MAT1001', name: 'Engineering Mathematics', credits: 5, slots: ['A2','L2'], color: '#8b5cf6' },
  { code: 'PHY1001', name: 'Engineering Physics', credits: 4, slots: ['B2','L4'], color: '#ec4899' },
  { code: 'CHE1001', name: 'Engineering Chemistry', credits: 4, slots: ['C2','L6'], color: '#14b8a6' },
  { code: 'MEE1001', name: 'Engineering Mechanics', credits: 4, slots: ['D2','L8'], color: '#f97316' },
  { code: 'EEE1001', name: 'Basic Electrical Engg', credits: 4, slots: ['E2','L10'], color: '#a3e635' },
  { code: 'CSE4001', name: 'Machine Learning', credits: 5, slots: ['G1','L13'], color: '#38bdf8' },
  { code: 'STS1001', name: 'Soft Skills I', credits: 2, slots: ['F2'], color: '#fbbf24' },
  { code: 'CHY1002', name: 'Environmental Sciences', credits: 3, slots: ['G2'], color: '#4ade80' }
];

// Simplified mapping matching actual FFCS Timetable
const SLOT_MAP = {
  A1: { days: [1,3], times: [0,1] }, A2: { days: [2,4], times: [0,1] },
  B1: { days: [1,3], times: [2,3] }, B2: { days: [2,4], times: [2,3] },
  C1: { days: [1,3], times: [4,5] }, C2: { days: [2,4], times: [4,5] },
  D1: { days: [2,4], times: [6,7] }, D2: { days: [1,3], times: [6,7] },
  E1: { days: [1,3], times: [3,4] }, E2: { days: [2,4], times: [3,4] },
  F1: { days: [1,5], times: [1,2] }, F2: { days: [2,4], times: [1,2] },
  G1: { days: [1,3], times: [5,6] }, G2: { days: [2,4], times: [5,6] },
  L1:  { days: [1], times: [0,1] }, L2:  { days: [2], times: [0,1] },
  L3:  { days: [3], times: [0,1] }, L4:  { days: [4], times: [0,1] },
  L5:  { days: [1], times: [2,3] }, L6:  { days: [2], times: [2,3] },
  L7:  { days: [3], times: [2,3] }, L8:  { days: [4], times: [2,3] },
  L9:  { days: [1], times: [4,5] }, L10: { days: [2], times: [4,5] },
  L11: { days: [3], times: [4,5] }, L12: { days: [4], times: [4,5] },
  L13: { days: [1], times: [6,7] },
};

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

let selectedCourses = [];
let timetable = Array.from({length: 5}, () => Array(8).fill(null));

function buildTimetableHTML() {
  const tbody = document.getElementById('timetable-body');
  if (!tbody) return;
  tbody.innerHTML = DAYS.map((day, di) =>
    `<tr>
      <td style="font-weight:700;color:#fff;font-size:0.75rem">${day}</td>
      ${timetable[di].map((cell, ti) =>
        `<td class="${cell ? 'occupied' : ''}" style="${cell ? 'background:' + cell.color + '22;color:' + cell.color + ';border-color:' + cell.color + '44' : ''}">${cell ? cell.short : ''}</td>`
      ).join('')}
    </tr>`
  ).join('');
}

function buildSelectedChips() {
  const el = document.getElementById('ffcs-selected-list');
  const credEl = document.getElementById('ffcs-credits');
  if (!el) return;
  const totalCredits = selectedCourses.reduce((s,c) => s + c.credits, 0);
  if (credEl) credEl.textContent = totalCredits;
  el.innerHTML = selectedCourses.map((c,i) =>
    `<div class="ffcs-chip" style="border-color:${c.color}44;color:${c.color};background:${c.color}18">
      ${c.code} – ${c.credits}cr
      <button onclick="removeCourse(${i})" title="Remove">✕</button>
    </div>`
  ).join('');
}

function checkConflict(course) {
  for (let slot of course.slots) {
    const map = SLOT_MAP[slot];
    if (!map) continue;
    for (let d of map.days) {
      for (let t of map.times) {
        if (d < 5 && t < 8 && timetable[d][t]) {
          return timetable[d][t].name;
        }
      }
    }
  }
  return null;
}

function addCourse(courseStr) {
  const course = JSON.parse(decodeURIComponent(courseStr));
  if (selectedCourses.find(c => c.code === course.code)) {
    showToast(`⚠️ ${course.code} is already added!`);
    return;
  }
  
  // Conflict detection
  const conflict = checkConflict(course);
  if (conflict) {
    showToast(`❌ Conflict detected! Slot clashes with ${conflict}.`);
    return;
  }

  const short = course.code.slice(-4);
  course.slots.forEach(slot => {
    const map = SLOT_MAP[slot];
    if (!map) return;
    map.days.forEach(d => {
      map.times.forEach(t => {
        if (d < 5 && t < 8) timetable[d][t] = { name: course.name, short, color: course.color };
      });
    });
  });
  
  selectedCourses.push(course);
  buildTimetableHTML();
  buildSelectedChips();
  document.getElementById('ffcs-results').innerHTML = '';
  document.getElementById('ffcs-search').value = '';
  
  showToast(`✅ ${course.code} added successfully!`);
}

function removeCourse(idx) {
  const course = selectedCourses[idx];
  for (let d = 0; d < 5; d++)
    for (let t = 0; t < 8; t++)
      if (timetable[d][t] && timetable[d][t].name === course.name)
        timetable[d][t] = null;
  selectedCourses.splice(idx, 1);
  buildTimetableHTML();
  buildSelectedChips();
  showToast(`🗑️ ${course.code} removed.`);
}

function clearFFCS() {
  selectedCourses = [];
  timetable = Array.from({length: 5}, () => Array(8).fill(null));
  buildTimetableHTML();
  buildSelectedChips();
  showToast(`🧹 Timetable cleared!`);
}

function searchFFCS() {
  const q = document.getElementById('ffcs-search').value.toLowerCase();
  const results = document.getElementById('ffcs-results');
  if (!results) return;
  if (!q) { results.innerHTML = ''; return; }
  const matches = FFCS_DATA.filter(c =>
    c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  ).slice(0, 8);
  
  results.innerHTML = matches.map(c =>
    `<div class="ffcs-result-item" onclick="addCourse('${encodeURIComponent(JSON.stringify(c))}')">
      <span>${c.code} – ${c.name}</span>
      <span style="color:var(--text-dim);font-size:.75rem">${c.credits} cr | ${c.slots.join(', ')}</span>
    </div>`
  ).join('');
}

// Toast notification system
function showToast(msg) {
  let toast = document.getElementById('toast-container');
  if(!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-container';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;';
    document.body.appendChild(toast);
  }
  
  const msgEl = document.createElement('div');
  msgEl.textContent = msg;
  msgEl.style.cssText = 'background:var(--glass-bg);color:#fff;padding:1rem 1.5rem;border-radius:12px;border:1px solid var(--glass-border);backdrop-filter:blur(10px);box-shadow:0 10px 30px rgba(0,0,0,0.5);transform:translateX(100%);transition:0.3s;font-size:0.9rem;';
  
  toast.appendChild(msgEl);
  setTimeout(() => msgEl.style.transform = 'translateX(0)', 10);
  
  setTimeout(() => {
    msgEl.style.transform = 'translateX(100%)';
    setTimeout(() => msgEl.remove(), 300);
  }, 3000);
}

// Export as JSON logic (Bonus feature for saving timetable)
function exportTimetable() {
  if (selectedCourses.length === 0) {
    showToast("⚠️ No courses to export!");
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedCourses));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "my_timetable.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  showToast("💾 Timetable exported successfully!");
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    buildTimetableHTML();
    buildSelectedChips();
  });
} else {
  buildTimetableHTML();
  buildSelectedChips();
}
