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

export default startClock;