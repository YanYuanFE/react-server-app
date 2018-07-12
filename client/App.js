import React, {Component} from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        This is SSR App1
        <span>text</span>
      </div>
    );
  }
}

export default hot(module)(App);