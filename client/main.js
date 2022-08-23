import * as fetch from './fetch.js';

const user = '';
const saveButton = document.getElementById('save-button');
const notesTextBox = document.getElementById('notes-textbox');
const tasksTextBox = document.getElementById('tasks-textbox');
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');

saveButton.addEventListener('click', async function(e) {
  const state = {
    user: user,
    tasks: tasksTextBox.value,
    notes: notesTextBox.value,
  };
  await fetch.save(state);
});

function refreshClock() {
  const clock = new Date();
  return clock;
}

function renderTime(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

function renderDate(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

function renderWeather(element) {

}

function renderClock() {
  renderTime(timeContainer);
  renderDate(dateContainer);
}

function render() {
  // render weather every 10 minutes
  setInterval(renderWeather, 600000)
  // re-render clock every 10 seconds
  setInterval(renderClock, 10000);
}

render();