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
    let style;
    const elemPosition = this.eventElem.getBoundingClientRect();
    const elemRightPosition = elemPosition.right;
    const elemBottomPosition = elemPosition.bottom;
    const offsetRight = document.body.clientWidth - elemRightPosition;
    const offsetBottom = document.body.clientHeight - elemBottomPosition;
    style = offsetRight > 200 ? '' : ' tooltip-right';
    style = offsetBottom > 100 ? style : ' tooltip-bottom';
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
