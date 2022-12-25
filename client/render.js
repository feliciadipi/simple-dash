function refreshClock() {
  const clock = new Date();
  return clock;
}

function renderTime(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

function renderDate(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

function renderLogin(element) {

}

function renderRegister(element) {

}

function renderLoggedIn(element) {

}

function renderLoggedOut(element) {
  element.innerHTML = '';
  const display = document.createElement('div');
  display.innerHTML = `<div class="row">
  <div class="col">
    <input type="text" class="form-control themed" placeholder="First name" aria-label="First name">
  </div>
  <div class="col">
    <input type="text" class="form-control themed" placeholder="Last name" aria-label="Last name">
  </div>
</div>`;
  element.appendChild(display);
}

export {
  renderTime,
  renderDate,
  renderLogin,
  renderRegister,
  renderLoggedIn,
  renderLoggedOut
};