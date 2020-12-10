import { makeAutoObservable } from 'mobx';

export class ThemeStore {
  theme = 'light'

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(newTheme) {
    this.theme = newTheme
  }
}
