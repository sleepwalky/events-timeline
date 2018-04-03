import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { value, onClick } = props;
  const classes = `button${props.class ? (' ' + props.class) : ''}`;
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
};

export default Button;
