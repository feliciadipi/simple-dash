import state from "./state.js";
import startClock from "./clock.js";
import renderTimer from "./timer.js";

/* CLOCK/TIMER */
const clockTimerContainer = document.getElementById('clock-timer-container');
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

startClock(clockTimerContainer);

/* SOUND BUTTON */
const soundButton = document.getElementById('sound-button');
soundButton.addEventListener('click', () => {
  const sound = state.toggle('sound');
  if (sound) {
    soundButton.innerText = 'sound: ON';
  } else {
    soundButton.innerText = 'sound: OFF';
  }
});

/* THEME HANDLER | Adapted from Bootstrap Docs https://getbootstrap.com/docs/5.3/customize/color-modes/#how-it-works */
(() => {
  document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const theme = toggle.getAttribute('data-bs-theme-value');
      document.documentElement.setAttribute('data-bs-theme', theme);
      state.set('theme', theme);
    });
  });
})();