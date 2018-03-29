import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hidePopup } from '../../actions/popupActions';

class EventPopup extends Component{
  constructor(props){
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup = function () {
    this.props.onHideEventPopup();
    window.history.pushState({}, null, window.location.origin);
  };

  render() {
    return (
      <div>
        <div className="popup-name">
          <span><b>Event name: </b> {this.props.name}</span>
        </div>
        <div className="popup-city">
          {this.props.city ? <span>Location: {this.props.city}</span> : '' }
        </div>
        <div className="popup-startDate">
          {this.props.startDate ? <span>Date: {this.props.startDate}</span> : '' }
        </div>
        <div className="popup-endDate">
          {this.props.endDate ? <span>Date: {this.props.endDate}</span> : '' }
        </div>
        <div className="popup-url">
          {this.props.url ?
          <span className="url-title">More</span> : '' }
          {this.props.url ?
          <span>
            <a id="event-url" target="_blank" onClick={this.closePopup} href={this.props.url}>information</a>
          </span> : '' }
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

function mapDispatchToProps(dispatch) {
  return {
    onHideEventPopup: () => {
      dispatch(hidePopup());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPopup);
