// mess.js – Complete VIT Mess Menu functionality
const MESS_MENU = {
  "Special": {
    "Monday": {
      breakfast: "Masala Dosa, Chutney, Sambar, Bread, Butter, Jam, Tea/Coffee/Milk",
      lunch: "Chapati, Rice, Dal Makhani, Paneer Butter Masala, Rasam, Curd, Pickle, Salad",
      snacks: "Samosa, Mint Chutney, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Gobi Manchurian, Rasam, Hot Milk, Fruit"
    },
    "Tuesday": {
      breakfast: "Puri, Aloo Sabji, Bread, Butter, Jam, Tea/Coffee/Milk",
      lunch: "Roti, Veg Pulao, Dal Fry, Veg Kolhapuri, Rasam, Curd, Papad",
      snacks: "Bhel Puri, Tea/Coffee",
      dinner: "Chapati, Jeera Rice, Dal Tadka, Aloo Gobi, Hot Milk, Ice Cream"
    },
    "Wednesday": {
      breakfast: "Idli, Vada, Chutney, Sambar, Bread, Butter, Jam, Tea/Coffee",
      lunch: "Chapati, Rice, Rajma Masala, Aloo Jeera, Rasam, Curd, Pickle",
      snacks: "Pani Puri, Tea/Coffee",
      dinner: "Chapati, Veg Biryani, Dal Fry, Paneer Tikka Masala, Raita, Hot Milk"
    },
    "Thursday": {
      breakfast: "Aloo Paratha, Curd, Pickle, Bread, Butter, Jam, Tea/Coffee",
      lunch: "Chapati, Rice, Chana Masala, Mix Veg, Rasam, Curd, Salad",
      snacks: "Pav Bhaji, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Makhani, Malai Kofta, Rasam, Hot Milk, Sweet"
    },
    "Friday": {
      breakfast: "Uttapam, Chutney, Sambar, Bread, Butter, Jam, Tea/Coffee",
      lunch: "Roti, Rice, Dal Tadka, Kadhai Paneer, Rasam, Curd, Papad",
      snacks: "Aloo Tikki Chaat, Tea/Coffee",
      dinner: "Chapati, Veg Fried Rice, Dal Fry, Veg Manchurian, Hot Milk, Fruit"
    },
    "Saturday": {
      breakfast: "Poha, Jalebi, Bread, Butter, Jam, Tea/Coffee/Milk",
      lunch: "Chapati, Rice, Dal Fry, Bhindi Masala, Rasam, Curd, Pickle",
      snacks: "Dahi Vada, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Paneer Bhurji, Rasam, Hot Milk, Pastry"
    },
    "Sunday": {
      breakfast: "Chole Bhature, Bread, Butter, Jam, Tea/Coffee/Milk",
      lunch: "Chapati, Veg Pulao, Dal Makhani, Shahi Paneer, Raita, Salad, Ice Cream",
      snacks: "Maggi, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Fry, Mix Veg Curry, Rasam, Hot Milk"
    }
  },
  "Non-Veg": {
    "Monday": {
      breakfast: "Dosa, Chutney, Sambar, Boiled Egg, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Chicken Curry, Rasam, Curd, Pickle",
      snacks: "Samosa, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Egg Curry, Rasam, Hot Milk"
    },
    "Tuesday": {
      breakfast: "Puri, Aloo Sabji, Omelette, Bread, Jam, Tea/Milk",
      lunch: "Roti, Rice, Dal Fry, Veg Sabji, Rasam, Curd, Papad",
      snacks: "Onion Pakoda, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Chicken Masala, Hot Milk, Sweet"
    },
    "Wednesday": {
      breakfast: "Idli, Vada, Chutney, Boiled Egg, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Fish Curry, Rasam, Curd, Pickle",
      snacks: "Cake/Puff, Tea/Coffee",
      dinner: "Chapati, Chicken Biryani, Raita, Chicken 65, Hot Milk"
    },
    "Thursday": {
      breakfast: "Pongal, Vada, Omelette, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Makhani, Chicken Korma, Rasam, Curd",
      snacks: "Vada Pav, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Fry, Egg Bhurji, Hot Milk, Fruit"
    },
    "Friday": {
      breakfast: "Upma, Chutney, Boiled Egg, Bread, Jam, Tea/Milk",
      lunch: "Roti, Rice, Dal Tadka, Chicken Roast, Rasam, Curd",
      snacks: "Mirchi Bajji, Tea/Coffee",
      dinner: "Chapati, Egg Fried Rice, Chilli Chicken, Hot Milk"
    },
    "Saturday": {
      breakfast: "Aloo Paratha, Curd, Omelette, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Veg Sabji, Rasam, Curd",
      snacks: "Sweet Corn, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Chicken Curry, Hot Milk, Ice Cream"
    },
    "Sunday": {
      breakfast: "Chole Bhature, Boiled Egg, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Chicken Pulao, Chicken Gravy, Raita, Salad",
      snacks: "Biscuits/Rusk, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Fry, Egg Curry, Hot Milk"
    }
  },
  "Veg": {
    "Monday": {
      breakfast: "Dosa, Chutney, Sambar, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Aloo Gobi, Rasam, Curd, Pickle",
      snacks: "Samosa, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Mix Veg, Rasam, Hot Milk"
    },
    "Tuesday": {
      breakfast: "Puri, Aloo Sabji, Bread, Jam, Tea/Milk",
      lunch: "Roti, Rice, Dal Fry, Cabbage Sabji, Rasam, Curd, Papad",
      snacks: "Onion Pakoda, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Chana Masala, Hot Milk, Sweet"
    },
    "Wednesday": {
      breakfast: "Idli, Vada, Chutney, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Soya Chunk Curry, Rasam, Curd",
      snacks: "Cake/Puff, Tea/Coffee",
      dinner: "Chapati, Veg Biryani, Raita, Gobi 65, Hot Milk"
    },
    "Thursday": {
      breakfast: "Pongal, Vada, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Makhani, Aloo Matar, Rasam, Curd",
      snacks: "Vada Pav, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Fry, Bhindi Fry, Hot Milk, Fruit"
    },
    "Friday": {
      breakfast: "Upma, Chutney, Bread, Jam, Tea/Milk",
      lunch: "Roti, Rice, Dal Tadka, Lauki Sabji, Rasam, Curd",
      snacks: "Mirchi Bajji, Tea/Coffee",
      dinner: "Chapati, Veg Fried Rice, Veg Manchurian, Hot Milk"
    },
    "Saturday": {
      breakfast: "Aloo Paratha, Curd, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Rice, Dal Fry, Rajma, Rasam, Curd",
      snacks: "Sweet Corn, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Tadka, Aloo Palak, Hot Milk, Ice Cream"
    },
    "Sunday": {
      breakfast: "Chole Bhature, Bread, Jam, Tea/Milk",
      lunch: "Chapati, Veg Pulao, Paneer Curry, Raita, Salad",
      snacks: "Biscuits/Rusk, Tea/Coffee",
      dinner: "Chapati, Rice, Dal Fry, Matar Mushroom, Hot Milk"
    }
  }
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentMess = "Special";
let currentDay = DAYS[new Date().getDay()];

function initMessIt() {
  const messSelect = document.getElementById('mess-select');
  const daySelect = document.getElementById('day-select');
  if(!messSelect || !daySelect) return;

  // Set today's date
  document.getElementById('today-date').textContent = new Date().toDateString();

  daySelect.value = currentDay;

  messSelect.addEventListener('change', (e) => {
    currentMess = e.target.value;
    renderMenu();
  });
  
  daySelect.addEventListener('change', (e) => {
    currentDay = e.target.value;
    renderMenu();
  });

  renderMenu();
}

function renderMenu() {
  const menuData = MESS_MENU[currentMess][currentDay];
  
  const bfastEl = document.getElementById('menu-breakfast');
  const lunchEl = document.getElementById('menu-lunch');
  const snacksEl = document.getElementById('menu-snacks');
  const dinnerEl = document.getElementById('menu-dinner');

  if(bfastEl) bfastEl.innerHTML = formatItems(menuData.breakfast);
  if(lunchEl) lunchEl.innerHTML = formatItems(menuData.lunch);
  if(snacksEl) snacksEl.innerHTML = formatItems(menuData.snacks);
  if(dinnerEl) dinnerEl.innerHTML = formatItems(menuData.dinner);

  highlightCurrentMeal();
}

function formatItems(mealStr) {
  return mealStr.split(',').map(item => `<span class="menu-item-tag">${item.trim()}</span>`).join('');
}

function highlightCurrentMeal() {
  const hour = new Date().getHours();
  document.querySelectorAll('.meal-card').forEach(card => card.classList.remove('active-meal'));

  if(hour >= 6 && hour < 10) document.getElementById('card-breakfast')?.classList.add('active-meal');
  else if(hour >= 11 && hour < 15) document.getElementById('card-lunch')?.classList.add('active-meal');
  else if(hour >= 15 && hour < 18) document.getElementById('card-snacks')?.classList.add('active-meal');
  else if(hour >= 19 && hour < 22) document.getElementById('card-dinner')?.classList.add('active-meal');
}

// Run init when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMessIt);
} else {
  initMessIt();
}
