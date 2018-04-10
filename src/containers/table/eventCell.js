import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

class EventCell extends Component {
  render() {
    const
      {
        extraClass,
        mouseOverEvent,
        mouseOutEvent,
        onShowPopup,
        eventType,
        isTooltipShown,
        name,
        city,
        startDate,
      } = this.props;
    return (
      <div>
        <div
          className={extraClass}
          onMouseOver={mouseOverEvent}
          onMouseOut={mouseOutEvent}
          onClick={onShowPopup}
        >
          {eventType}
        </div>
        {isTooltipShown
        ? <Tooltip name={name} city={city} startDate={startDate} />
        :
        <div />
        }
      </div>
    );
  }
}

EventCell.propTypes = {
  extraClass: PropTypes.string,
  mouseOverEvent: PropTypes.func.isRequired,
  mouseOutEvent: PropTypes.func.isRequired,
  onShowPopup: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
  isTooltipShown: PropTypes.bool,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  startDate: PropTypes.string,
};

export default EventCell;
