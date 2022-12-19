import * as render from './render.js';
import { State } from './state.js';
import { Theme } from './theme.js';

const bodyElement = document.getElementById('body');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const notesElement = document.getElementById('notes');
const themeButton = document.getElementById('theme-btn');
const buttons = Array.from(document.getElementsByClassName('btn'));
const theme = new Theme();
const state = new State();

/* ------------------------------------------------------ */

function initTheme() {
  bodyElement.classList.add(theme.getTheme());
  buttons.forEach(e => e.classList.add(theme.getTheme()));
}

function changeTheme() {
  const oldTheme = theme.getTheme();
  const newTheme = theme.changeTheme().getTheme();
  bodyElement.classList.replace(oldTheme, newTheme);
  buttons.forEach(e => e.classList.replace(oldTheme, newTheme));
}

function renderPage() {
  render.renderTime(timeElement);
  render.renderDate(dateElement);
}

/* ------------------------------------------------------ */

themeButton.addEventListener('click', changeTheme);

/* ------------------------------------------------------ */

initTheme();
renderPage();
setInterval(renderPage, 1000);