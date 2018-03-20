import React from 'react';
import { Component } from 'react';
import * as eventAPI from '../api/event-api';
import { connect } from 'react-redux';


class Main extends Component {

  componentDidMount() {
    eventAPI.getEventsList();
  }

  render() {
    return (
      <span>
            { this.props.events.eventsState.eventsList.ee }
      </span>
    );
  }
}

const mapStateToProps = function ( state ) {
  return {
    events : state
  };
};

export default connect( mapStateToProps )( Main );

