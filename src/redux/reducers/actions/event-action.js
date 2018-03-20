import * as types from '../actions/action-types';

export function getEventSuccess(events) {
  return {
    type: types.LOAD_EVENTS_LIST,
    events
  };
}
