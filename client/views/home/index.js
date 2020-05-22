import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
<<<<<<< HEAD
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import AppState from '../../store/app-state';
=======
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import AppState from '../../store/app-state';
>>>>>>> 1dec01e30d0ddcdcea1cbd112bb862538af4300d

@inject('appState')
@observer
class Home extends React.Component {
  // static propTypes = {
  //   appState: PropTypes.instanceOf(AppState).isRequired,
  // };

  bootstrap() {
    const { appState } = this.props;
    return new Promise((resolve) => {
      setTimeout(() => {
        appState.count = 3;
        resolve(true);
      });
    });
  }

  render() {
    const { appState } = this.props;
    return (
      <div>
        <Helmet>
          <title>
            主页
          </title>
          <meta name="description" content="This is home" />
        </Helmet>
        {appState && appState.msg}
      </div>
    );
  }
}

export default Home;
