import React, { Component } from 'react';
import logo from '../spinner.svg';

class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={logo} className="spinner-img" alt="spinner" />
      </div>
    );
  }
}

export default Spinner;
