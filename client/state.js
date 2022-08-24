import { Theme } from './theme.js';

// Implemented with fluent design pattern for convenience
export class State {
  constructor() {
    let user = undefined;
    let tasks = '';
    let notes = '';

    this.authenticated = () => {
      return user !== undefined;
    }

    this.getUser = () => { return user; }

    this.setUser = (updated) => { 
      user = updated;
      return this;
    }

    this.getTasks = () => { return tasks; }

    this.setTasks = (updated) => {
      tasks = updated;
      return this;
    }

    this.getNotes = () => { return notes; }

    this.setNotes = (updated) => {
      notes = updated;
      return this;
    }
  }
}