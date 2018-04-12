import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showPopup } from '../../actions/popupActions';
import { setEventProfile } from '../../actions/eventActions';
import EventCell from '../../containers/table/eventCell';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTooltipShown: false,
    };
  }
  onShowPopup = () => {
    let newPathName;
    const pathname = window.location.search;
    const params = pathname.split('?')[1];
    if (params === '' || params === undefined) {
      newPathName = `${pathname}?eventId=${this.props.id}`;
    } else {
      let isEventIdExist = false;
      if (params.split('&').length > 0) {
        params.split('&').forEach(param => {
          const paramName = param.split('=')[0];
          if (paramName === 'eventId') {
            isEventIdExist = true;
            newPathName = pathname.replace(param, `eventId=${this.props.id}`);
          }
        });
      }
      if (!isEventIdExist) {
        newPathName = `${pathname}&eventId=${this.props.id}`;
      }
    }
    window.history.pushState({}, null, newPathName);
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

  parseEventName = name => {
    const fullstringname = name.replace(/ /g, '').toLowerCase();
    if (fullstringname.indexOf('meetup') !== -1 || fullstringname.indexOf('meet-up') !== -1) {
      return { name: 'Global meetup', className: 'meetup', shortName: 'GM' };
    } else if (fullstringname.indexOf('talk') !== -1) {
      return { name: 'Talk', className: 'talk', shortName: 'TK' };
    } else if (fullstringname.indexOf('rollingscopes') !== -1) {
      return { name: 'Rolling scope', className: 'meetup', shortName: 'RS' };
    } else if (fullstringname.indexOf('openday') !== -1) {
      return { name: 'Open Day', className: 'openday', shortName: 'OD' };
    } else if (fullstringname.indexOf('itday') !== -1) {
      return { name: 'IT Day', className: 'meetup', shortName: 'ITD' };
    } else if (fullstringname.indexOf('hackathon') !== -1) {
      return { name: 'Hackathon', className: 'hackathon', shortName: 'HA' };
    } else if (fullstringname.indexOf('truestory') !== -1) {
      return { name: 'Global meetup', className: 'meetup', shortName: 'GM' };
    }
    return { name: 'Other event', className: 'otherevent', shortName: 'OE' };
  };

  render() {
    const {
      name,
      city,
      startDate,
    } = this.props;
    const eventType = this.parseEventName(name);
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
