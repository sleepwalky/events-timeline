import React from 'react';
import { Component } from 'react';
import PopupComponent from 'reactjs-popup';
import { connect } from 'react-redux';
import store from '../../store/store';
import { showEventPopup } from '../../actions/event-action';
import './popup.css';

//https://react-popup.netlify.com/component-api/

class Popup extends Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  };

  componentDidMount() {
    (document).addEventListener('click', function (event) {
      if (!event.target.classList.contains('event')) {
        let isDisplayed = store.getState().eventsState.display;
        const data = {
          xPosCurrent: 0,
          yPosCurrent: 0,
          display: false,
          event: {}
        };
        if (isDisplayed === 'block') {
          store.dispatch(showEventPopup(data));
          window.history.pushState({}, null, window.location.origin);
        }
      }
    }, false);
  }

  closePopup = function (event) {
    event.preventDefault();
    const data = {
      xPosCurrent: 0,
      yPosCurrent: 0,
      display: false,
      event: {}
    };
    store.dispatch(showEventPopup(data));
    window.history.pushState({}, null, window.location.origin);
    window.open(this.props.event.url);
  };

  render() {
    const url = this.props.event.url;
    return (
      <div className="popup" style={{left: this.props.xPosCurrent, top: this.props.yPosCurrent, display: this.props.display}}>
        <div className="popup-name">
          <span><b>Event name: </b> {this.props.event.name}</span>
        </div>
        <div className="popup-city">
          <span>Location: {this.props.event.city}</span>
        </div>
        <div className="popup-startDate">
          <span>Date: {this.props.event.startDate}</span>
        </div>
        <div className="popup-endDate">
          <span>Date: {this.props.event.endDate}</span>
        </div>
        <div className="popup-url">
          <span className="url-title">More</span>
          <span>
            <a className="event-url" onClick={this.closePopup} href={url}>information</a>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.eventsState.eventProfile,
    xPosCurrent: state.eventsState.xPosCurrent,
    yPosCurrent: state.eventsState.yPosCurrent,
    display: state.eventsState.display
  };
}

export default connect(mapStateToProps)(Popup);
