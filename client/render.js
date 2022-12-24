function refreshClock() {
  const clock = new Date();
  return clock;
}

export function renderTime(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

export function renderDate(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

export function renderLogin(element) {

}

export function renderRegister(element) {

}