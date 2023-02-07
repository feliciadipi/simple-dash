function refreshClock() {
  const clock = new Date();
  return clock;
}

function renderClock(element) {
  element.innerHTML = '';
  const clock = refreshClock();

  const container = document.createElement('div');
  container.classList.add('d-inline-flex', 'card', 'w-50', 'p-3', 'position-absolute', 'translate-middle');

  const time = document.createElement('div');
  time.classList.add('mb-1');
  time.id = 'time';
  time.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const date = document.createElement('div');
  date.id = 'date';
  date.classList.add('mb-3');
  date.innerHTML = clock.toLocaleDateString('en-US');

  container.append(time, date);
  element.append(container);
}

function startClock(element) {
  renderClock(element);
  setInterval(renderClock(element), 1000);
}

export default startClock;