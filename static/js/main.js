function calculateBodyMetrics() {
  const age = parseFloat(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const neck = parseFloat(document.getElementById('neck').value);
  const hip = parseFloat(document.getElementById('hip').value);

  let bodyFat;

  if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  bodyFat = bodyFat.toFixed(2);
  document.getElementById('bodyFat').value = bodyFat;

  // Determine weight category
  let category;
  if (gender === 'male') {
      if (bodyFat <= 5) {
          category = 'Essential Fat';
      } else if (bodyFat <= 13) {
          category = 'Athletes';
      } else if (bodyFat <= 17) {
          category = 'Fitness';
      } else if (bodyFat <= 24) {
          category = 'Average';
      } else {
          category = 'Overweight';
      }
  } else {
      if (bodyFat <= 13) {
          category = 'Essential Fat';
      } else if (bodyFat <= 20) {
          category = 'Athletes';
      } else if (bodyFat <= 24) {
          category = 'Fitness';
      } else if (bodyFat <= 31) {
          category = 'Average';
      } else {
          category = 'Overweight';
      }
  }

  document.getElementById('result').innerHTML = `Body Fat Percentage: ${bodyFat}%<br>Category: ${category}`;

  // Update goal type images based on gender
  const bulkImage = document.getElementById('bulkImage');
  const leanBulkImage = document.getElementById('leanBulkImage');
  const shreddedImage = document.getElementById('shreddedImage');

  if (gender === 'male') {
      bulkImage.src = 'https://assets-global.website-files.com/5ca5fe687e34be0992df1fbe/655b520527adc6d65a4ef1dd_portrait-muscular-strong-shirtless-male-bodybuilder%20(1).jpg'; // Update with correct image path for male bulk
      leanBulkImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDpgoJYNNVG2SG0Y1-CKnw-Zhb-Dq8yrU75A&s'; // Update with correct image path for male lean bulk
      shreddedImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0tUmg8SZQnlZ2dMQFYd4awC6JDKsHPgCc_ElkpIA3GU3YazP8SyBRg0YDwe2GrtCtfA&usqp=CAU'; // Update with correct image path for male shredded
  } else {
      bulkImage.src = 'https://thumbs.dreamstime.com/b/size-plus-indian-woman-doing-fitness-workout-strong-size-plus-indian-woman-doing-fitness-workout-weights-grey-background-249109750.jpg'; // Update with correct image path for female bulk
      leanBulkImage.src = 'https://i.ytimg.com/vi/2i2vs66Yrk8/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAPOmCG_9gT7rsxvK6ttrUNyJhOhw'; // Update with correct image path for female lean bulk
      shreddedImage.src = 'https://swolverine.com/cdn/shop/articles/Lean_Muscle_Workouts_600x600_crop_center.jpg?v=1609360243'; // Update with correct image path for female shredded
  }

  document.getElementById('goalForm').style.display = 'block';
}

function calculateCalories() {
  const age = parseFloat(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const bodyFat = parseFloat(document.getElementById('bodyFat').value);
  const activityLevel = 1.55; // You can modify this based on user input if needed
  const goal = document.querySelector('input[name="goal"]:checked').value;

  // Calculate BMR
  let bmr;
  if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Calculate TDEE
  const tdee = bmr * activityLevel;

  // Adjust TDEE based on goal
  let goalCalories;
  if (goal === 'bulk') {
      goalCalories = tdee + 500; // Caloric surplus for bulking
  } else if (goal === 'leanBulk') {
      goalCalories = tdee + 250; // Slight caloric surplus for lean bulking
  } else if (goal === 'shredded') {
      goalCalories = tdee - 500; // Caloric deficit for getting shredded
  }

  const resultDiv = document.getElementById('result1');
  resultDiv.innerHTML = `Daily Caloric Intake: ${goalCalories.toFixed(0)} kcal`;
}

function toggleHipInput() {
  const gender = document.getElementById('gender').value;
  const hipLabel = document.getElementById('hipLabel');
  const hipInput = document.getElementById('hip');

  if (gender === 'male') {
      hipLabel.style.display = 'none';
      hipInput.style.display = 'none';
  } else {
      hipLabel.style.display = 'block';
      hipInput.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  toggleHipInput(); // Initialize the hip input visibility based on the selected gender
});

function getWorkout() {

  var workoutType = document.getElementById("workout-type").value;

  var workoutDisplay = document.getElementById("workout-display");

  

  // Clear previous workout display

  workoutDisplay.innerHTML = "";

  var workoutDetails;

  switch(workoutType) {

    case "chest":

      workoutDetails = {

        exercises: [

      { name: "Push-ups", sets: 3, repetitions: 12, image: "https://ts2.mm.bing.net/th?q=Push%20ups%20gif "  },
  
        { name: "Bench Press", sets: 4, repetitions: 10, image: "https://image.myupchar.com/9694/webp/incline-bench-press-benefits-types-technique.webp" },
  
        { name: "Chest Fly", sets: 3, repetitions: 12, image: "https://weighttraining.guide/wp-content/uploads/2016/11/dumbbell-fly-resized.png" }

        ]

      };

      break;

    case "back":

      workoutDetails = {

        exercises: [

         { name: "Pull-ups", sets: 4, repetitions: 10, image: "https://weighttraining.guide/wp-content/uploads/2016/10/pull-up-2-resized.png" },
  
        { name: "Deadlifts", sets: 3, repetitions: 8, image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1.png" },
  
        { name: "Bent-over Rows", sets: 3, repetitions: 12, image: "https://weighttraining.guide/wp-content/uploads/2016/10/Bent-over-barbell-row.png" }

        ]

      };

      break;

    case "shoulder":

      workoutDetails = {

        exercises: [

  
        { name: "Overhead Press", sets: 4, repetitions: 10, image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Shoulder-Press-resized.png" },
  
        { name: "Lateral Raises", sets: 3, repetitions: 12, image: "https://cdn-0.weighttraining.guide/wp-content/uploads/2016/05/dumbbell-lateral-raise-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4" },
  
        { name: "Front Raises", sets: 3, repetitions: 12, image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-Standing-Alternate-Front-Raise-resized.png" }
        ]

      };

      break;

    case "bicep":

      workoutDetails = {

        exercises: [

                 { name: "Bicep Curls", sets: 4, repetitions: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzTiH-bdH2H2_1U9x4l9orwmUOh6KYmTxow&s" },
  
        { name: "Hammer Curls", sets: 3, repetitions: 12, image: "https://training.fit/wp-content/uploads/2020/02/bizeps-hammercurls.png" },
  
        { name: "Chin-ups", sets: 3, repetitions: 10, image: "https://weighttraining.guide/wp-content/uploads/2021/09/Chin-up.png" }

        ]

      };

      break;

    case "tricep":

      workoutDetails = {

        exercises: [

         
        { name: "Tricep Dips", sets: 4, repetitions: 10, image: "https://qph.cf2.quoracdn.net/main-qimg-cf2058c891a58de973cc146af500a09e-lq" },
  
        { name: "Skull Crushers", sets: 3, repetitions: 12, image: "https://cdn-ilagdnf.nitrocdn.com/LdjqvpayPvrxRtdLNcIBBJBwRjrIltDr/assets/images/optimized/rev-9bc9011/www.fitfatherproject.com/wp-content/uploads/2019/08/Skull-Crusher-exercise-long-image.jpg" },
  
        { name: "Tricep Kickbacks", sets: 3, repetitions: 12, image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Kickback-resized.png" }

        ]

      };

      break;

    case "legs":

      workoutDetails = {

        exercises: [

         { name: "Squats", sets: 4, repetitions: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Fyj0JVdfv67RYmP4cTZv_zSshihTPX6TzPr4IMX_lSeArcPNaHb3oo2szdtYm5Ebw0E&usqp=CAU" },
  
        { name: "Lunges", sets: 3, repetitions: 12, image: "https://weighttraining.guide/wp-content/uploads/2018/11/Lunge-resized.png" },
  
        { name: "Deadlifts", sets: 3, repetitions: 8, image: "https://www.hertssportsvillage.co.uk/news-images/2022-Nov/rdl--4995.jpg" }

        ]

      };

      break;

    case "abs":

      workoutDetails = {

        exercises: [
 { name: "Crunches", sets: 4, repetitions: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LusCxq8g9iIlL-Dnsk_cSf0dMkUAaDHWgA&s" },
  
        { name: "Planks", sets: 3, repetitions: "Hold for 30 seconds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjlVAndjos5Rp7IN95mx1LgDDPBDO2JOkew&s" },
  
        { name: "Russian Twists", sets: 3, repetitions: 20, image: "https://miro.medium.com/v2/resize:fit:1024/1*jjuUaxtnLvFlc94NIY8oog.png" }
         
        ]

      };

      break;

    default:

      workoutDetails = {

        exercises: []

      };

  }

  

  // Display workout details

  var workoutInfo = "<div class='workout-info'>";

  workoutDetails.exercises.forEach(function(exercise) {

    workoutInfo += "<p><strong>" + exercise.name + "</strong></p>";

    workoutInfo += "<p><strong>Sets:</strong> " + exercise.sets + "</p>";

    workoutInfo += "<p><strong>Repetitions:</strong> " + exercise.repetitions + "</p>";

    workoutInfo += "<img src='" + exercise.image + "' alt='" + exercise.name + "'>";

  });

  workoutInfo += "</div>";

  workoutDisplay.innerHTML = workoutInfo;

}


let totalCalories = 0;

function addMeal() {
    const mealName = document.getElementById('mealName').value.trim();
    const calories = parseInt(document.getElementById('calories').value);

    if (mealName === '' || isNaN(calories)) {
        alert('Please enter valid meal name and calories!');
        return;
    }

    const mealList = document.getElementById('mealList');
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal');
    mealItem.innerHTML = `
        <span class="name">${mealName}</span>
        <span class="calories">${calories} Calories</span>
        <button onclick="removeMeal(this)">Remove</button>
    `;
    mealList.appendChild(mealItem);

    totalCalories += calories;
    document.getElementById('total').textContent = totalCalories;

    // Clear input fields after adding meal
    document.getElementById('mealName').value = '';
    document.getElementById('calories').value = '';
}

function removeMeal(button) {
    const mealItem = button.parentElement;
    const caloriesStr = mealItem.querySelector('.calories').textContent;
    const calories = parseInt(caloriesStr.split(' ')[0]); // Extract calories number
    totalCalories -= calories;
    document.getElementById('total').textContent = totalCalories;
    mealItem.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  const meals = {
      breakfast: [
        { name: "Banana", calories: 110, session: "breakfast", image: "https://fruitboxco.com/cdn/shop/products/asset_2_grande.jpg?v=1571839043 "},
        { name: "Bread with Peanut Butter", calories: 270, session: "breakfast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmNdl5idtbQiVYjQEyfmuq6QNI8TE42SI0xTgMjUdNA&s " },
        { name: "Greek Yogurt with Granola", calories: 250, session: "breakfast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFn8e68KXLw0Tv0jyJ08PAWkqOhrY83yKI9edRcLTvKw&s " },
        { name: "Egg White Omelette", calories: 200, session: "breakfast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpfSFU5d3bjBfcMgD2bpZNsbaLKSY_qg8oak06WRVpa9uBlgMJ2wNC0JzdftCFIimFRPw&usqp=CAU" },
        { name: "Whole Wheat Pancakes", calories: 400, session: "breakfast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjYFArimK1IBkJioWHypjC8cPoJauzpARlI_-aBcL9A&s" },
        { name: "Fruit Smoothie", calories: 200, session: "breakfast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ6sEGf22N00BAjjTUyhgybG0za853YgJlW6-WfktJjQ&s" }
      ],
      lunch: [
          { name: "Brown Rice Bowl", calories: 450, session: "lunch", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrtns5PB6MafqbF5G8Kmo0lZ-XoDICogAdFEyoo0lvNA&s" },
          { name: "Grilled Chicken Salad", calories: 400, session: "lunch", image: "https://hips.hearstapps.com/hmg-prod/images/grilled-chicken-horizontal-1532030541.jpg?crop=0.8890666666666666xw:1xh;center,top&resize=1200:*" },
          { name: "Quinoa Salad", calories: 350, session: "lunch", image: "https://choosingchia.com/jessh-jessh/uploads/2019/07/meditteranean-quinoa-salad-2.jpg" },
          { name: "Turkey Sandwich", calories: 300, session: "lunch", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qxGLgrJsFcNxMCxfwEIOU5tnR_LG9ONfdmD3cvKoYA&s" },
          { name: "Veggie Wrap", calories: 250, session: "lunch", image: "https://www.eatingwell.com/thmb/_KRmqSHZzUEWKQVE0uP3QLB98d4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4526733-45129f82ed554ea1be3ac980d096a6f1.jpg" },
          { name: "Bean Soup", calories: 300, session: "lunch", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIW8mjzZrGZkNsgFT-SToxe2BFadetQgbJB7AksbnWdg&s" }
      ],
      dinner: [
        { name: "Salmon with Roasted Vegetables", calories: 500, session: "dinner", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1s8mDMBtjXMh6A7OlIg90GcIS8KM5VVCJJX0ZV634Q&s" },
        { name: "Vegetable Stir-Fry", calories: 350, session: "dinner", image: "https://hips.hearstapps.com/hmg-prod/images/veggie-stir-fry-1597687367.jpg?crop=0.793xw:0.793xh;0.0619xw,0.0928xh&resize=1200:*" },
        { name: "Pasta Primavera", calories: 450, session: "dinner", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdD7cIOrurWqDpSk_Y3yfYwPbHWqOa3vSEYCI2F5NiCA&s" },
        { name: "Mixed Vegetable Salad", calories: 140, session: "dinner", image: "https://yummyindiankitchen.com/wp-content/uploads/2021/11/vegetable-salad-recipe-for-weight-loss-recipe-500x500.jpg" },
        { name: "Tofu Curry with Rice", calories: 400, session: "dinner", image: "https://thealmondeater.com/wp-content/uploads/2019/11/Easy-Tofu-Curry-1-9.jpg" },
        { name: "Grilled Fish Tacos", calories: 450, session: "dinner", image: "https://www.eatingwell.com/thmb/xasSJgcM5KAZM2Dgevx6hvQW3M8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6474306-f5f1d33b484647e28e37cecf04ed210e.jpg" }
      ],
      snacks: [
        { name: "Greek Yogurt with Berries", calories: 150, session: "snack", image: "https://usa.fage/sites/usa.fage/files/recipes/hero/Fage_Recipe_Headers_1200x500_Apr21_Plain_Loaded_BowlsA_Hero_1291.jpg" },
        { name: "Apple with Peanut Butter", calories: 200, session: "snack", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhbxja1M-PFl0WC96bBaG2k3qJtiZsRp6sj5yL2JyXA&s" },
        { name: "Mixed Nuts", calories: 250, session: "snack", image: "https://resources.commerceup.io/?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FM7-PiV2mzeGMI65vu3d9%2Fproduct%2FMNGB3.png&width=1600&resourceKey=M7-PiV2mzeGMI65vu3d9" },
        { name: "banana", calories: 110, session: "snack", image: "https://fruitboxco.com/cdn/shop/products/asset_2_grande.jpg?v=1571839043" },
        { name: "Chana Salad", calories: 100, session: "snack", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnk27E2QR-j5dmu4585Y9A0tx_C-M0LTlCY0jIuX5oKg&s" },
        { name: "Chickpeas Salad", calories: 150, session: "snack", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQctRv-M49EQG-hJjuV4KR4Nu2Jc4CR6uFq12gKnk3tA&s" }
      ]
  };

  document.querySelectorAll('.meal-image').forEach(image => {
      image.addEventListener('click', (event) => {
          const mealType = event.target.id;
          const mealList = meals[mealType];
          displayMeals(mealList);
      });
  });

  function displayMeals(mealList) {
      const mealListDiv = document.getElementById('meal-list');
      mealListDiv.innerHTML = '<h2>Meal Options:</h2><ul>' + 
          mealList.map(meal => 
              `<li>
                  <img src="${meal.image}" alt="${meal.name}" class="food-image">
                  ${meal.name} - ${meal.calories} calories
              </li>`
          ).join('') + '</ul>';
  }
});



// Example function to get food options (rep)

let goal = 2000;  // Default daily water intake goal in ml
let consumed = 0;  // Amount of water consumed

function setGoal() {
    let goalInput = document.getElementById('goal-input').value;
    if (goalInput && !isNaN(goalInput)) {
        goal = parseInt(goalInput);
        document.getElementById('goal').innerText = goal;
        consumed = 0;
        updateTracker();
    } else {
        alert('Please enter a valid number');
    }
}

function addWater(amount) {
    consumed += amount;
    if (consumed > goal) consumed = goal;
    updateTracker();
}

function updateTracker() {
    document.getElementById('consumed').innerText = consumed;
    let progressPercentage = (consumed / goal) * 100;
    document.getElementById('progress-bar').style.width = progressPercentage + '%';
    
    let congratsMessage = document.getElementById('congrats-message');
    if (consumed >= goal) {
        congratsMessage.classList.remove('hidden');
        launchConfetti();
    } else {
        congratsMessage.classList.add('hidden');
    }
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Initial tracker update
updateTracker();