import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showPopup } from '../../actions/popupActions';
import { setEventProfile } from '../../actions/eventActions';
import EventCell from '../../components/table/eventCell';
import { setUrlParam } from '../../helpers/urlHelper';
import { parseEventName } from '../../helpers/eventHelper';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTooltipShown: false,
    };
  }
  onShowPopup = () => {
    setUrlParam('eventId', this.props.id);
    const data = {
      display: true,
    };
    this.props.onSetEventProfile(this.props);
    this.props.onShowPopup(data);
  };

  mouseOverEvent = () => {
    this.setState({ isTooltipShown: true });
  };

  mouseOutEvent = () => {
    this.setState({ isTooltipShown: false });
  };
  render() {
    const {
      name,
      city,
      startDate,
    } = this.props;
    const eventType = parseEventName(name);
    const classes = `${eventType.className} event`;
    return (
      <EventCell
        name={name}
        city={city}
        startDate={startDate}
        extraClass={classes}
        eventType={eventType.name}
        eventTypeShort={eventType.shortName}
        isTooltipShown={this.state.isTooltipShown}
        mouseOutEvent={this.mouseOutEvent}
        mouseOverEvent={this.mouseOverEvent}
        onShowPopup={this.onShowPopup}
      />
    );
  }
}

Event.propTypes = {
  id: PropTypes.any,
  onSetEventProfile: PropTypes.func.isRequired,
  onShowPopup: PropTypes.func.isRequired,
  name: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onShowPopup: data => {
      dispatch(showPopup(data));
    },
    onSetEventProfile: data => {
      dispatch(setEventProfile(data));
    },
  };
}

export default connect(null, mapDispatchToProps)(Event);
