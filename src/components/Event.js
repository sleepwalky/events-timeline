import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { showPopup } from '../actions/popupActions';
import { setEventProfile, setEventProfileById } from '../actions/eventActions';
import store from '../store/store';

class Event extends Component {
  constructor(props) {
    super();
    this.onShowPopup = this.onShowPopup.bind(this);
  }

  componentDidMount() {
      const url = window.location.pathname.split('/')[1].split('=');
      const param = url[0];
      const value = url[1];
      if (param === 'eventId'){
        let data = {
          xPosCurrent: window.outerWidth/2 - 120,
          yPosCurrent: window.outerHeight/2 -50 ,
          display: true,
        };
          this.props.onSetEventProfileById(value);
          this.props.onShowPopup(data);
      }
  }

  onShowPopup = function (event) {
    let xPosState = store.getState().popup.xPosCurrent;
    let yPosState = store.getState().popup.yPosCurrent;
    let data = {
      xPosCurrent: event.clientX - 120,
      yPosCurrent: event.clientY + 20,
      display: true,
    };

    if (xPosState !== (event.clientX - 120 ) && yPosState !== (event.clientY + 20)) {
      this.props.onSetEventProfile(this.props);
      this.props.onShowPopup(data);
    }
  };

  render() {
    const classes = `${this.props.className} event`;
    return (
      <Link to={'eventId=' + this.props.id} className={classes} onClick={this.onShowPopup}>
        {this.props.id}
      </Link>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onShowPopup: (data) => {
      dispatch(showPopup(data));
    },
    onSetEventProfileById: (eventId) =>{
      dispatch(setEventProfileById(eventId))
    },
    onSetEventProfile: (data) =>{
      dispatch(setEventProfile(data))
    },
  };
}

export default connect(null, mapDispatchToProps)(Event);
