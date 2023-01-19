import state from "./state.js"; // Singleton

/*------------------------Clock------------------------*/

function refreshClock() {
  const clock = new Date();
  return clock;
}

function renderClock(element) {
  element.innerHTML = '';
  const clock = refreshClock();

  const time = document.createElement('div');
  time.id = 'time';
  time.classList.add('mt-5');
  time.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(time);

  const date = document.createElement('div');
  date.id = 'date';
  date.classList.add('mb-3');
  date.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(date);
}

function startClock(element) {
  renderClock(element);
  setInterval(renderClock(element), 1000);
}

/*-----------------------Timer-------------------------*/

// TODO
function renderTimer(element) {
  element.innerHTML = '';

  const timer = document.createElement('div');
  timer.id = 'timer';
  timer.innerText = 'TIMER'; 
  timer.classList.add('mt-5');
  element.appendChild(timer);

  const controls = document.createElement('div');
  controls.id = 'timer-controls';
  controls.classList.add('d-inline-flex', 'flex-row', 'justify-content-center', 'mb-3');

  const playPauseButton = document.createElement('a');
  playPauseButton.classList.add('btn', 'mx-1');
  playPauseButton.href = '#';
  playPauseButton.innerText = '▶';
  controls.appendChild(playPauseButton);

  const resetButton = document.createElement('a');
  resetButton.classList.add('btn', 'mx-1');
  resetButton.href = '#';
  resetButton.innerText = '↺';
  controls.appendChild(resetButton);

  element.appendChild(controls);
}

/*------------------------Render------------------------*/

const clockContainer = document.getElementById('clock-container');
startClock(clockContainer);

const modeButton = document.getElementById('mode-button');
modeButton.addEventListener('click', () => {
  const mode = state.toggle('pomodoro');
  if (mode) {
    modeButton.innerText = 'Timer ⏳';
    renderTimer(clockContainer);
  } else {
    modeButton.innerText = 'Clock 🕰️';
    startClock(clockContainer);
  }
});