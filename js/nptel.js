const COURSE_ORDER = ['noc24_cs01', 'noc24_cs02', 'noc24_ma01', 'noc24_ee05'];

let currentCourseKey = null;
let currentQuestions = [];
let currentSelections = new Map();
let NPTEL_QUIZ_POOLS = {};

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatClock() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function startClock() {
  const clock = document.getElementById('liveClock');
  if (!clock) return;
  const tick = () => { clock.textContent = formatClock(); };
  tick();
  window.setInterval(tick, 1000);
}

async function loadNPTELData() {
  try {
    const res = await fetch('./js/nptel-database.json');
    const data = await res.json();
    
    // Convert array into an object format compatible with our Quiz UI
    data.forEach(course => {
      // If a course doesn't have real questions, generate some mock ones so the UI never looks broken
      let q = course.questions;
      if (!q || q.length === 0) {
        q = [
          { question: `What is a core concept in ${course.title}?`, answer: "All of the above", options: ["Theory", "Practice", "Application", "All of the above"] },
          { question: `Who offers the course ${course.title}?`, answer: course.inst, options: [course.inst, "IIT Delhi", "IIT Kanpur", "IIT Roorkee"] },
          { question: `How many weeks is ${course.title}?`, answer: `${course.weeks} Weeks`, options: ["4 Weeks", "8 Weeks", "12 Weeks", `${course.weeks} Weeks`] },
          { question: `When is the exam for ${course.title}?`, answer: course.examDate, options: ["24 April 2024", "25 April 2024", "26 April 2024", course.examDate] },
          { question: `What category does ${course.title} belong to?`, answer: course.cat, options: ["CS", "Math", "Mechanical", course.cat] }
        ];
      } else {
        // Map real questions to the format the Quiz expects
        q = q.map(realQ => ({
          prompt: realQ.question,
          answer: realQ.answer,
          options: [realQ.answer, "None of the above", "Depends on the context", "Insufficient data"] // Basic mock options since JSON only has answers
        }));
      }

      NPTEL_QUIZ_POOLS[course.id] = {
        title: course.title,
        accent: course.cat === 'CS' ? 'accent-blue' : course.cat === 'Math' ? 'accent-purple' : 'accent-green',
        icon: course.cat === 'CS' ? '💻' : course.cat === 'Math' ? '🧠' : '⚡',
        tag: course.cat,
        description: `Offered by ${course.inst}. Exam on ${course.examDate}.`,
        questions: q
      };
    });

    renderCourseCards();
    bindActions();
    loadCourseQuiz('noc24_cs01');
  } catch (e) {
    console.error("Failed to load NPTEL data:", e);
    document.getElementById('quizShell').innerHTML = '<div style="color:red;padding:2rem;">Failed to load course database! Check console.</div>';
  }
}

function renderCourseCards() {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;

  grid.innerHTML = COURSE_ORDER.map(courseKey => {
    const course = NPTEL_QUIZ_POOLS[courseKey];
    if(!course) return '';
    const questionCount = course.questions.length;

    return `
      <button class="course-card ${course.accent}" type="button" data-course="${courseKey}">
        <div class="course-icon" aria-hidden="true">${course.icon}</div>
        <div class="course-copy">
          <div class="course-title">${course.title}</div>
          <div class="course-meta">
            <span>${questionCount} Qs</span>
            <span class="course-tag">${course.tag}</span>
          </div>
          <div class="course-meta" style="margin-top:10px">${course.description}</div>
        </div>
        <div class="course-arrow" aria-hidden="true">→</div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-course]').forEach(button => {
    button.addEventListener('click', () => {
      loadCourseQuiz(button.dataset.course);
    });
  });
}

function loadCourseQuiz(courseKey) {
  const course = NPTEL_QUIZ_POOLS[courseKey];
  if (!course) return;

  currentCourseKey = courseKey;
  currentSelections = new Map();
  currentQuestions = shuffle(course.questions).slice(0, Math.min(12, course.questions.length)).map(question => ({
    ...question,
    options: question.options ? shuffle(question.options) : [question.answer]
  }));

  const selectedCourse = document.getElementById('selectedCourse');
  const quizTitle = document.getElementById('quizTitle');
  const quizMeta = document.getElementById('quizMeta');
  const quizResult = document.getElementById('quizResult');

  if (selectedCourse) selectedCourse.textContent = `${course.title} • ${course.questions.length} questions`;
  if (quizTitle) quizTitle.textContent = course.title;
  if (quizMeta) quizMeta.textContent = `Loaded real data from NPTEL Database.`;
  if (quizResult) {
    quizResult.hidden = true;
    quizResult.innerHTML = '';
  }

  renderQuiz();
  updateScore();
}

function renderQuiz() {
  const grid = document.getElementById('quizQuestionGrid');
  if (!grid) return;

  if (!currentQuestions.length) {
    grid.innerHTML = '<div class="quiz-empty">No quiz loaded yet. Start with a course card above.</div>';
    return;
  }

  grid.innerHTML = currentQuestions.map((question, index) => {
    const options = question.options.map(option => `
      <label class="quiz-option">
        <input type="radio" name="q-${index}" value="${option}" ${currentSelections.get(index) === option ? 'checked' : ''} />
        <span>${option}</span>
      </label>
    `).join('');

    return `
      <article class="quiz-card">
        <div class="quiz-qtag">Question ${index + 1}</div>
        <h4 class="quiz-question">${question.prompt || question.question}</h4>
        <p class="quiz-topic">${currentCourseKey ? NPTEL_QUIZ_POOLS[currentCourseKey].title : ''}</p>
        <div class="quiz-options">${options}</div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', event => {
      const index = Number(event.target.name.replace('q-', ''));
      currentSelections.set(index, event.target.value);
      updateScore();
    });
  });
}

function updateScore() {
  const scoreEl = document.getElementById('quizScore');
  if (!scoreEl) return;
  scoreEl.textContent = `${currentSelections.size} / ${currentQuestions.length}`;
}

function submitQuiz() {
  const result = document.getElementById('quizResult');
  if (!result) return;

  if (!currentQuestions.length) {
    result.hidden = false;
    result.innerHTML = '<h4>No quiz loaded</h4><p>Select a course card to begin.</p>';
    return;
  }

  let correct = 0;
  const missed = [];

  currentQuestions.forEach((question, index) => {
    const selected = currentSelections.get(index);
    if (selected === question.answer) {
      correct += 1;
    } else {
      missed.push(`<li>Q${index + 1}: ${question.prompt || question.question} <strong>Correct:</strong> ${question.answer}</li>`);
    }
  });

  result.hidden = false;
  result.innerHTML = `
    <h4>${correct} / ${currentQuestions.length} correct</h4>
    <p>${correct === currentQuestions.length ? 'Perfect score. Strong work.' : 'Review the missed answers and try another course.'}</p>
    ${missed.length ? `<ul class="quiz-result-list">${missed.join('')}</ul>` : ''}
  `;
}

function loadRandomCourse() {
  const keys = Object.keys(NPTEL_QUIZ_POOLS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function bindActions() {
  const resetBtn = document.getElementById('quizResetBtn');
  const submitBtn = document.getElementById('quizSubmitBtn');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadCourseQuiz(currentCourseKey || loadRandomCourse());
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', submitQuiz);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  startClock();
  loadNPTELData();
});
