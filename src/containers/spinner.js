import React, { Component } from 'react';
import logo from '../spinner-2.gif';

class FilterBody extends Component {
  render() {
    return (
      <div>
        <img src={logo} className="spinner-img" alt="spinner" />
      </div>
    );
  }
}

export default FilterBody;
