class State {
  constructor() {
    this.sound = false; // true: on, false: off
    this.mode = false; // true: timer, false: clock
    this.auth = false;
  }

  toggle(prop) {
    this[prop] = !this[prop];
    return this[prop];
  }
}

const state = new State();
export default state;