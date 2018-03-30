import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { hidePopup } from '../../actions/popupActions';
import './popup.css';
import EventPopup from './eventPopup';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initScroll: false,
    };
    this.clearPopup = this.clearPopup.bind(this);
  }

  componentDidMount() {
    (document).addEventListener('scroll', () => {
      if (this.state.initScroll) {
        this.clearPopup();
      } else {
        this.setState({ initScroll: true });
      }
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
      <div
        className="popup"
        style={{
          display: this.props.display,
        }}
      >
        <a className="modal-close" onClick={this.clearPopup}>
          &times;
        </a>
        {popupContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    component: state.popup.component,
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
