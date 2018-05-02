import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../containers/table';
import Overlay from '../containers/overlay';
import logo from '../logo.svg';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="epam-logo">
            <img src={logo} className="logo-img" alt="Epam Logo" />
          </div>
          <div className="line" />
          <a className="app-title" href="/">
            <h1>Events timeline</h1>
          </a>
        </header>
        <main>
          <Table />
          <Overlay />
        </main>
      </div>
    );
  }
}

export default connect()(App);
