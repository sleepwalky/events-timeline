import * as types from '../actions/action-types';

export function getEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_LIST,
    events
  };
}
