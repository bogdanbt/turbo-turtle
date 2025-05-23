
const snippets = [
  `console.log("Hello World");`,
  `for (let i = 0; i < 10; i++) { console.log(i); }`,
  `const sum = (a, b) => a + b;`,
  `if (user.isLoggedIn) { showDashboard(); }`,
  `function greet(name) { return "Hello, " + name; }`,
  `let count = 0; while (count < 5) { count++; }`
];

let currentSnippet = "";
let timeLeft = 60;
let timerId = null;
let selectedTime = null;
let testActive = false;
let charTimeline = [];

const snippetBox = document.createElement("div");
snippetBox.className = "snippet-box";
snippetBox.style.whiteSpace = "pre-wrap";
snippetBox.style.margin = "2rem auto";
snippetBox.style.maxWidth = "800px";
snippetBox.style.backgroundColor = "#1e1e1e";
snippetBox.style.padding = "1rem";
snippetBox.style.borderRadius = "1rem";
snippetBox.style.border = "1px solid #444";
snippetBox.style.fontFamily = "'Roboto Mono', monospace";
snippetBox.style.fontSize = "1rem";
snippetBox.style.lineHeight = "1.5";
snippetBox.style.color = "#eee";

document.body.querySelector(".panel").insertBefore(snippetBox, document.querySelector(".typing-input"));

const textarea = document.querySelector(".typing-input");
const timerDisplay = document.querySelector(".time");
const timerButtons = document.querySelectorAll(".timer-btn");
const charMinDisplay = document.querySelectorAll(".stat-box .stat-value")[0];
const accuracyDisplay = document.querySelectorAll(".stat-box .stat-value")[1];
const consistencyDisplay = document.querySelectorAll(".stat-box .stat-value")[2];

function loadNewSnippet() {
  currentSnippet = snippets[Math.floor(Math.random() * snippets.length)];
  renderSnippet("");
  textarea.value = "";
}

function renderSnippet(userInput) {
  snippetBox.innerHTML = "";

  for (let i = 0; i < currentSnippet.length; i++) {
    const span = document.createElement("span");
    span.textContent = currentSnippet[i];

    if (userInput[i] == null) {
      span.style.backgroundColor = "transparent";
      span.style.color = "#eee";
    } else if (userInput[i] === currentSnippet[i]) {
      span.style.backgroundColor = "#4caf50";
      span.style.color = "#fff";
    } else {
      span.style.backgroundColor = "#f44336";
      span.style.color = "#fff";
    }

    snippetBox.appendChild(span);
  }
}

function calculateConsistency(userInput) {
  let maxCorrectStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === currentSnippet[i]) {
      currentStreak++;
      maxCorrectStreak = Math.max(maxCorrectStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxCorrectStreak;
}

function prepareTest(duration) {
  selectedTime = duration;
  timeLeft = duration;
  timerDisplay.textContent = timeLeft;
  loadNewSnippet();
  textarea.disabled = false;
  textarea.focus();

  charMinDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";
  consistencyDisplay.textContent = "0";

  testActive = false;
  charTimeline = [];

  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.style.display = "none";
  textarea.style.display = "block";
  snippetBox.style.display = "block";
}

let testStartTime = null;

function startTest() {
  if (testActive || !selectedTime) return;

  testActive = true;
  testStartTime = Date.now();
  clearInterval(timerId);
  charTimeline = [];

  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    // Gerçek geçen süreyi hesapla
    const elapsedSeconds = Math.floor((Date.now() - testStartTime) / 1000);
    charTimeline[elapsedSeconds] = textarea.value.length;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      endTest();
    }
  }, 1000);
}

function endTest() {
  testActive = false;
  textarea.disabled = true;

  const typed = textarea.value;
  const correctChars = typed.split("").filter((char, i) => char === currentSnippet[i]).length;
  const elapsedTime = selectedTime - timeLeft;

  let accuracy = 0;
  if (typed.length > 0) {
    accuracy = Math.round((correctChars / typed.length) * 100);
  }

  let charPerSec = 0;
  if (elapsedTime > 0) {
    charPerSec = (typed.length / elapsedTime).toFixed(1);
  }

  const consistency = calculateConsistency(typed);
  
  let cpm = 0;
  if(elapsedTime>0){
    cpm = Math.round((typed.length / elapsedTime) * 60);
  }

  charMinDisplay.textContent = cpm;
  accuracyDisplay.textContent = accuracy;
  consistencyDisplay.textContent = consistency;
  timerDisplay.textContent = "Finished";

  clearInterval(timerId);

  textarea.style.display = "none";
  snippetBox.style.display = "none";

  const resultsContainer = document.querySelector(".results-container");
  if (resultsContainer) {
    resultsContainer.style.display = "flex";
    setTimeout(() => {
      createChart(charPerSec);
      showFeedback(charPerSec);
    }, 200);
  }
}

function createChart(charPerSec) {
  if (typeof Chart === 'undefined') return;

  const canvas = document.getElementById('typingChart');
  if (!canvas) return;

  const dataPoints = charTimeline.length > 0 ? charTimeline : [0, 2, 5, 8, 12, 15];
  const labels = dataPoints.map((_, i) => `${i}s`);

  const data = {
    labels,
    datasets: [{
      label: 'Character Count',
      data: dataPoints,
      fill: false,
      borderColor: '#33ca7f',
      backgroundColor: '#33ca7f',
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#33ca7f',
      pointBorderColor: '#33ca7f'
    }]
  };

  if (window.typingChart && typeof window.typingChart.destroy === 'function') {
    window.typingChart.destroy();
  }

  const ctx = canvas.getContext('2d');
    window.typingChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#f7ebe8',
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Typing Speed Chart',
            color: '#f7ebe8',
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (seconds)',
              color: '#f7ebe8',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#f7ebe8'
            },
            grid: {
              color: '#444'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Character Count',
              color: '#f7ebe8',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#f7ebe8'
            },
            grid: {
              color: '#444'
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          },
          point: {
            radius: 5,
            hoverRadius: 7
          }
        }
      }
    });
}

function showFeedback(charPerSec) {
  let feedback = "";
  if (charPerSec < 2) {
    feedback = "🐢 Great start! Every master was once a beginner.";
  } else if (charPerSec < 4) {
    feedback = "🐢💨 You're picking up speed! Feels like you just installed a turbo shell.";
  } else if (charPerSec < 6) {
    feedback = "🔥 Slow down a bit... your keyboard is about to catch fire!";
  } else {
    feedback = "🐢🔊 I saw it! I saw a rabbit behind me! Turbo Turtle leads the race!";
  }

  const feedbackBox = document.querySelector(".feedback-box");
  if (feedbackBox) {
    feedbackBox.textContent = feedback;
  }
}

timerButtons.forEach(button => {
  button.addEventListener("click", () => {
    const time = parseInt(button.getAttribute("data-time"));
    prepareTest(time);
  });
});

textarea.addEventListener("input", (e) => {
  if (!testActive && e.target.value.length === 1 && selectedTime) {
    startTest();
  }
  renderSnippet(textarea.value);

  if (testActive && charTimeline.length > 0) {
    charTimeline[charTimeline.length - 1] = e.target.value.length;
  }

  if (testActive && e.target.value === currentSnippet) {
    clearInterval(timerId);
    endTest();
  }
});

snippetBox.textContent = "";
