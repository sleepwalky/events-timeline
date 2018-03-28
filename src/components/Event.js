import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { showEventPopup } from '../actions/event-action';
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
    this.showPopup = this.showPopup.bind(this);
  }

  showPopup = function (event) {
    let xPosState = store.getState().eventsState.x;
    let yPosState = store.getState().eventsState.y;
    let data = {
      xPosCurrent: event.clientX - 120,
      yPosCurrent: event.clientY + 20,
      display: true,
      event: this.state
    };

    if (xPosState !== (event.clientX - 120 ) && yPosState !== (event.clientY + 20)) {
      store.dispatch(showEventPopup(data));
    }
  };

  render() {
    const {name, id, className} = this.state;
    const classes = `${className} event`;
    return (
      <Link to={'eventId=' + this.state.id} className={classes} onClick={this.showPopup}>
        {id}
      </Link>
    );
  }
}

export default Event;
