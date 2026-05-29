const container = document.getElementById("container");
const rgbValue = document.getElementById("rgb-value");
const questionNumber = document.getElementById("question-number");
const nextButton = document.getElementById("next-button");

const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");

const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
const restartButton = document.getElementById("restart");

const timerDisplay = document.getElementById("time");

let correctColor;
let score = 0;
let currentQuestion = 1;
let timer;
let timeLeft = 10;

const totalQuestions = 10;
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}


function startTimer() {
  clearInterval(timer);

  timeLeft = 10;
  timerDisplay.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
    }
  }, 1000);
}

function disableOptions() {
  let options = document.querySelectorAll(".option-div");

  options.forEach((button) => {
    button.disabled = true;

    if (button.style.backgroundColor === correctColor) {
      button.classList.add("correct");
    }
  });
}
