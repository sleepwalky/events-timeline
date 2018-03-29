import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { showPopup } from '../actions/popupActions';
import { setEventProfile } from '../actions/eventActions';
import store from '../store/store';

class Event extends Component {
  constructor(props) {
    super();
    this.onShowPopup = this.onShowPopup.bind(this);
  }

  onShowPopup = function (event) {
    let xPosState = store.getState().popup.xPosCurrent;
    let yPosState = store.getState().popup.yPosCurrent;
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
    const classes = `${this.props.className} event`;
    return (
      <Link to={'eventId=' + this.props.id} className={classes} onClick={this.onShowPopup}>
        {this.props.id}
      </Link>
    );
  }
}

export default Event;
