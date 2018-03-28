import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/table/Table';
import logo from '../logo.svg';
import './App.css';
import Popup from '../components/popup/Popup';
import Overlay from '../components/overlay/Overlay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Events timeline</h1>
        </header>
        <main>
          <Table />
          <Popup />
          <Overlay />
        </main>
      </div>
    );
  }
}

App.propTypes = {};

export default connect()(App);
