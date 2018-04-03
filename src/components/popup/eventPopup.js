import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hidePopup } from '../../actions/popupActions';

class EventPopup extends Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.props.onHideEventPopup();
    window.history.pushState({}, null, window.location.origin);
  }

  render() {
    const {
      name,
      city,
      startDate,
      endDate,
      url,
      backgroundImageUrl,
    } = this.props;
    return (
      <div>
        {backgroundImageUrl ?
        <div className="event-image-box">
          <img src={backgroundImageUrl} className="event-img" alt="" />
        </div> : ''
        }
        <div>
          <div className="popup-name">
            <span><b>Event name: </b> {name}</span>
          </div>
          <div className="popup-city">
            {city && <span><b>Location: </b> {city}</span>}
          </div>
          <div className="popup-startDate">
            {startDate && <span><b>Start date: </b> {new Date(startDate).toDateString()}</span>}
          </div>
          <div className="popup-endDate">
            {endDate && <span><b>End date: </b> {new Date(endDate).toDateString()}</span>}
          </div>
          <div className="popup-url">
            {url &&
            <a id="event-url" target="_blank" onClick={this.closePopup} href={url}>More information >></a>}
          </div>
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
    backgroundImageUrl: state.event.eventProfile.backgroundImageUrl,
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
