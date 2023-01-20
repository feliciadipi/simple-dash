import state from "./state.js";
import startClock from "./clock.js"
import renderTimer from "./timer.js"

const clockTimerContainer = document.getElementById('clock-timer-container');
startClock(clockTimerContainer);

const modeButton = document.getElementById('mode-button');
modeButton.addEventListener('click', () => {
  const mode = state.toggle('mode');
  if (mode) { // true = timer mode
    modeButton.innerText = 'timer ⏳';
    renderTimer(clockTimerContainer);
  } else { // false = clock mode
    modeButton.innerText = 'clock 🕰️';
    startClock(clockTimerContainer);
  }
});


const soundButton = document.getElementById('sound-button');
soundButton.addEventListener('click', () => {
  const sound = state.toggle('sound');
  if (sound) {
    soundButton.innerText = 'sound: ON';
  } else {
    soundButton.innerText = 'sound: OFF';
  }
});