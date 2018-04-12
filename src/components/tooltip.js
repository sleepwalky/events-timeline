import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
  render() {
    const {
      name,
      city,
      startDate,
    } = this.props;
    return (
      <div className="tooltip">
        <h4>{name}</h4>
        <p>Event place: {city}</p>
        <p>Event date: {new Date(startDate).toDateString()}</p>
      </div>
    );
  }
}

Tooltip.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  startDate: PropTypes.string,
};

export default Tooltip;
