import React, { Component } from 'react';

class Event extends Component {
  constructor (props) {
    super();
    this.state = {
      className: props.className,
      place: props.place,
      time: props.time,
      name: props.name
    }
  }

  render () {
    let classes = `${this.state.className} event`;
    return (
      <div className = { classes }>
        { this.state.name }
      </div>
    )
  }
}

export default Event;
