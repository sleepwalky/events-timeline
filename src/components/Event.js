import React from 'react';

function Event(props) {
  return (
    <div className = { props.className }
      data-place = { props.place }
      data-time = { props.time }
    >
      {props.name}
    </div>
  )
}

export default Event;
