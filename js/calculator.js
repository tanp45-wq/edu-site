// calculator.js – All calculator logic: CGPA, Required GPA, GPA converter

/* ───── Instant CGPA Calculator ───── */
function addSubject() {
  const list = document.getElementById('subjects-list');
  if (!list) return;
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.innerHTML = `
    <input type="text" class="calc-input subject-name" placeholder="Subject name" />
    <input type="number" class="calc-input subject-credits" placeholder="Credits" min="1" max="10" oninput="computeCGPA()" />
    <select class="calc-input subject-grade" onchange="computeCGPA()">
      <option value="10">O (10)</option>
      <option value="9">A+ (9)</option>
      <option value="8">A (8)</option>
      <option value="7">B+ (7)</option>
      <option value="6">B (6)</option>
      <option value="5">C (5)</option>
      <option value="0">F (0)</option>
    </select>
    <button class="remove-row" onclick="removeSubject(this)">✕</button>
  `;
  list.appendChild(row);
}

function removeSubject(btn) {
  btn.closest('.subject-row').remove();
  computeCGPA();
}

function normalizeVITGradeToPoints(value) {
  // Accept either numeric points already, or letter-style keys from UI.
  // Required mapping (task): S=10, A=9, B=8, C=7, D=6, E=5, F=0
  const v = String(value ?? '').trim();

  // If numeric, treat as already point value (current UI uses 10/9/8/7/6/5/0)
  if (v !== '' && !Number.isNaN(Number(v))) return Number(v);

  const map = {
    'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0,
    // Also support common alternatives seen in the current HTML UI
    'O': 10, 'A+': 9, 'A1': 9,
    'B+': 8, // if present as label elsewhere
    'APLUS': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'E': 5,
    'F0': 0
  };

  // Normalize a bit
  const key = v.toUpperCase().replace(/\s+/g, '');
  if (map[key] !== undefined) return map[key];

  // Fallback
  return 0;
}

function computeCGPA() {
  const rows = document.querySelectorAll('#subjects-list .subject-row');
  let totalPoints = 0, totalCredits = 0;

  rows.forEach(row => {
    const credits = parseFloat(row.querySelector('.subject-credits').value) || 0;
    const gradeRaw = row.querySelector('.subject-grade')?.value;

    // Current HTML uses numeric strings like "10", "9", ....
    // This normalizer supports either numeric or letter keys.
    const gradePoints = normalizeVITGradeToPoints(gradeRaw);

    totalPoints += credits * gradePoints;
    totalCredits += credits;
  });

  const out = document.getElementById('cgpa-output');
  if (out) out.textContent = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '--';
}

/* ───── Required GPA Calculator ───── */
function computeRequired() {
  const cur = parseFloat(document.getElementById('current-cgpa')?.value) || 0;
  const comp = parseFloat(document.getElementById('completed-credits')?.value) || 0;
  const target = parseFloat(document.getElementById('target-cgpa')?.value) || 0;
  const rem = parseFloat(document.getElementById('remaining-credits')?.value) || 0;
  const out = document.getElementById('required-gpa');
  const meter = document.getElementById('gpa-meter');
  const bar = document.getElementById('meter-bar');
  const advice = document.getElementById('gpa-advice');

  if (!out) return;

  if (rem === 0 || comp + rem === 0) {
    out.textContent = '--';
    if (meter) meter.style.display = 'none';
    return;
  }

  const needed = ((target * (comp + rem)) - (cur * comp)) / rem;

  if (!isFinite(needed)) { out.textContent = '--'; return; }

  if (needed < 0) {
    out.textContent = '✅ Already achieved!';
    out.style.fontSize = '1.2rem';
    if (advice) { advice.textContent = 'You have already reached your target CGPA!'; advice.style.color = '#34d399'; }
    if (meter) meter.style.display = 'none';
    return;
  }

  if (needed > 10) {
    out.textContent = '❌ Not Possible';
    out.style.fontSize = '1.2rem';
    if (advice) { advice.textContent = 'Target is not achievable with remaining credits.'; advice.style.color = '#f87171'; }
    if (meter) meter.style.display = 'none';
    return;
  }

  out.textContent = needed.toFixed(2);
  out.style.fontSize = '2.5rem';
  const pct = (needed / 10) * 100;
  if (meter) {
    meter.style.display = 'block';
    bar.style.width = pct + '%';
    bar.style.background = needed <= 7 ? '#34d399' : needed <= 8.5 ? '#fbbf24' : '#f87171';
  }
  if (advice) {
    if (needed <= 7) { advice.textContent = '😊 Very achievable! Keep it up.'; advice.style.color = '#34d399'; }
    else if (needed <= 8.5) { advice.textContent = '💪 Challenging but doable. Focus!'; advice.style.color = '#fbbf24'; }
    else { advice.textContent = '🔥 Very tough — push your limits!'; advice.style.color = '#f87171'; }
  }
}

/* ───── GPA ↔ Percentage Converter ───── */
function switchTab(tab) {
  const gpaDiv = document.getElementById('gpa-to-pct');
  const pctDiv = document.getElementById('pct-to-gpa');
  const tabGpa = document.getElementById('tab-gpa');
  const tabPct = document.getElementById('tab-pct');
  if (tab === 'gpa') {
    gpaDiv.style.display = ''; pctDiv.style.display = 'none';
    tabGpa.classList.add('active'); tabPct.classList.remove('active');
  } else {
    gpaDiv.style.display = 'none'; pctDiv.style.display = '';
    tabPct.classList.add('active'); tabGpa.classList.remove('active');
  }
}

function convertGPA() {
  const gpa = parseFloat(document.getElementById('input-gpa')?.value);
  const out = document.getElementById('output-pct');
  if (!out) return;
  if (isNaN(gpa) || gpa < 0 || gpa > 10) { out.textContent = '--'; return; }
  // VIT formula: percentage = (GPA - 0.5) * 10
  out.textContent = Math.max(0, ((gpa - 0.5) * 10)).toFixed(1) + '%';
}

function convertPct() {
  const pct = parseFloat(document.getElementById('input-pct')?.value);
  const out = document.getElementById('output-gpa');
  if (!out) return;
  if (isNaN(pct) || pct < 0 || pct > 100) { out.textContent = '--'; return; }
  out.textContent = Math.min(10, (pct / 10 + 0.5)).toFixed(2);
}
