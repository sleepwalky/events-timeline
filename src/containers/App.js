import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
//import Table from '../components/table/Table';
import * as eventAPI from '../middleware/event-api';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    eventAPI.getEventsList();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Events timeline</h1>
        </header>
        <main>
          <span>Table tag is here</span>
        </main>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    events: state.eventsState.eventsList,
    error: state.eventsState.error
  };
}

export default connect(mapStateToProps)(App);
