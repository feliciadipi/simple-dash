import state from "./state.js";

/* ----- GUEST VIEW ----- */
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

/* ----- REGISTER VIEW ----- */
function renderRegister(element) {
  element.innerHTML = '';
  let guestLink = createLink('guest mode', () => renderGuest(element));
  let loginLink = createLink('log in', () => renderLogin(element));
  let nav = createNav(loginLink, guestLink);
  // create registration form
  let form = document.createElement('div');
  let uInput = document.createElement('input');
  let pInput = document.createElement('input');
  let sButton = document.createElement('button');
  form.append(uInput, pInput, sButton);
  form.classList.add('text-end');
  uInput.placeholder = 'username';
  uInput.classList.add('form-control', 'm-2');
  pInput.placeholder = 'password';
  pInput.classList.add('form-control', 'm-2');
  sButton.innerText = 'submit';
  sButton.classList.add('btn', 'm-2');
  sButton.addEventListener('click', async () => {
    const data = JSON.stringify({
      username: uInput.value,
      password: pInput.value,
      settings: state.settings
    });
    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (res.status === 200) {
      state.username = uInput.value;
      renderAuthenticated(element);
    } else {
      uInput.value = null;
      pInput.value = null;
      window.alert(`Registration failed.\n[${res.body}]`);
    }
  });
  element.append(nav, form);
}

/* ----- LOGIN VIEW ----- */
function renderLogin(element) {
  element.innerHTML = '';
  const guestLink = createLink('guest mode', () => renderGuest(element));
  const regLink = createLink('register', () => renderRegister(element));
  const nav = createNav(regLink, guestLink);
  // create login form
  let form = document.createElement('div');
  let uInput = document.createElement('input');
  let pInput = document.createElement('input');
  let sButton = document.createElement('button');
  form.append(uInput, pInput, sButton);
  form.classList.add('text-end');
  uInput.placeholder = 'username';
  uInput.classList.add('form-control', 'm-2');
  pInput.placeholder = 'password';
  pInput.classList.add('form-control', 'm-2');
  sButton.innerText = 'submit';
  sButton.classList.add('btn', 'm-2');
  sButton.addEventListener('click', async () => {
    const data = JSON.stringify({
      username: uInput.value,
      password: pInput.value
    });
    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (res.status === 200) {
      const uData = await res.json();
      state.username = uData["username"];
      state.settings = uData["settings"];
      // display user's theme
      document.documentElement.setAttribute('data-bs-theme', state.settings.theme);
      // display user's notes
      document.getElementById('notes-textarea').value = state.settings.notes;
      renderAuthenticated(element);
    } else {
      uInput.value = null;
      pInput.value = null;
      window.alert(`Authentication failed.\n[${res.body}]`);
    }
  });
  element.append(nav, form);
}

/* ----- SIGNED-IN VIEW ----- */
function renderAuthenticated(element) {
  element.innerHTML =  `
  <div id="authenticated">
  <button class="btn" data-bs-toggle="dropdown" data-bs-target="#authenticated">${state.username} ↓</button>
  <ul class="dropdown-menu">
    <li id="logout"></li>
    <li id="del"></li>
  </ul>
  </div>
  `;
  let logout = createLink('log out', async () => {
    await fetch(`/logout`, { method: 'GET' });
    state.reset();
    renderGuest(element);
  });
  let del = createLink('delete account', async () => {
    await fetch(`/delete`, { method: 'POST' });
    state.reset();
    renderGuest(element);
  });
  [logout, del].forEach(e => e.classList.add('dropdown-item', 'px-3'));
  document.getElementById('logout').append(logout);
  document.getElementById('del').append(del);
}

/* ----- DOM Surgery Helpers ----- */

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
  divider.classList.add('p-1', 'lnk');
  divider.innerText = '|';
  let nav = document.createElement('div');
  nav.classList.add('d-flex', 'flex-row', 'justify-content-end');
  nav.append(l1, divider, l2);
  return nav;
}

export {
  renderGuest,
  renderLogin,
  renderRegister,
  renderAuthenticated
};