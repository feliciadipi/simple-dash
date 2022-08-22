const clock = new Date();

function renderTime(element) {
  element.innerHTML = '';
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

function renderDate(element) {
  element.innerHTML = '';
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

function renderWeather(element) {

}

function renderTasks(element) {
  
}

function renderNotes(element) {

}

renderTime(document.getElementById('time-container'));
renderDate(document.getElementById('date-container'));