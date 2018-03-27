import React from 'react';

function Modal (props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className = "modalBg">
      <div className = "modal">
        {props.eventData}
      </div>
      <button onClick = { props.onClose }>
        Close
      </button>
    </div>
  );
}

export default Modal;
