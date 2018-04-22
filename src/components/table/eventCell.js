import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

class EventCell extends Component {
  constructor() {
    super();
    this.state = {
      tooltipExtraClass: '',
      isTooltipShown: false,
    };
  }
  mouseOverEvent = () => {
    const elemRightPosition = this.eventElem.getBoundingClientRect().right;
    const offsetRight = document.body.clientWidth - elemRightPosition;
    const style = offsetRight > 200 ? '' : 'tooltip-right';
    this.setState({
      isTooltipShown: true,
      tooltipExtraClass: style,
    });
  };

  mouseOutEvent = () => {
    this.setState({ isTooltipShown: false });
  };

  render() {
    const
      {
        extraClass,
        onShowPopup,
        eventTypeShort,
        eventType,
        name,
        city,
        startDate,
      } = this.props;
    return (
      <div className="event-item">
        <div
          ref={eventElem => this.eventElem = eventElem}
          className={extraClass}
          onMouseOver={this.mouseOverEvent}
          onMouseOut={this.mouseOutEvent}
          onClick={onShowPopup}
        >
          <span>
            {eventType}
          </span>
          <span>
            {eventTypeShort}
          </span>
        </div>
        {this.state.isTooltipShown &&
          <Tooltip name={name}
            city={city}
            startDate={startDate}
            extraClass={this.state.tooltipExtraClass}
          />
        }
      </div>
    );
  }
}

EventCell.propTypes = {
  extraClass: PropTypes.string,
  onShowPopup: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired,
  eventTypeShort: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  startDate: PropTypes.string,
};

export default EventCell;
