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
            { this.props.events.ee }
        { this.props.error }
      </span>
    );
  }
}

const mapStateToProps = function ( state , params ) {
  return {
    events : state.eventsState.eventsList ,
    error : state.eventsState.error
  };
};

export default connect( mapStateToProps )( Main );

