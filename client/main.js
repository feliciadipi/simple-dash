import * as render from './render.js';

import { State } from './state.js';

const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const notesElement = document.getElementById('notes');
const themeButtons = Array.from(document.getElementsByClassName('theme'));
const themedElements = Array.from(document.getElementsByClassName('themed'));
const state = new State();

/* ------------------------------------------------------ */

function renderPage() {
  render.renderTime(timeElement);
  render.renderDate(dateElement);
}

function renderTheme() {
  themedElements.forEach(e => e.classList.add(state.get('theme')));
}

function changeTheme(newTheme) {
  let oldTheme = state.get('theme');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
  state.set('theme', newTheme);
}

/* ------------------------------------------------------ */

const charcoal = document.getElementById('charcoal');
charcoal.addEventListener('click', () => {
  let oldTheme = state.get('theme');
  let newTheme = state.set('theme', 'charcoal');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
});

const bingsu = document.getElementById('bingsu');
bingsu.addEventListener('click', () => {
  let oldTheme = state.get('theme');
  let newTheme = state.set('theme', 'bingsu');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
});

const blueberry = document.getElementById('blueberry');
blueberry.addEventListener('click', () => {
  let oldTheme = state.get('theme');
  let newTheme = state.set('theme', 'blueberry');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
});

const alpine = document.getElementById('alpine');
alpine.addEventListener('click', () => {
  let oldTheme = state.get('theme');
  let newTheme = state.set('theme', 'alpine');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
});

const botanical = document.getElementById('botanical');
botanical.addEventListener('click', () => {
  let oldTheme = state.get('theme');
  let newTheme = state.set('theme', 'botanical');
  themedElements.forEach(e => e.classList.replace(oldTheme, newTheme));
});

/* ------------------------------------------------------ */

renderTheme();
renderPage();
setInterval(renderPage, 1000);