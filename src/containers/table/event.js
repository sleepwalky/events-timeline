import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showOverlay } from '../../actions/overlayActions';
import EventPopup from '../../components/popup/eventPopup';
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

  showPopup = () => {
    setUrlParam('eventId', this.props.id);
    const data = {
      extraClass: 'popup',
      title: this.props.name,
      content: <EventPopup
        eventProfile={this.props}
      />,
      open: true,
    };
    this.props.showOverlay(data);
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
        onShowPopup={this.showPopup}
      />
    );
  }
}

Event.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  city: PropTypes.string,
  startDate: PropTypes.string,
  showOverlay: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    showOverlay: data => {
      dispatch(showOverlay(data));
    },
  };
}

export default connect(null, mapDispatchToProps)(Event);
