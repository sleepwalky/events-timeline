import * as types from './action-types';

export function getEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_LIST_SUCCESS,
    events,
  };
}

export function showEventPopup(data) {
  return {
    type: types.SHOW_EVENT_POPUP,
    data,
  };
}

export function hideEventPopup() {
  return {
    type: types.HIDE_EVENT_POPUP,
  };
}
