import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hidePopup } from '../../actions/popupActions';
import './popup.css';
import EventPopup from '../../components/popup/eventPopup';
import { setUrlParam } from '../../helpers/urlHelper';

class Popup extends Component {
  clearEventPopup = () => {
    if (this.props.display === 'block') {
      this.props.onHidePopup();
      setUrlParam('eventId', null);
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
