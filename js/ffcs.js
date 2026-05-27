// ffcs.js – FFCS Course Planner
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
];

// Slot-to-timetable mapping (simplified VIT-style)
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
const TIMES_LABELS = ['8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4'];

let selectedCourses = [];
// timetable[day][time] = {name, short, color}
let timetable = Array.from({ length: 5 }, () => Array(8).fill(null));

// Slot clash state
let lastClashEl = null;

function animateClashWarning(message) {
  // Create/reuse a floating warning element
  let el = lastClashEl;
  if (!el) {
    el = document.createElement('div');
    el.id = 'slot-clash-warning';
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '96px';
    el.style.transform = 'translateX(-50%)';
    el.style.zIndex = '2000';
    el.style.padding = '12px 16px';
    el.style.borderRadius = '14px';
    el.style.background = 'rgba(239,68,68,0.15)';
    el.style.border = '1px solid rgba(239,68,68,0.5)';
    el.style.color = '#fecaca';
    el.style.fontWeight = '700';
    el.style.fontSize = '0.95rem';
    el.style.boxShadow = '0 0 0 6px rgba(239,68,68,0.12), 0 18px 60px rgba(0,0,0,0.45)';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.style.transition = 'opacity 180ms ease, transform 180ms ease';
    el.style.backdropFilter = 'blur(10px)';
    el.style.webkitBackdropFilter = 'blur(10px)';
    document.body.appendChild(el);
    lastClashEl = el;
  }

  el.textContent = message;

  // Neon pulse via box-shadow
  const start = () => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
    el.style.boxShadow = '0 0 0 6px rgba(239,68,68,0.16), 0 18px 60px rgba(0,0,0,0.45)';
  };
  const end = () => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(-6px)';
  };

  end();
  // ensure style recalculated
  requestAnimationFrame(() => {
    start();
    setTimeout(end, 1200);
  });
}

function buildTimetableHTML() {
  const tbody = document.getElementById('timetable-body');
  if (!tbody) return;

  tbody.innerHTML = DAYS.map((day, di) => {
    return `<tr>
      <td style="font-weight:700;color:#fff;font-size:0.75rem">${day}</td>
      ${timetable[di].map((cell) => {
        const cls = cell ? 'occupied' : '';
        const bg = cell ? `background:${cell.color}22;color:${cell.color};border-color:${cell.color}44` : '';
        return `<td class="${cls}" style="${bg}">${cell ? cell.short : ''}</td>`;
      }).join('')}
    </tr>`;
  }).join('');
}

function canPlaceCourse(course) {
  // returns {ok:boolean, clashes:[{dayIndex,timeIndex}...]}
  const clashes = [];
  const short = course.code.slice(-4);
  for (const slot of course.slots) {
    const map = SLOT_MAP[slot];
    if (!map) continue;

    for (const d of map.days) {
      for (const t of map.times) {
        if (d < 5 && t < 8) {
          if (timetable[d][t]) clashes.push({ d, t, existing: timetable[d][t] });
        }
      }
    }
  }

  return { ok: clashes.length === 0, clashes, short };
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

function addCourse(course) {
  if (selectedCourses.find(c => c.code === course.code)) return;

  const placement = canPlaceCourse(course);
  if (!placement.ok) {
    animateClashWarning(`⚠️ Slot Clash Conflict! ${course.code} overlaps another course.`);
    return;
  }

  const short = placement.short;

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
}


function removeCourse(idx) {
  const course = selectedCourses[idx];
  // Clear cells
  for (let d = 0; d < 5; d++)
    for (let t = 0; t < 8; t++)
      if (timetable[d][t] && timetable[d][t].name === course.name)
        timetable[d][t] = null;
  selectedCourses.splice(idx, 1);
  buildTimetableHTML();
  buildSelectedChips();
}

function clearFFCS() {
  selectedCourses = [];
  timetable = Array.from({length: 5}, () => Array(8).fill(null));
  buildTimetableHTML();
  buildSelectedChips();
}

function searchFFCS() {
  const q = document.getElementById('ffcs-search').value.toLowerCase();
  const results = document.getElementById('ffcs-results');
  if (!results) return;
  if (!q) { results.innerHTML = ''; return; }
  const matches = FFCS_DATA.filter(c =>
    c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  ).slice(0, 6);
  results.innerHTML = matches.map(c =>
    `<div class="ffcs-result-item" onclick='addCourse(${JSON.stringify(c)})'>
      <span>${c.code} – ${c.name}</span>
      <span style="color:var(--text-dim);font-size:.75rem">${c.credits} cr | ${c.slots.join(', ')}</span>
    </div>`
  ).join('');
}

// Init
buildTimetableHTML();
buildSelectedChips();
