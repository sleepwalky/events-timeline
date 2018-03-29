import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { showPopup } from '../actions/popupActions';
import { setEventProfile, setEventProfileById } from '../actions/eventActions';
import store from '../store';

class Event extends Component {
  constructor(props) {
    super(props);
    this.onShowPopup = this.onShowPopup.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname.split('/')[1].split('=');
    const param = url[0];
    const value = url[1];
    if (param === 'eventId') {
      const data = {
        xPosCurrent: window.outerWidth / 2 - 120,
        yPosCurrent: window.outerHeight / 2 - 50,
        display: true,
      };
      this.props.onSetEventProfileById(value);
      this.props.onShowPopup(data);
    }
  }

  onShowPopup = function (event) {
    const xPosState = store.getState().popup.xPosCurrent;
    const yPosState = store.getState().popup.yPosCurrent;
    const data = {
      xPosCurrent: event.clientX - 120,
      yPosCurrent: event.clientY + 20,
      display: true,
    };

    if (xPosState !== (event.clientX - 120) && yPosState !== (event.clientY + 20)) {
      this.props.onSetEventProfile(this.props);
      this.props.onShowPopup(data);
    }
  };

  render() {
    const { id, name, className } = this.props;
    const classes = `${className} event`;
    return (
      <Link to={`eventId=${id}`} className={classes} onClick={this.onShowPopup}>
        {name}
      </Link>
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
