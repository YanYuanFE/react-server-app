import {
  observable, computed, action,
} from 'mobx';

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'Jack' }) {
    this.count = count;
    this.name = name;
  }

  @observable count;

  @observable name;

  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }

  @action add() {
    this.count += 2;
  }

  toJson() {
    return {
      count: this.count,
      name: this.name,
    };
  }
}

// const appState = new AppState();

// autorun(() => {
//   console.log(appState.msg);
// });

// setInterval(() => {
//   appState.add();
// });
// export default AppState;
