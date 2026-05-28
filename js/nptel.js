document.body.insertAdjacentHTML('beforeend', '<div id="debugLoad" style="color:#fff; padding:1rem; background:rgba(0,0,0,0.5);">[DEBUG] nptel.js executed</div>');
const NPTEL_QUIZ_POOLS = {
  CS: {
    title: 'Data Structures & Algorithms',
    accent: 'accent-blue',
    icon: '💻',
    tag: 'Computer Science',
    description: 'Arrays, trees, graphs, and algorithm basics.',
    questions: [
      {
        prompt: 'Which operation is O(1) on a dynamic array when the index is known?',
        options: ['Access element', 'Search element', 'Insert in middle', 'Delete first element'],
        answer: 'Access element'
      },
      {
        prompt: 'What is the average-case complexity of binary search on a sorted array?',
        options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'],
        answer: 'O(log n)'
      },
      {
        prompt: 'Which data structure uses FIFO order?',
        options: ['Stack', 'Queue', 'Heap', 'Tree'],
        answer: 'Queue'
      },
      {
        prompt: 'Which sorting algorithm is typically fastest in average case for practical use among these?',
        options: ['Bubble sort', 'Selection sort', 'Quick sort', 'Insertion sort'],
        answer: 'Quick sort'
      },
      {
        prompt: 'Which structure is best for recursion call tracking?',
        options: ['Queue', 'Stack', 'Graph', 'Set'],
        answer: 'Stack'
      },
      {
        prompt: 'What does a hash map primarily optimize?',
        options: ['Search time', 'Memory only', 'Graphic rendering', 'Network latency'],
        answer: 'Search time'
      },
      {
        prompt: 'A complete binary tree is commonly represented using which structure?',
        options: ['Array', 'Linked list', 'Queue', 'Stack'],
        answer: 'Array'
      },
      {
        prompt: 'Which traversal visits root, left, right?',
        options: ['Inorder', 'Preorder', 'Postorder', 'Level order'],
        answer: 'Preorder'
      },
      {
        prompt: 'Which is a self-balancing tree?',
        options: ['AVL tree', 'Binary heap', 'Trie', 'B-tree only'],
        answer: 'AVL tree'
      },
      {
        prompt: 'Which graph representation is best for sparse graphs?',
        options: ['Adjacency matrix', 'Adjacency list', 'Pixel grid', 'Stack array'],
        answer: 'Adjacency list'
      },
      {
        prompt: 'Which algorithm is used for shortest paths with non-negative weights?',
        options: ['DFS', 'Dijkstra', 'Prim', 'Kruskal'],
        answer: 'Dijkstra'
      },
      {
        prompt: 'Which problem is solved using topological sorting?',
        options: ['Cycle detection in directed acyclic graphs', 'Shortest path in weighted graphs', 'Sorting numbers', 'Tree height only'],
        answer: 'Cycle detection in directed acyclic graphs'
      }
    ]
  },
  Math: {
    title: 'Probability & Discrete Math',
    accent: 'accent-purple',
    icon: '🧠',
    tag: 'Mathematics',
    description: 'Probability, calculus, and algebra essentials.',
    questions: [
      {
        prompt: 'If a coin is fair, probability of heads is?',
        options: ['0.25', '0.5', '0.75', '1'],
        answer: '0.5'
      },
      {
        prompt: 'Which is a prime number?',
        options: ['21', '27', '29', '33'],
        answer: '29'
      },
      {
        prompt: 'How many subsets does a set with 3 elements have?',
        options: ['3', '6', '8', '9'],
        answer: '8'
      },
      {
        prompt: 'Derivative of x² is?',
        options: ['x', '2x', 'x²', '2'],
        answer: '2x'
      },
      {
        prompt: 'Integral of 1 dx is?',
        options: ['0', 'x + C', '1 + C', 'x²/2'],
        answer: 'x + C'
      },
      {
        prompt: 'A matrix with equal rows and columns is called?',
        options: ['Rectangular', 'Square', 'Diagonal only', 'Sparse'],
        answer: 'Square'
      },
      {
        prompt: 'Probability of impossible event is?',
        options: ['0', '1', '0.5', 'Undefined'],
        answer: '0'
      },
      {
        prompt: 'If event A and B are independent, then P(A∩B) equals?',
        options: ['P(A)+P(B)', 'P(A)P(B)', 'P(A)-P(B)', '0'],
        answer: 'P(A)P(B)'
      },
      {
        prompt: 'What is the sum of angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        answer: '180°'
      },
      {
        prompt: 'The value of 2³ is?',
        options: ['6', '8', '9', '12'],
        answer: '8'
      },
      {
        prompt: 'Which is an irrational number?',
        options: ['2', '3/4', '√2', '7'],
        answer: '√2'
      },
      {
        prompt: 'Mean is the same as?',
        options: ['Average', 'Median', 'Mode', 'Range'],
        answer: 'Average'
      }
    ]
  },
  EE: {
    title: 'Circuit Theory Basics',
    accent: 'accent-green',
    icon: '⚡',
    tag: 'Electrical',
    description: 'Ohm’s law, power, AC/DC, and circuit components.',
    questions: [
      {
        prompt: 'Ohm’s law is?',
        options: ['V = IR', 'P = IV', 'I = V/P', 'R = VI'],
        answer: 'V = IR'
      },
      {
        prompt: 'Unit of electric current is?',
        options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
        answer: 'Ampere'
      },
      {
        prompt: 'A diode allows current in?',
        options: ['Both directions', 'One direction', 'No direction', 'Random direction'],
        answer: 'One direction'
      },
      {
        prompt: 'What stores energy in an electric field?',
        options: ['Resistor', 'Capacitor', 'Inductor', 'Transformer'],
        answer: 'Capacitor'
      },
      {
        prompt: 'Power formula is?',
        options: ['P = VI', 'P = V/I', 'P = IR', 'P = R/V'],
        answer: 'P = VI'
      },
      {
        prompt: 'Frequency unit is?',
        options: ['Hertz', 'Tesla', 'Newton', 'Coulomb'],
        answer: 'Hertz'
      },
      {
        prompt: 'Which component opposes current change?',
        options: ['Capacitor', 'Inductor', 'Battery', 'Switch'],
        answer: 'Inductor'
      },
      {
        prompt: 'A fuse is used for?',
        options: ['Amplifying signal', 'Protection', 'Storage', 'Cooling'],
        answer: 'Protection'
      },
      {
        prompt: 'AC stands for?',
        options: ['Actual current', 'Alternating current', 'Average circuit', 'Analog charge'],
        answer: 'Alternating current'
      },
      {
        prompt: 'In a series circuit, current is?',
        options: ['Same through all elements', 'Different in each element', 'Zero everywhere', 'Infinite'],
        answer: 'Same through all elements'
      },
      {
        prompt: 'Which device converts AC to DC?',
        options: ['Rectifier', 'Oscillator', 'Amplifier', 'Transformer'],
        answer: 'Rectifier'
      },
      {
        prompt: 'A short circuit has?',
        options: ['High resistance', 'Very low resistance', 'No voltage', 'No current'],
        answer: 'Very low resistance'
      }
    ]
  },
  Mech: {
    title: 'Mechanics Fundamentals',
    accent: 'accent-gold',
    icon: '🛠️',
    tag: 'Mechanical',
    description: 'Force, heat, motion, and thermodynamics concepts.',
    questions: [
      {
        prompt: 'SI unit of force is?',
        options: ['Joule', 'Newton', 'Pascal', 'Watt'],
        answer: 'Newton'
      },
      {
        prompt: 'First law of thermodynamics is about?',
        options: ['Energy conservation', 'Entropy only', 'Motion only', 'Pressure only'],
        answer: 'Energy conservation'
      },
      {
        prompt: 'Work = force ×?',
        options: ['Velocity', 'Time', 'Displacement', 'Mass'],
        answer: 'Displacement'
      },
      {
        prompt: 'Temperature is measured in?',
        options: ['Meter', 'Kelvin', 'Volt', 'Ampere'],
        answer: 'Kelvin'
      },
      {
        prompt: 'Heat transfer by direct contact is?',
        options: ['Radiation', 'Conduction', 'Convection', 'Reflection'],
        answer: 'Conduction'
      },
      {
        prompt: 'Which is a vector quantity?',
        options: ['Speed', 'Distance', 'Velocity', 'Temperature'],
        answer: 'Velocity'
      },
      {
        prompt: 'Momentum is mass ×?',
        options: ['Acceleration', 'Velocity', 'Force', 'Energy'],
        answer: 'Velocity'
      },
      {
        prompt: 'A rigid body does not?',
        options: ['Move', 'Rotate', 'Deform under load', 'Have mass'],
        answer: 'Deform under load'
      },
      {
        prompt: 'Efficiency is output / ?',
        options: ['Input', 'Mass', 'Velocity', 'Resistance'],
        answer: 'Input'
      },
      {
        prompt: 'Which law explains action and reaction?',
        options: ['Newton’s 1st law', 'Newton’s 2nd law', 'Newton’s 3rd law', 'Hooke’s law'],
        answer: 'Newton’s 3rd law'
      },
      {
        prompt: 'Pressure is force per?',
        options: ['Area', 'Volume', 'Time', 'Density'],
        answer: 'Area'
      },
      {
        prompt: 'The boiling point of water at sea level is about?',
        options: ['50°C', '75°C', '100°C', '150°C'],
        answer: '100°C'
      }
    ]
  }
};

