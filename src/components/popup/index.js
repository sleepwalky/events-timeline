import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import { hidePopup } from '../../actions/popupActions';
import './popup.css';
import EventPopup from '../../containers/popup/eventPopup';

class Popup extends Component {
  clearEventPopup = () => {
    const isDisplayed = store.getState().popup.display;
    if (isDisplayed === 'block') {
      this.props.onHidePopup();
      const pathname = window.location.search;
      const params = pathname.split('?')[1];
      let newPathName = '';
      if (params !== '') {
        const paramsLength = params.split('&').length;
        params.split('&').forEach((param, index) => {
          const paramName = param.split('=')[0];
          if (paramName === 'eventId') {
            let forReplace = param;
            if (paramsLength > 1) {
              if (index === 0) {
                forReplace = `${param}&`;
              } else {
                forReplace = `&${param}`;
              }
            }
            newPathName = pathname.replace(`${forReplace}`, '');
          }
        });
      }
      window.history.pushState({}, null, newPathName);
    }
  };
  render() {
    let popupContent;
    if (this.props.component === 'event') {
      popupContent = (<EventPopup
        eventProfile={this.props.eventProfile}
      />);
    }
    return (
      <div
        className="popup"
        style={{
          display: this.props.display,
        }}
      >
        <a className="popup-close" onClick={this.clearEventPopup}>
          &times;
        </a>
        {popupContent}
      </div>
    );
  }
}

Popup.propTypes = {
  onHidePopup: PropTypes.func.isRequired,
  component: PropTypes.string,
  eventProfile: PropTypes.object,
  display: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    component: state.popup.component,
    display: state.popup.display,
    eventProfile: state.event.eventProfile,
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
