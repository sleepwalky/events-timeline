import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { hidePopup } from '../../actions/popup-action';
import './popup.css';
import EventPopup from './EventPopup';

class Popup extends Component {
  componentDidMount() {
    (document).addEventListener('click', function (event) {
      if (!event.target.classList.contains('event')) {
        clearPopup();
      }
    }, false);

    (document).addEventListener('scroll', function () {
      clearPopup();
    }, false);
  }

  render() {
    let popupContent;
    if (this.props.component === 'event') {
      popupContent = <EventPopup />;
    }
    return (
      <div className="popup" style={{left: this.props.xPosCurrent, top: this.props.yPosCurrent, display: this.props.display}}>
        {popupContent}
      </div>
    );
  }
}

function clearPopup() {
  const isDisplayed = store.getState().popupState.display;
  if (isDisplayed === 'block') {
    store.dispatch(hidePopup());
    window.history.pushState({}, null, window.location.origin);
  }
}

function mapStateToProps(state) {
  return {
    component: state.popupState.component,
    xPosCurrent: state.popupState.xPosCurrent,
    yPosCurrent: state.popupState.yPosCurrent,
    display: state.popupState.display,
  };
}

export default connect(mapStateToProps)(Popup);