const COURSE_ORDER = ['CS', 'EE', 'Math', 'Mech'];

let currentCourseKey = null;
let currentQuestions = [];
let currentSelections = new Map();

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
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function startClock() {
  const clock = document.getElementById('liveClock');
  if (!clock) return;

  const tick = () => {
    clock.textContent = formatClock();
  };

  tick();
  window.setInterval(tick, 1000);
}

function renderCourseCards() {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;

  grid.innerHTML = COURSE_ORDER.map(courseKey => {
    const course = NPTEL_QUIZ_POOLS[courseKey];
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
    options: shuffle(question.options)
  }));

  const selectedCourse = document.getElementById('selectedCourse');
  const quizTitle = document.getElementById('quizTitle');
  const quizMeta = document.getElementById('quizMeta');
  const quizResult = document.getElementById('quizResult');

  if (selectedCourse) selectedCourse.textContent = `${course.title} • ${course.questions.length} questions`;
  if (quizTitle) quizTitle.textContent = course.title;
  if (quizMeta) quizMeta.textContent = `Loaded from ${course.tag}. Questions and answer options are shuffled every time.`;
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
        <h4 class="quiz-question">${question.prompt}</h4>
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
      missed.push(`<li>Q${index + 1}: ${question.prompt} <strong>Correct:</strong> ${question.answer}</li>`);
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
  const keys = COURSE_ORDER.slice();
  return keys[Math.floor(Math.random() * keys.length)];
}

function bindActions() {
  const resetBtn = document.getElementById('quizResetBtn');
  const submitBtn = document.getElementById('quizSubmitBtn');
  const messageBtn = document.getElementById('messageDeveloper');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadCourseQuiz(currentCourseKey || loadRandomCourse());
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', submitQuiz);
  }

  if (messageBtn) {
    messageBtn.addEventListener('click', () => {
      const quizMeta = document.getElementById('quizMeta');
      if (quizMeta) {
        quizMeta.textContent = 'Message Developer is a visual placeholder in this mockup.';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  startClock();
  renderCourseCards();
  bindActions();
  renderQuiz();
  updateScore();
  loadCourseQuiz('CS');
});
