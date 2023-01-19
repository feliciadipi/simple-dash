import state from "./state.js"; // Singleton

const soundButton = document.getElementById('sound-button');
soundButton.addEventListener('click', () => {
  const sound = state.toggle('sound');
  if (sound) {
    soundButton.innerText = 'sound: ON';
  } else {
    soundButton.innerText = 'sound: OFF';
  }
});

const charcoal = document.getElementById('charcoal');
charcoal.addEventListener('click', () => {
  state.setTheme(document.getElementsByClassName('themed'), 'charcoal');
});

const bingsu = document.getElementById('bingsu');
bingsu.addEventListener('click', () => {
  state.setTheme(document.getElementsByClassName('themed'), 'bingsu');
});

const blueberry = document.getElementById('blueberry');
blueberry.addEventListener('click', () => {
  state.setTheme(document.getElementsByClassName('themed'), 'blueberry');
});

const alpine = document.getElementById('alpine');
alpine.addEventListener('click', () => {
  state.setTheme(document.getElementsByClassName('themed'), 'alpine');
});

const botanical = document.getElementById('botanical');
botanical.addEventListener('click', () => {
  state.setTheme(document.getElementsByClassName('themed'), 'botanical');
});

const notesTextArea = document.getElementById('notes-textarea');
notesTextArea.addEventListener('keyup', () => {
  state.notes = notesTextArea.nodeValue;
});