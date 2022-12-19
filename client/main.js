import bootstrap from 'bootstrap' 
import * as render from './render.js';
import { State } from './state.js';
import { Theme } from './theme.js';

const body = document.getElementById('body');
const pageContainer = document.getElementById('page-container');
const themeButton = document.getElementById('theme-button');
const authContainer = document.getElementById('auth-container');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const saveButton = document.getElementById('save-button');
const notesTextBox = document.getElementById('notes-textbox');
const tasksTextBox = document.getElementById('tasks-textbox');
const timeContainer = document.getElementById('time-container');
const dateContainer = document.getElementById('date-container');
const buttons = Array.from(document.getElementsByClassName('button'));
const textBoxes = Array.from(document.getElementsByClassName('textbox'));

const theme = new Theme();
const state = new State();

/* ------------------------------------------------------ */

function initTheme() {
  body.classList.add(theme.getTheme());
  buttons.forEach(e => e.classList.add(theme.getTheme()));
  textBoxes.forEach(e => e.classList.add(theme.getTheme()));
}

function changeTheme() {
  const oldTheme = theme.getTheme();
  const newTheme = theme.changeTheme().getTheme();
  body.classList.replace(oldTheme, newTheme);
  buttons.forEach(e => e.classList.replace(oldTheme, newTheme));
  textBoxes.forEach(e => e.classList.replace(oldTheme, newTheme));
}

function renderPage() {
  render.renderTime(timeContainer);
  render.renderDate(dateContainer);
}

/* ------------------------------------------------------ */

saveButton.addEventListener('click', async function(e) {
  if (!state.authenticated()) {
    window.alert('Please log in to save your notes!')
  } else {
    const responseBody = await fetches.save(state);
    window.alert(JSON.stringify(responseBody));
  }
});

themeButton.addEventListener('click', changeTheme);

/* ------------------------------------------------------ */

initTheme();
renderPage();
setInterval(renderPage, 1000);