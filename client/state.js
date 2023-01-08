class State {
  constructor() {
    this.sound = false; // true: on, false: off
    this.pomodoro = false; // true: timer, false: clock
    this.theme = 'charcoal';
    this.notes = '';
  }

  toggle(prop) {
    this[prop] = !this[prop];
    return this[prop];
  }

  getTheme() {
    return this.theme;
  }

  setTheme(elements, theme) {
    for (e of elements) {
      e.classList.replace(this.theme, theme);
    }
    this.theme = theme;
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes) {
    this.notes = notes;
  }
}

const state = new State();
export default state;