/**
 * Database/client-side CRUD operations should happen here
 * If there is a user still in browser local storage restore it
 * Otherwise, user needs to authenticate
 * Until authenticated, none of this will get saved
 * Button behavior will need to depend on whether the user is authenticated or not,
 * All methods should only save the settings if the user is logged in
 * Once a user logs in, we put their user ID in state.user
 * Then we use that userID to query the database whenever there is a crud operation
 */

class State {
  constructor() {
    this.auth = false;
    this.user = undefined;
  }

  authenticated() {
    return this.auth;
  }
  
  getUserID() {
    if (this.auth) {
      return this.user.getID();
    } else {
      return 'Guest';
    }
  }
}