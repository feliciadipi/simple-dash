import * as render from './render.js';
import { State } from './state.js';
import { Theme } from './theme.js';

const body = document.getElementById('body');
const themeButton = document.getElementById('theme-btn');
const buttons = Array.from(document.getElementsByClassName('btn'));
const theme = new Theme();
const state = new State();

/* ------------------------------------------------------ */

function initTheme() {
  body.classList.add(theme.getTheme());
  buttons.forEach(e => e.classList.add(theme.getTheme()));
}

function changeTheme() {
  const oldTheme = theme.getTheme();
  const newTheme = theme.changeTheme().getTheme();
  body.classList.replace(oldTheme, newTheme);
  buttons.forEach(e => e.classList.replace(oldTheme, newTheme));
}

function renderPage() {
  render.renderTime(timeContainer);
  render.renderDate(dateContainer);
}

/* ------------------------------------------------------ */

themeButton.addEventListener('click', changeTheme);

/* ------------------------------------------------------ */

initTheme();