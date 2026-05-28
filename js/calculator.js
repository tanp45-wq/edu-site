// calculator.js – Complete VITrendz Replica Logic

let semesters = [];
let semCount = 0;

function switchMainTab(tab) {
  document.getElementById('cgpa-section').style.display = tab === 'cgpa' ? '' : 'none';
  document.getElementById('target-section').style.display = tab === 'target' ? '' : 'none';
  document.getElementById('converter-section').style.display = tab === 'converter' ? '' : 'none';
  
  document.querySelectorAll('.calc-tabs .calc-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
}

/* ───── Semester-Wise CGPA Calculator ───── */
function addSemester() {
  semCount++;
  const semId = semCount;
  semesters.push({ id: semId, subjects: [Date.now()] });
  renderSemesters();
}

function removeSemester(semId) {
  semesters = semesters.filter(s => s.id !== semId);
  renderSemesters();
  computeOverall();
}

function addSubject(semId) {
  const sem = semesters.find(s => s.id === semId);
  if(sem) sem.subjects.push(Date.now());
  renderSemesters();
}

function removeSubject(semId, subId) {
  const sem = semesters.find(s => s.id === semId);
  if(sem) sem.subjects = sem.subjects.filter(id => id !== subId);
  renderSemesters();
  computeOverall();
}

function renderSemesters() {
  const container = document.getElementById('semesters-container');
  if(!container) return;
  
  container.innerHTML = semesters.map((sem, index) => `
    <div class="semester-block" id="sem-${sem.id}">
      <div class="sem-header">
        <div class="sem-title">Semester ${index + 1}</div>
        <div style="display:flex; gap:1rem; align-items:center;">
          <div class="sem-sgpa" id="sgpa-${sem.id}">SGPA: 0.00</div>
          <button class="del-sem" onclick="removeSemester(${sem.id})">✕</button>
        </div>
      </div>
      <div id="subs-${sem.id}">
        ${sem.subjects.map(subId => `
          <div class="subject-row">
            <input type="text" class="calc-input" placeholder="Subject (Optional)" />
            <input type="number" class="calc-input cr-${sem.id}" placeholder="Credits" min="1" max="10" oninput="computeOverall()" />
            <select class="calc-input gr-${sem.id}" onchange="computeOverall()">
              <option value="10">S (10)</option>
              <option value="9">A (9)</option>
              <option value="8">B (8)</option>
              <option value="7">C (7)</option>
              <option value="6">D (6)</option>
              <option value="5">E (5)</option>
              <option value="0">F (0)</option>
              <option value="0">N (0)</option>
            </select>
            <button class="remove-row" onclick="removeSubject(${sem.id}, ${subId})">✕</button>
          </div>
        `).join('')}
      </div>
      <button class="add-btn" onclick="addSubject(${sem.id})">+ Add Subject</button>
    </div>
  `).join('');
}

function computeOverall() {
  let totalPoints = 0;
  let totalCredits = 0;

  semesters.forEach(sem => {
    let semPoints = 0;
    let semCredits = 0;
    
    const crInputs = document.querySelectorAll(`.cr-${sem.id}`);
    const grInputs = document.querySelectorAll(`.gr-${sem.id}`);
    
    for(let i=0; i<crInputs.length; i++) {
      const cr = parseFloat(crInputs[i].value) || 0;
      const gr = parseFloat(grInputs[i].value) || 0;
      semPoints += cr * gr;
      semCredits += cr;
    }
    
    const sgpaEl = document.getElementById(`sgpa-${sem.id}`);
    if(sgpaEl) {
      sgpaEl.textContent = semCredits > 0 ? \`SGPA: ${(semPoints / semCredits).toFixed(2)}\` : "SGPA: 0.00";
    }

    totalPoints += semPoints;
    totalCredits += semCredits;
  });

  const finalEl = document.getElementById('final-cgpa');
  const finalCrEl = document.getElementById('final-credits');
  
  if(finalEl) {
    finalEl.textContent = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  }
  if(finalCrEl) {
    finalCrEl.textContent = \`Total Credits: ${totalCredits}\`;
  }
}

/* ───── Required GPA Calculator ───── */
function computeRequired() {
  const cur = parseFloat(document.getElementById('current-cgpa')?.value) || 0;
  const comp = parseFloat(document.getElementById('completed-credits')?.value) || 0;
  const target = parseFloat(document.getElementById('target-cgpa')?.value) || 0;
  const rem = parseFloat(document.getElementById('remaining-credits')?.value) || 0;
  const out = document.getElementById('required-gpa');
  const advice = document.getElementById('gpa-advice');

  if (!out) return;

  if (rem === 0 || comp + rem === 0) { out.textContent = '--'; return; }
  const needed = ((target * (comp + rem)) - (cur * comp)) / rem;
  if (!isFinite(needed)) { out.textContent = '--'; return; }

  if (needed < 0) {
    out.textContent = 'Done!';
    if(advice) { advice.textContent = 'Already achieved!'; advice.style.color = '#34d399'; }
    return;
  }
  if (needed > 10) {
    out.textContent = 'N/A';
    if(advice) { advice.textContent = 'Not mathematically possible.'; advice.style.color = '#f87171'; }
    return;
  }

  out.textContent = needed.toFixed(2);
  if(advice) {
    if (needed <= 7) { advice.textContent = 'Very achievable!'; advice.style.color = '#34d399'; }
    else if (needed <= 8.5) { advice.textContent = 'Challenging but doable.'; advice.style.color = '#fbbf24'; }
    else { advice.textContent = 'Very tough — push your limits!'; advice.style.color = '#f87171'; }
  }
}

/* ───── GPA ↔ Percentage Converter ───── */
function switchConvTab(tab) {
  document.getElementById('gpa-to-pct').style.display = tab === 'gpa' ? '' : 'none';
  document.getElementById('pct-to-gpa').style.display = tab === 'pct' ? '' : 'none';
  document.getElementById('tab-gpa').classList.toggle('active', tab === 'gpa');
  document.getElementById('tab-pct').classList.toggle('active', tab === 'pct');
}

function convertGPA() {
  const gpa = parseFloat(document.getElementById('input-gpa')?.value);
  const out = document.getElementById('output-pct');
  if(!out) return;
  if(isNaN(gpa) || gpa < 0 || gpa > 10) { out.textContent = '--'; return; }
  out.textContent = Math.max(0, ((gpa - 0.5) * 10)).toFixed(1) + '%';
}

function convertPct() {
  const pct = parseFloat(document.getElementById('input-pct')?.value);
  const out = document.getElementById('output-gpa');
  if(!out) return;
  if(isNaN(pct) || pct < 0 || pct > 100) { out.textContent = '--'; return; }
  out.textContent = Math.min(10, (pct / 10 + 0.5)).toFixed(2);
}

// Init one semester
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('cgpa-section')) addSemester();
  });
} else {
  if(document.getElementById('cgpa-section')) addSemester();
}
