import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { showPopup } from '../actions/popupActions';
import { setEventProfile, setEventProfileById } from '../actions/eventActions';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTooltipShown: false,
    };
  }
  componentDidMount() {
    const url = window.location.pathname.split('/')[1].split('=');
    const param = url[0];
    const value = url[1];
    if ((param === 'eventId') && (parseInt(value, 10) === this.props.id)) {
      const data = {
        display: true,
      };
      this.props.onSetEventProfileById(value);
      this.props.onShowPopup(data);
    }
  }

  onShowPopup = () => {
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

  parseEventName = (name) => {
    const fullstringname = name.replace(/ /g, '').toLowerCase();
    if (fullstringname.indexOf('meetup') !== -1 || fullstringname.indexOf('meet-up') !== -1) {
      return { name: 'Global meetup', className: 'meetup' };
    } else if (fullstringname.indexOf('talk') !== -1) {
      return { name: 'Talk', className: 'talk' };
    } else if (fullstringname.indexOf('rollingscopes') !== -1) {
      return { name: 'Rolling scope', className: 'rs' };
    } else if (fullstringname.indexOf('itday') !== -1) {
      return { name: 'IT Day', className: 'itday' };
    } else if (fullstringname.indexOf('hackathon') !== -1) {
      return { name: 'Hackathon', className: 'hackayhon' };
    } else if (fullstringname.indexOf('truestory') !== -1) {
      return { name: 'True story', className: 'truestory' };
    }
    return { name: 'Other event', className: 'otherevent' };
  };

  render() {
    const {
      id,
      name,
      city,
      startDate,
    } = this.props;
    const data = this.parseEventName(name);
    const classes = `${data.className} event`;
    return (
      <div>
        <Link
          to={`eventId=${id}`}
          className={classes}
          onMouseOver={this.mouseOverEvent}
          onMouseOut={this.mouseOutEvent}
          onClick={this.onShowPopup}>
          {data.name}
        </Link>
        { this.state.isTooltipShown ?

          <div className="tooltip">
            <h4>{name}</h4>
            <p>Event place: {city}</p>
            <p>Event date: {new Date(startDate).toDateString()}</p>
          </div>
          :
          <div />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onShowPopup: (data) => {
      dispatch(showPopup(data));
    },
    onSetEventProfileById: (eventId) => {
      dispatch(setEventProfileById(eventId));
    },
    onSetEventProfile: (data) => {
      dispatch(setEventProfile(data));
    },
  };
}

export default connect(null, mapDispatchToProps)(Event);
