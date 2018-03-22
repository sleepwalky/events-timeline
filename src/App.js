import React, { Component } from 'react';

import TableHeader from './components/table/Header';
import TablePlaces from './components/table/Places';

import { months } from './helpers/consts';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TableHeader
          view = { months }
        />
        <TablePlaces />
      </div>
    );
  }
}

export default App;
