const container = document.getElementById("container");
const anxietyMeter = document.getElementById("anxiety-meter");
let heart = document.getElementById("heartbeat");
let whisper = document.getElementById("whisper");
let thoughtCount = 0;
let anxiety = 0;

function createThought(text = "Did I lock the door?") {
  const div = document.createElement("div");
  div.classList.add("thought");
  div.textContent = text;

  div.style.left = Math.random() * 80 + "vw";
  div.style.top  = Math.random() * 80 + "vh";

  // slow movement → anxiety gravity
  setInterval(() => {
    div.style.left = Number(div.style.left.replace("vw", "")) + (Math.random() - 0.5) + "vw";
    div.style.top  = Number(div.style.top.replace("vh", "")) + (Math.random() - 0.5) + "vh";
  }, 1000);

  div.onclick = () => {
    thoughtCount++;
    anxiety += 2;
    updateAnxiety();
    createThought(randomThought());
  };

  container.appendChild(div);
}

function randomThought() {
  const thoughts = [
    "What if I fail?",
    "Why did I say that?",
    "Do they hate me?",
    "Is this good enough?",
    "Should I start over?",
    "Did I forget something?",
    "Will this work?",
    "Am I good enough?",
    "What if this never ends?"
  ];
  return thoughts[Math.floor(Math.random() * thoughts.length)];
}

function updateAnxiety() {
  anxietyMeter.textContent = `ANXIETY: ${Math.min(anxiety, 100)}%`;

  heart.volume = Math.min(anxiety / 100, 0.6);
  if (anxiety > 15 && heart.paused) heart.play();

  if (anxiety > 40 && whisper.paused) whisper.play();

  if (anxiety > 60) {
    document.body.style.filter = `blur(${(anxiety - 50) / 10}px)`;
    document.body.style.background = "#ffb3b3";
  }

  if (anxiety > 90) enterBreathingMode();
}

function enterBreathingMode() {
  document.querySelectorAll(".thought").forEach(t => t.remove());
  document.getElementById("breathe").style.display = "block";
  document.body.style.background = "#d7f5e9";
  heart.pause();
  whisper.pause();
}

createThought();  // START
