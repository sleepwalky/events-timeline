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
    if (param === 'eventId') {
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

  render() {
    const { id, name, className, city, startDate } = this.props;
    const classes = `${className} event`;
    return (
      <div>
        <Link
          to={`eventId=${id}`}
          className={classes}
          onMouseOver={this.mouseOverEvent}
          onMouseOut={this.mouseOutEvent}
          onClick={this.onShowPopup}>
          {name}
        </Link>
        { this.state.isTooltipShown ?

          <div className="tooltip">
            <h3>{this.state.name}</h3>
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
