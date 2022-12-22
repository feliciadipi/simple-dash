export class State {
  constructor() {
    this.user = undefined;
    this.theme = 'charcoal';
    this.use24h = false;
    this.useMMDDYY = false;
  }

  authenticated() {
    return (this.user !== undefined);
  }

  get(prop) {
    return this[prop];
  }

  set(prop, val) {
    this[prop] = val;
    return this[prop];
  }

  toggle(prop) {
    this[prop] = !this[prop];
    return this[prop];
  }
}