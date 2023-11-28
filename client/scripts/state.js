class State {
  constructor() {
    this.username = null
    this.settings = {
      sound: false,
      theme: 'charcoal',
      notes: ''
    }
  }

  async set(prop, val) {
    this.settings[prop] = val;
    if (this.username !== null) {
      const data = JSON.stringify(this.settings);
      const res = await fetch(`/update`, { 
        method: 'POST',
        body: data,
      });
      if (res.status !== 200) {
        window.alert(res.body);
      }
    }
    return this.settings[prop];
  }

  async toggle(prop) {
    this.settings[prop] = !this.settings[prop];
    if (this.username !== null) {
      const data = JSON.stringify(this.settings);
      const res = await fetch(`/update`, { 
        method: 'POST',
        body: data,
      });
      if (res.status !== 200) {
        window.alert(res.body);
      }
    }
    return this.settings[prop];
  }

  reset() {
    this.username = null
    this.settings = {
      sound: false,
      theme: 'charcoal',
      notes: ''
    }
  }
}

const state = new State();
export default state;