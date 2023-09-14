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

function createForm(action, method) {
  let form = document.createElement('form');
  form.classList.add('text-end');
  form.action = action;
  form.method = method;

  let userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.id = 'username';
  userInput.placeholder = 'user-input';
  userInput.classList.add('form-control', 'm-2');

  let passInput = document.createElement('input');
  passInput.type = 'text';
  passInput.id = 'pass-input';
  passInput.placeholder = 'pass-input';
  passInput.classList.add('form-control', 'm-2');

  let submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.innerText = 'submit';
  submitButton.classList.add('btn', 'm-2');
  // TODO submit button should also render authenticated if successful
  // call restore()

  form.append(userInput, passInput, submitButton);
  return form;
}

export {
  createLink,
  createNav,
  createForm
};