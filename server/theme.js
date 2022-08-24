// Finite state machine to handle themes
class Theme {
 constructor() {
  let currentTheme = 'blueberry';
  let transitions = {
    'dark': 'light',
    'light': 'blueberry',
    'blueberry': 'dark'
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

export default new Theme();