class State {
  // conflict, if i make changes while logged out, then log in, should I update my data or restore the old data
  // and possibly overwrite the current changes? maybe only update when creating a user?
  // how often to update things? if a user is logged in, we should update on every change...
  // for notes, would that be a keyup? or is that too many interactions for the db to handle?
  // that would be a post request for every single character
  // could manage this more easily by only saving on enter, or with a save button
  // or could have this be more of a bulleted to-do list where you press enter to submit,
  // but that would take a lot more frontent work to implement

  // okay, so idea for authentication (control flow)
  // on every page load, the behavior is dependent on the state.authenticated property
  // when you are logging in, return the user's db data in the response to the http method
  // need to make sure i can "catch" that response from the front end
  // passport.authenticate should be a middleware, I need to get through the login process in order to get the data
  // if i fail, we send a failure message response and do not udpate logged in
  // on the client side, i either get a successful login or not
  // if it failed, console.alert the message and say to try again
  // otherwise, take the returned user data and update the state with it
  // now the state.authenticated should be true, and the data should be updated
  // if the user is logged in, we should re-render the page
  // the page should re-render using the state data
  // the state data should reflect the logged in user
  // if state.authenticated, we should be sending db updates on user preferences whenever their settings change
  // also want to add features where:
  // if a user sets the dur of a time, that should be the new placeholder --> need to add more info to state
  // (short/long/pomo durations)
  // when the refresh button is pressed, we should navigate automatically to the next logical timer 
  // something like short --> pomo --> short --> count count --> long... or not... maybe complicated to implement

  constructor() {
    this.authenticated = false;
    this.user = 'guest';
    this.sound = false; // true: on, false: off
    this.theme = 'charcoal';
    this.notes = '';
  }

  get(prop) {
    return this[prop];
  }

  set(prop, val) {
    this[prop] = val;
    if(this.authenticated) {
      // TODO update database
    }
    return this[prop];
  }

  toggle(prop) {
    this[prop] = !this[prop];
    if(this.authenticated) {
      // TODO update database
    }
    return this[prop];
  }

  reset() {
    this.authenticated = false;
    this.user = 'guest';
    this.sound = false;
    this.theme = 'charcoal';
    this.notes = '';
  }
}

const state = new State();
export default state;