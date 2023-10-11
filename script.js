const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const mass = document.getElementById("boiling-time-input");

let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isStarted = false;

// let totalTimeInMinutes = 10; // Or any other value
// let totalTimeInMilliseconds = totalTimeInMinutes * 60 * 1000;

const format = (n) => n.toString().padStart(2, "0");

startBtn.addEventListener("click", () => {
  alert("start button clicked");

  let mass_of_milk = document.getElementById("boiling-time-input").value;
  
  console.log(mass_of_milk);

  let startTemperature = 25; // Initial temperature of the milk in °C
  let boilTemperature = 100; // Boiling point of the milk in °C
  let specificHeatCapacity = 3.93; // Specific heat capacity of milk in J/(g·°C)
  let power = 1000; // Power of the heat source in watts
  let mass = mass_of_milk; // Mass of the milk in grams
  
  function calculateBoilTime(startTemperature, boilTemperature, specificHeatCapacity, power, mass) {
    let deltaTemperature = boilTemperature - startTemperature;
    let heatNeeded = mass * specificHeatCapacity * deltaTemperature; // Using Q = mcΔT
    let timeInSeconds = heatNeeded / power; // Using t = Q/P
    return timeInSeconds / 60; // Convert time to minutes
  }
  
  let boilTime = calculateBoilTime(startTemperature, boilTemperature, specificHeatCapacity, power, mass);
  console.log(boilTime);

    // Updating totalTimeInMinutes and totalTimeInMilliseconds with calculated boilTime.
    totalTimeInMinutes = boilTime;
    totalTimeInMilliseconds = totalTimeInMinutes * 60 * 1000;
  
  if (!isStarted) {
    isStarted = true;
    timer = setInterval(decrementTimer, 10);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  isStarted = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isStarted = false;
  totalTimeInMinutes = 0; // Resetting to initial value or any default value you prefer
  totalTimeInMilliseconds = totalTimeInMinutes * 60 * 1000; // Recalculate totalTimeInMilliseconds after resetting totalTimeInMinutes
  timerEl.innerHTML = formatTime(totalTimeInMilliseconds); // Update the display
  mass.value = ""; // Clear the input field
});



function decrementTimer() {
  if (totalTimeInMilliseconds <= 0) {
    clearInterval(timer);
    isStarted = false;
    alert('Time is up!');
    return;
  }
  
  totalTimeInMilliseconds -= 10;
  timerEl.innerHTML = formatTime(totalTimeInMilliseconds);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsDisplay = milliseconds % 1000;
  return `${format(minutes)}:${format(seconds)}:${millisecondsDisplay.toString()}`;
}

timerEl.innerHTML = formatTime(totalTimeInMilliseconds);
