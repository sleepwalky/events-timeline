import * as types from './action-types';

export function showPopup(data) {
  return {
    type: types.SHOW_EVENT_POPUP,
    data,
  };
}

export function hidePopup() {
  return {
    type: types.HIDE_EVENT_POPUP,
  };
}
