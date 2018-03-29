import * as types from './action-types';

export function getEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_LIST_SUCCESS,
    events,
  };
}

export function setEventProfile(data) {
  return {
    type: types.SET_EVENT_PROFILE,
    data,
  };
}
