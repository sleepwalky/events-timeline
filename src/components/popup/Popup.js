import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { hidePopup } from '../../actions/popupActions';
import './popup.css';
import EventPopup from './EventPopup';

class Popup extends Component {
  constructor(props){
    super(props);
    this.clearPopup = this.clearPopup.bind(this);
  }
  componentDidMount() {
    (document).addEventListener('click', (event) => {
      if (!event.target.classList.contains('event')) {
        this.clearPopup();
      }
    }, false);

    (document).addEventListener('scroll', () => {
      this.clearPopup();
    }, false);
  }

  clearPopup = () => {
    const isDisplayed = store.getState().popup.display;
    if (isDisplayed === 'block') {
      this.props.onHidePopup();
      window.history.pushState({}, null, window.location.origin);
    }
  };

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

function mapStateToProps(state) {
  return {
    component: state.popup.component,
    xPosCurrent: state.popup.xPosCurrent,
    yPosCurrent: state.popup.yPosCurrent,
    display: state.popup.display,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onHidePopup: () => {
      dispatch(hidePopup());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
