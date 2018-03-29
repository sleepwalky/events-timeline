import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../../store/store';
import { hidePopup } from '../../actions/popup-action';

class EventPopup extends Component{
  closePopup = function (event) {
    event.preventDefault();
    store.dispatch(hidePopup());
    window.history.pushState({}, null, window.location.origin);
    window.open(this.props.eventProfile.url);
  };

  render() {
    return (
      <div>
        <div className="popup-name">
          <span><b>Event name: </b> {this.props.eventProfile.name}</span>
        </div>
        <div className="popup-city">
          <span>Location: {this.props.eventProfile.city}</span>
        </div>
        <div className="popup-startDate">
          <span>Date: {this.props.eventProfile.startDate}</span>
        </div>
        <div className="popup-endDate">
          <span>Date: {this.props.eventProfile.endDate}</span>
        </div>
        <div className="popup-url">
          <span className="url-title">More</span>
          <span>
            <a className="event-url" onClick={this.closePopup} href={this.props.eventProfile.url}>information</a>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    eventProfile: state.eventsState.eventProfile,
  };
}

export default connect(mapStateToProps)(EventPopup);
