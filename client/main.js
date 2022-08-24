import { State } from './state.js';
import * as fetches from './fetches.js';
import * as render from './render.js';
import { Theme } from './theme.js';

const themeButton = document.getElementById('theme-button');
const authContainer = document.getElementById('auth-container');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const saveButton = document.getElementById('save-button');
const notesTextBox = document.getElementById('notes-textbox');
const tasksTextBox = document.getElementById('tasks-textbox');
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');

// Create new instances of state and theme classes
const state = new State();
const theme = new Theme();

// Restore theme from local storage if it exists
if (window.localStorage.getItem('theme') !== null) {
  theme = window.localStorage.getItem('theme');
}

// Cannot save tasks or notes until you are logged in
saveButton.addEventListener('click', async function(e) {
  if (!state.authenticated()) {
    window.alert('Please log in to save your notes!')
  } else {
    const responseBody = await fetches.save(state);
    window.alert(JSON.stringify(responseBody));
  }
});

function renderPage() {
  render.renderTime(timeContainer);
  render.renderDate(dateContainer);
}

renderPage();
setInterval(renderPage, 1000);