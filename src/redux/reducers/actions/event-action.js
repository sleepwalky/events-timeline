import * as types from '../actions/action-types';

export function getEventsSuccess( events ) {
  return {
    type : types.LOAD_EVENTS_LIST_SUCCESS ,
    events
  };
}

export function getEventsFailure( error ) {
  return {
    type : types.LOAD_EVENTS_LIST_FAILURE ,
    error
  };
}
