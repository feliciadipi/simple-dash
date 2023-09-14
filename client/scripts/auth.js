import {createLink, createNav, createForm} from './util.js';
import state from "./state.js";

function renderGuest(element) {
  element.innerHTML = `
  <div id="guest">
  <button class="btn" data-bs-toggle="dropdown" data-bs-target="#guest">guest ↓</button>
  <ul class="dropdown-menu">
    <li id="login"></li>
    <li id="reg"></li>
  </ul>
  </div>
  `;
  let login = createLink('log in', () => renderLogin(element));
  let reg = createLink('register', () => renderRegister(element));
  [login, reg].forEach(e => e.classList.add('dropdown-item', 'px-3'));
  document.getElementById('login').append(login);
  document.getElementById('reg').append(reg);
}

function renderLogin(element) {
  element.innerHTML = '';
  let guestLink = createLink('continue as guest', () => renderGuest(element));
  let regLink = createLink('register', () => renderRegister(element));
  let nav = createNav(regLink, guestLink);
  let form = createForm('/login', 'post');
  element.append(nav, form);
}

function renderRegister(element) {
  element.innerHTML = '';
  let guestLink = createLink('continue as guest', () => renderGuest(element));
  let loginLink = createLink('log in', () => renderLogin(element));
  let nav = createNav(loginLink, guestLink);
  let form = createForm('/register', 'post');
  element.append(nav, form);
}

function renderAuthenticated(element) {
  element.innerHTML = '';
  let logoutButton = createLink('log out', () => {

    renderGuest(element)
  });
  logoutButton.classList.add('btn');
  element.append(logoutButton);
  // TODO send /logout route request and reset() if successful
}

// TODO
function restore(userState) {

}

const authContainer = document.getElementById('auth-container');
renderGuest(authContainer);