import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as eventAPI from '../middleware/event-api';


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

const mapStateToProps = function (state) {
  return {
    events: state.eventsState.eventsList,
    error: state.eventsState.error
  };
};

export default connect(mapStateToProps)(Main);
