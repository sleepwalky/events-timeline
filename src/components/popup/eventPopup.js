import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventPopup extends Component {
  render() {
    const {
      city = 'GLOBAL EVENT',
      startDate,
      endDate,
      url,
      backgroundImageUrl,
    } = this.props.eventProfile;
    return (
      <div>
        <div className="event-image-box">
          {backgroundImageUrl &&
            <img src={backgroundImageUrl} className="event-img" alt="" />
          }
        </div>
        <div className="popup-text">
          <div className="popup-city">
            {city && <span><b>Location: </b> {city}</span>}
          </div>
          <div className="popup-startDate">
            {startDate && <span><b>Start date: </b> {new Date(startDate).toDateString()}</span>}
          </div>
          <div className="popup-endDate">
            {endDate && <span><b>End date: </b> {new Date(endDate).toDateString()}</span>}
          </div>
        </div>
        <div className="popup-footer-btn">
          {url &&
          <a id="event-url" target="_blank" href={url}>Read more</a>}
        </div>
      </div>
    );
  }
}

EventPopup.propTypes = {
  eventProfile: PropTypes.object.isRequired,
  city: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  url: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
};

export default EventPopup;
