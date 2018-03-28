import React, {Component} from 'react';

class Event extends Component {
  constructor(props) {
    super();
    this.state = {
      className: props.className,
      place: props.place,
      time: props.time,
      name: props.name
    };
  }

  render() {
    const { name, className } = this.state;
    const classes = `${className} event`;
    return (
      <div className={classes}>
        {name}
      </div>
    );
  }
}

export default Event;
