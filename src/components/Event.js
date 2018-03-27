import React, { Component } from 'react';

import Modal from './table/Modal';

class Event extends Component {
  constructor (props) {
    super(props);
    this.state = {
      className: props.className,
      place: props.place,
      date: props.date,
      name: props.name,
      isTooltipShown: false,
      isModalShown: false
    }
  }


  mouseOverEvent = () => {
    this.setState({ isTooltipShown: true })
  };

  mouseOutEvent = () => {
    this.setState({ isTooltipShown: false })
  };

  toggleModalEvent = () => {
    this.setState({
      isModalShown: !this.state.isModalShown
    })
  };

  render () {
    let classes = `${this.state.className} event`;
    return (
      <div
        onMouseOver = { this.mouseOverEvent }
        onMouseOut = { this.mouseOutEvent }
        onClick = { this.toggleModalEvent }
        className = { classes }>
        { this.state.name }

        { this.state.isTooltipShown ?

          <div className = "tooltip">
            <h3>{this.state.name}</h3>
            <p>Event place: {this.state.place}</p>
            <p>Event date: {new Date(this.state.date).toDateString()}</p>
          </div>
          :
          <div />
        }
        {
          this.state.isModalShown ?

            <Modal
              show = { this.state.isModalShown }
              onClose = { this.toggleModalEvent }
              eventData = { `Some info about ${this.state.name}` }
            />
            :
            <div />
        }
      </div>
    )
  }
}

export default Event;
