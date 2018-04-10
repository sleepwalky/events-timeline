import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { value, onClick } = props;
  const classes = `button${props.extraClass ? (` ${props.extraClass}`) : ''}`;
  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  extraClass: PropTypes.string,
};

export default Button;
