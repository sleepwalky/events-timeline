import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../../store/store';
import { hidePopup } from '../../actions/popupActions';

class EventPopup extends Component{
  closePopup = function (event) {
    event.preventDefault();
    const url = document.getElementById("event-url").getAttribute("href") || '';
    store.dispatch(hidePopup());
    window.history.pushState({}, null, window.location.origin);
    window.open(url);
  };

  render() {
    return (
      <div>
        <div className="popup-name">
          <span><b>Event name: </b> {this.props.name}</span>
        </div>
        <div className="popup-city">
          <span>Location: {this.props.city}</span>
        </div>
        <div className="popup-startDate">
          <span>Date: {this.props.startDate}</span>
        </div>
        <div className="popup-endDate">
          <span>Date: {this.props.endDate}</span>
        </div>
        <div className="popup-url">
          <span className="url-title">More</span>
          <span>
            <a id="event-url" onClick={this.closePopup} href={this.props.url}>information</a>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.event.eventProfile.name,
    city: state.event.eventProfile.city,
    startDate: state.event.eventProfile.startDate,
    endDate: state.event.eventProfile.endDate,
    url: state.event.eventProfile.url,
  };
}

export default connect(mapStateToProps)(EventPopup);
