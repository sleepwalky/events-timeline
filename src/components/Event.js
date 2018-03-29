import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { showPopup } from '../actions/popup-action';
import { setEventProfile } from '../actions/event-action';
import store from '../store/store';

class Event extends Component {
  constructor(props) {
    super();
    this.state = {
      className: props.className,
      city: props.city,
      startDate: props.startDate,
      endDate: props.endDate,
      name: props.name,
      url: props.url,
      id: props.id
    };
    this.onShowPopup = this.onShowPopup.bind(this);
  }

  onShowPopup = function (event) {
    let xPosState = store.getState().popupState.xPosCurrent;
    let yPosState = store.getState().popupState.yPosCurrent;
    let data = {
      xPosCurrent: event.clientX - 120,
      yPosCurrent: event.clientY + 20,
      display: true,
      content: this.state,
    };

    if (xPosState !== (event.clientX - 120 ) && yPosState !== (event.clientY + 20)) {
      store.dispatch(setEventProfile(this.props));
      store.dispatch(showPopup(data));
    }
  };

  render() {
    const {name, id, className} = this.state;
    const classes = `${className} event`;
    return (
      <Link to={'eventId=' + this.state.id} className={classes} onClick={this.onShowPopup}>
        {id}
      </Link>
    );
  }
}

export default Event;
