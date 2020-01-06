import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../assets/index.less';
import Hello from '../src';

class App extends PureComponent {
  render() {
    return (
      <div>
        <div>THIS IS EXAM</div>
        <div>{Hello}</div>
      </div>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string, // eslint-disable-line
};

export default App;
