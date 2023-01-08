import state from "./state.js"; // Singleton

function createLink(text, f) {
  let link = document.createElement('a');
  link.href = '#';
  link.innerText = text;
  link.classList.add('p-1');
  link.addEventListener('click', () => f());
  return link;
}

function createNav(l1, l2) {
  let divider = document.createElement('div');
  divider.innerText = '|';
  divider.classList.add('p-1');

  let nav = document.createElement('div');
  nav.classList.add('d-flex', 'flex-row', 'justify-content-end');
  nav.append(l1, divider, l2);
  return nav;
}

function createForm(action, method) {
  let form = document.createElement('form');
  form.classList.add('text-end');
  form.action = action;
  form.method = method;

  let userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.placeholder = 'username';
  userInput.classList.add('form-control', 'm-2');

  let passInput = document.createElement('input');
  passInput.type = 'text';
  passInput.placeholder = 'password';
  passInput.classList.add('form-control', 'm-2');

  let submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'submit';
  submitButton.classList.add('btn', 'btn-outline-primary', 'm-2');
  // TODO submit button should also render authenticated if successful
  // call restore()

  form.append(userInput, passInput, submitButton);
  return form;
}

function renderGuest(element) {
  element.innerHTML = `
  <div id="guest">
  <button class="btn" type="button" data-bs-toggle="dropdown" data-bs-target="#guest">guest ↓</button>
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
  let logoutButton = createLink('log out', () => renderGuest(element));
  logoutButton.classList.add('btn');
  element.append(logoutButton);
  // TODO send /logout route request and reset() if successful
}

// TODO
function init() {

}

// TODO
function reset() {

}

// TODO
function restore(userState) {

}

const authContainer = document.getElementById('auth-container');
renderGuest(authContainer);