import * as types from './action-types';

export function getEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_LIST_SUCCESS,
    events
  };
}

export function getEventsFailure(error) {
  return {
    type: types.LOAD_EVENTS_LIST_FAILURE,
    error
  };
}

export function getSingleEventSuccess(event) {
  return {
    type: types.LOAD_SINGLE_EVENT_SUCCESS,
    event
  };
}

export function getSingleEventFailure(error) {
  return {
    type: types.LOAD_SINGLE_EVENT_FAILURE,
    error
  };
}

