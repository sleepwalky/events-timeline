import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventPopup extends Component {
  render() {
    const {
      name,
      city,
      startDate,
      endDate,
      url,
      backgroundImageUrl,
    } = this.props.eventProfile;
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
            <a id="event-url" target="_blank" href={url}>More information >></a>}
          </div>
        </div>
      </div>
    );
  }
}

EventPopup.propTypes = {
  eventProfile: PropTypes.object.isRequired,
  name: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  url: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
};

export default EventPopup;
