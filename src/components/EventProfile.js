import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as eventAPI from '../middleware/event-api';

import PageNotFound from './PageNotFound';

function isValidURL(url) {
  return (url.match(/[^0-9]/) === null);
}

class Event extends Component {
  componentDidMount() {
    eventAPI.getSingleEvent();
  }

  render() {
    if (isValidURL(this.props.match.params.id)) {
      return (
        <div>
          <h1>Hello from event profile</h1>
        </div>
      );
    } else {
      return (
        <PageNotFound />
      );
    }
  }
}

const mapStateToProps = function (state) {
  return {
    event: state.eventsState.eventProfile,
    error: ''
  };
};

export default connect(mapStateToProps)(Event);

