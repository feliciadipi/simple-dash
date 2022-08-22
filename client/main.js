import * as crud from './crud.js';

const clock = new Date();
const notesTextBox = document.getElementById('notes-textbox');
const saveNotesButton = document.getElementById('save-notes-button');
const tasksTextBox = document.getElementById('tasks-textbox');
const saveTasksButton = document.getElementById('save-tasks-button');

saveNotesButton.addEventListener('click', async function(e) {
  const note = {
    date: clock.toLocaleDateString('en-US'),
    content: notesTextBox.value,
  };
  await crud.createNote(note);
});

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

renderTime(document.getElementById('time-container'));
renderDate(document.getElementById('date-container'));