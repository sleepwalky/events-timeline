import React from 'react';
import { Component } from 'react';
import * as eventAPI from '../api/event-api';
import { connect } from 'react-redux';
import PageNotFound from './PageNotFound';


class Event extends Component {

  componentDidMount() {
    eventAPI.getSingleEvent();
  }

  render() {
    if ( isValidURL( this.props.match.params.id ) ) {
      return (
        <div>
          <h1>Hello from event profile</h1>
        </div>
      );
    } else {
      return (
        <PageNotFound/>
      );
    }
  }
}

const mapStateToProps = function ( state , params ) {
  return {
    event : state.eventsState.eventProfile ,
    error : ''
  };
};

function isValidURL( url ) {
  return (url.match( /[^0-9]/ ) === null);
}

export default connect( mapStateToProps )( Event );

