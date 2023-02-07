import state from "./state.js";
import startClock from "./clock.js"
import renderTimer from "./timer.js"

const clockTimerContainer = document.getElementById('clock-timer-container');
startClock(clockTimerContainer);

const clockModeButton = document.getElementById('clock-mode-button');
const timerModeButton = document.getElementById('timer-mode-button');

clockModeButton.addEventListener('click', () => {
  timerModeButton.classList.remove('disabled');
  clockModeButton.classList.add('disabled');
  startClock(clockTimerContainer);
});

timerModeButton.addEventListener('click', () => {
  clockModeButton.classList.remove('disabled');
  timerModeButton.classList.add('disabled');
  renderTimer(clockTimerContainer);
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