import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { value, onClick } = props;
  const classes = `${props.class} button`;
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
  class: PropTypes.string,
};

export default Button;
