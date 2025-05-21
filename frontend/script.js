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

document.body.querySelector(".panel").insertBefore(snippetBox, document.querySelector(".typing-input"));

const textarea = document.querySelector(".typing-input");
const timerDisplay = document.querySelector(".time");
const timerButtons = document.querySelectorAll(".timer-btn");
const wpmDisplay = document.querySelectorAll(".stat-box .stat-value")[0];
const cpmDisplay = document.querySelectorAll(".stat-box .stat-value")[1];
const accuracyDisplay = document.querySelectorAll(".stat-box .stat-value")[2];

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

function prepareTest(duration) {
  selectedTime = duration;
  timeLeft = duration;
  timerDisplay.textContent = timeLeft;
  loadNewSnippet();
  textarea.disabled = false;
  textarea.focus();
  
  testActive = false;
  
}

function startTest() {
  if (testActive || !selectedTime) return;
  
  testActive = true;
  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
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
  
  let wpm = 0;
  let cpm = 0;
  
  if (elapsedTime > 0) {
    const minutes = elapsedTime / 60;
    const words = typed.trim().split(/\s+/).length;
    wpm = Math.round(words / minutes);
    cpm = Math.round(typed.length / minutes);
  }

  accuracyDisplay.textContent = accuracy;
  wpmDisplay.textContent = wpm;
  cpmDisplay.textContent = cpm;
  
  timerDisplay.textContent = "Finished";

  clearInterval(timerId);
  
  snippetBox.innerHTML = "";
  textarea.value = "";
}

timerButtons.forEach(button => {
  button.addEventListener("click", () => {
    prepareTest(parseInt(button.getAttribute("data-time"))); 
  });
});

textarea.addEventListener("input", (e) => {
  if (!testActive && e.target.value.length === 1 && selectedTime) {
    startTest();
  }
  renderSnippet(textarea.value);
  
  if (testActive && e.target.value === currentSnippet) {
    clearInterval(timerId);
    endTest();
  }
});

textarea.addEventListener("keydown", e => {
  if (e.key === "Tab") {
    e.preventDefault();
    loadNewSnippet();
  }
});

snippetBox.innerHTML = "";