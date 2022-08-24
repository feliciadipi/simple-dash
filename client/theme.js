// Finite state machine to handle themes
export class Theme {
 constructor() {

  let currentTheme = 'charcoal';
  
  let transitions = {
    'charcoal': 'bingsu',
    'bingsu': 'blueberry',
    'blueberry': 'charcoal'
  };

  this.getTheme = () =>  {
    return currentTheme;
  }

  this.changeTheme = () => {
    currentTheme = transitions[currentTheme];
    return this;
  }
 }
}