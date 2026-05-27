// mess.js – MessIt section data + rendering (no network dependencies)

// Static demo data (safe defaults)
const MESS_DATA = {
  "Hostel A": {
    "Veg Mess": [
      { time: "Breakfast", items: ["Idli", "Sambar", "Coconut Chutney"] },
      { time: "Lunch", items: ["Rice", "Dal", "Veg Curry", "Curd"] },
      { time: "Snacks", items: ["Samosa", "Chai"] },
      { time: "Dinner", items: ["Chapati", "Mixed Veg", "Raita"] }
    ],
    "Non-Veg Mess": [
      { time: "Breakfast", items: ["Poha", "Egg/Paneer Option"] },
      { time: "Lunch", items: ["Rice", "Chicken/Paneer Curry", "Salad"] },
      { time: "Snacks", items: ["Buns", "Tea"] },
      { time: "Dinner", items: ["Biriyani", "Curd", "Papad"] }
    ]
  },
  "Hostel B": {
    "Veg Mess": [
      { time: "Breakfast", items: ["Dosa", "Sambar", "Chutney"] },
      { time: "Lunch", items: ["Rice", "Rajma", "Bhindi Masala", "Curd"] },
      { time: "Snacks", items: ["Cutlets", "Juice"] },
      { time: "Dinner", items: ["Roti", "Chole", "Salad"] }
    ]
  },
  "Hostel C": {
    "Veg Mess": [
      { time: "Breakfast", items: ["Upma", "Veg Sandwich"] },
      { time: "Lunch", items: ["Rice", "Sambar", "Aloo Gobi", "Curd"] },
      { time: "Snacks", items: ["Pakoda", "Tea"] },
      { time: "Dinner", items: ["Pulao", "Raita"] }
    ],
    "Non-Veg Mess": [
      { time: "Breakfast", items: ["Paratha", "Egg/Paneer Option"] },
      { time: "Lunch", items: ["Rice", "Mutton/Paneer Curry", "Salad"] },
      { time: "Snacks", items: ["Fried Snack", "Tea"] },
      { time: "Dinner", items: ["Noodles", "Gobi Manchurian"] }
    ]
  }
};

function safeEl(id) {
  return document.getElementById(id);
}

function populateHostels() {
  const hostelSelect = safeEl('mess-hostel');
  const typeSelect = safeEl('mess-type');
  if (!hostelSelect || !typeSelect) return;

  hostelSelect.innerHTML = `<option value="">Select Hostel</option>`;
  Object.keys(MESS_DATA).forEach(hostel => {
    hostelSelect.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(hostel)}">${escapeHtml(hostel)}</option>`);
  });

  // Reset types
  typeSelect.innerHTML = `<option value="">Select Mess Type</option>`;
}

function populateTypesForHostel(hostel) {
  const typeSelect = safeEl('mess-type');
  if (!typeSelect) return;

  typeSelect.innerHTML = `<option value="">Select Mess Type</option>`;

  const hostelData = MESS_DATA[hostel];
  if (!hostelData) return;

  Object.keys(hostelData).forEach(type => {
    typeSelect.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`);
  });
}

function renderMessMenu() {
  const hostel = safeEl('mess-hostel')?.value || '';
  const type = safeEl('mess-type')?.value || '';

  const titleEl = safeEl('mess-title');
  const menuEl = safeEl('mess-menu');
  const adviceEl = safeEl('mess-advice');

  if (!titleEl || !menuEl) return;

  const hasHostel = !!hostel;
  const hasType = !!type;

  if (!hasHostel || !hasType) {
    titleEl.textContent = '--';
    menuEl.innerHTML = '';
    if (adviceEl) {
      adviceEl.textContent = 'Select both Hostel and Mess Type to view menu.';
      adviceEl.style.color = '#fbbf24';
    }
    return;
  }

  const dayMenu = MESS_DATA?.[hostel]?.[type];
  if (!dayMenu || !Array.isArray(dayMenu)) {
    titleEl.textContent = 'No menu found';
    menuEl.innerHTML = '';
    if (adviceEl) {
      adviceEl.textContent = 'Menu data is not available for this selection.';
      adviceEl.style.color = '#f87171';
    }
    return;
  }

  titleEl.textContent = `${hostel} • ${type}`;

  const cards = dayMenu.map(section => {
    const items = section.items?.map(i => `<li>${escapeHtml(i)}</li>`).join('') || '';
    return `
      <div class="ffcs-result-item" style="cursor:default; align-items:flex-start;">
        <div style="font-weight:700; color: var(--blue2); min-width: 110px;">${escapeHtml(section.time)}</div>
        <div style="flex:1;">
          <ul style="margin:0; padding-left: 1.1rem; color: var(--text-dim);">
            ${items}
          </ul>
        </div>
      </div>
    `;
  }).join('');

  menuEl.innerHTML = cards;

  if (adviceEl) {
    adviceEl.textContent = 'Tip: selections update instantly.';
    adviceEl.style.color = '#34d399';
  }
}

// Helpers
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '<')
    .replaceAll('>', '>')
    .replaceAll('"', '"')
    .replaceAll("'", '&#039;');
}

// Init
(function initMess() {
  populateHostels();

  const hostelSelect = safeEl('mess-hostel');
  if (hostelSelect) {
    hostelSelect.addEventListener('change', () => {
      populateTypesForHostel(hostelSelect.value);
      renderMessMenu();
    });
  }

  // If user changes mess-type directly
  const typeSelect = safeEl('mess-type');
  if (typeSelect) {
    typeSelect.addEventListener('change', () => renderMessMenu());
  }

  // Expose to inline handlers
  window.renderMessMenu = renderMessMenu;
})();
