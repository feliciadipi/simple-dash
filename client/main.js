import { State } from './state.js';
import * as fetch from './fetch.js';
import * as render from './render.js';

const user = 'username';
const themeButton = document.getElementById('theme-button');
const authContainer = document.getElementById('auth-container');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const saveButton = document.getElementById('save-button');
const notesTextBox = document.getElementById('notes-textbox');
const tasksTextBox = document.getElementById('tasks-textbox');
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');

// Create new instance of state class
const state = new State();

// Restore theme from local storage if it exists

// Cannot save tasks or notes until you are logged in


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
}

renderPage();
setInterval(renderPage, 1000);