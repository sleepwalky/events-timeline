import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = props => {
  const {
    name,
    city = 'GLOBAL',
    startDate,
    extraClass,
  } = props;

  const classes = `tooltip ${extraClass}`;
  return (
    <div className={classes}>
      <div className="tooltip-header">
        <h4>{name}</h4>
      </div>
      <div className="tooltip-body">
        <p>Event place: {city}</p>
        <p>Event date: {new Date(startDate).toDateString()}</p>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  startDate: PropTypes.string,
  extraClass: PropTypes.string,
};

export default Tooltip;
