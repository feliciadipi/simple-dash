function refreshClock() {
  const clock = new Date();
  return clock;
}

export function renderTime(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  element.appendChild(display);
}

export function renderDate(element) {
  element.innerHTML = '';
  const clock = refreshClock();
  const display = document.createElement('div');
  display.innerHTML = clock.toLocaleDateString('en-US');
  element.appendChild(display);
}

export function renderLogin(element) {
  let html = `
    <form action="/login" method="post">
      <div class="mb-3">
        <label for="login-user" class="form-label themed">Username</label>
        <input type="text" class="form-control themed" id="login-user">
      </div>
      <div class="mb-3">
        <label for="login-pass" class="form-label themed">Password</label>
        <input type="password" class="form-control themed" id="login-pass">
      </div>
      <button type="submit" class="btn themed">Submit</button>
    </form>`;
  element.innerHTML = html;
}

export function renderRegister(element) {
  let html = `
    <form action="/register" method="post">
      <div class="mb-3">
        <label for="reg-user" class="form-label themed">Username</label>
        <input type="text" class="form-control themed" id="reg-user">
      </div>
      <div class="mb-3">
        <label for="reg-pass" class="form-label themed">Password</label>
        <input type="password" class="form-control themed" id="reg-pass">
      </div>
      <button type="submit" class="btn themed">Submit</button>
    </form>`;
  element.innerHTML = html;
}