import * as fetch from './fetch.js';
import * as render from './render.js';

const user = 'username';
const saveButton = document.getElementById('save-button');
const notesTextBox = document.getElementById('notes-textbox');
const tasksTextBox = document.getElementById('tasks-textbox');
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');
const weatherContainer = document.getElementById('weather-container');

saveButton.addEventListener('click', async function(e) {
  const state = {
    user: user,
    tasks: tasksTextBox.value,
    notes: notesTextBox.value,
  };
  await fetch.save(state);
});

function renderPage() {
  render.renderTime(timeContainer);
  render.renderDate(dateContainer);
  render.renderWeather(weatherContainer);
}

// Render every 10s
setInterval(renderPage, 10000);