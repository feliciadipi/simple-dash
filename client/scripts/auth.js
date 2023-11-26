import state from "./state.js";

/**
 * Utility functions for creating styled elements quickly
 * */
function createLink(text, f) {
  let link = document.createElement('a');
  link.href = '#';
  link.innerText = text;
  link.classList.add('p-1', 'lnk');
  link.addEventListener('click', () => f());
  return link;
}

function createNav(l1, l2) {
  let divider = document.createElement('div');
  divider.innerText = '|';
  divider.classList.add('p-1', 'lnk');

  let nav = document.createElement('div');
  nav.classList.add('d-flex', 'flex-row', 'justify-content-end');
  nav.append(l1, divider, l2);
  return nav;
}

/**
 * Utility functions for fetching routes
 * */
async function login() {

}

async function register() {

}

/**
 * Render guest view of auth panel
 * */
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

/**
 * Render login view of auth panel
 * */
function renderLogin(element) {
  element.innerHTML = '';
  let guestLink = createLink('continue as guest', () => renderGuest(element));
  let regLink = createLink('register', () => renderRegister(element));
  let nav = createNav(regLink, guestLink);

  let form = document.createElement('form');
  form.classList.add('text-end');
  form.action = '/login';
  form.method = 'post';
  
  let userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.name = 'username';
  userInput.placeholder = 'username';
  userInput.classList.add('form-control', 'm-2');

  let passInput = document.createElement('input');
  passInput.type = 'text';
  passInput.name = 'password';
  passInput.placeholder = 'password';
  passInput.classList.add('form-control', 'm-2');

  let submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'submit';
  submitButton.classList.add('btn', 'm-2');
  // TODO: login here
  submitButton.addEventListener('click', async function() {
    const json = {
      username: userInput.value,
      password: passInput.value
    };
    try {
      const res = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
      });
      const data = res.body;
      console.log("farttt");
      console.log(data);
      renderAuthenticated(element);
    } catch(e) {
      console.log(e);
    }
  });
  
  form.append(userInput, passInput, submitButton);
  element.append(nav, form);
}

/**
 * Render register view of auth panel
 * */
function renderRegister(element) {
  element.innerHTML = '';
  let guestLink = createLink('continue as guest', () => renderGuest(element));
  let loginLink = createLink('log in', () => renderLogin(element));
  let nav = createNav(loginLink, guestLink);

  let form = document.createElement('form');
  form.classList.add('text-end');
  form.action = '/register';
  form.method = 'post';
  
  let userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.id = 'user-input';
  userInput.placeholder = 'username';
  userInput.classList.add('form-control', 'm-2');

  let passInput = document.createElement('input');
  passInput.type = 'text';
  passInput.id = 'pass-input';
  passInput.placeholder = 'password';
  passInput.classList.add('form-control', 'm-2');

  let submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.innerText = 'submit';
  submitButton.classList.add('btn', 'm-2');
  // TODO: register here
  submitButton.addEventListener('click', async function() {
    // TODO save the state to db as well
    renderAuthenticated(element);
  });
  
  form.append(userInput, passInput, submitButton);
  element.append(nav, form);
}

/**
 * Render authenticated view of auth panel
 * */
function renderAuthenticated(element) {
  element.innerHTML =  `
  <div id="authenticated">
  <button class="btn" data-bs-toggle="dropdown" data-bs-target="#authenticated">${state.user} ↓</button>
  <ul class="dropdown-menu">
    <li id="logout"></li>
    <li id="del"></li>
  </ul>
  </div>
  `;
  // TODO change to use route instead, need to end express/passport session
  let logout = createLink('log out', () => {
    state.reset();
    renderGuest(element);
  });
  let del = createLink('delete account', () => deleteUser());
  [logout, del].forEach(e => e.classList.add('dropdown-item', 'px-3'));
  document.getElementById('logout').append(logout);
  document.getElementById('del').append(del);
}

const authContainer = document.getElementById('auth-container');
renderGuest(authContainer);