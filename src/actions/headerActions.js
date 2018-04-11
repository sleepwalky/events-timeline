// Header actions
export const ADD_ACTIVE_BUTTON_CLASS = 'ADD_ACTIVE_BUTTON_CLASS';
export const REMOVE_ACTIVE_BUTTON_CLASS = 'REMOVE_ACTIVE_BUTTON_CLASS';
export const SHOW_SWITCHING_MONTH = 'SHOW_SWITCHING_MONTH';
export const HIDE_SWITCHING_MONTH = 'HIDE_SWITCHING_MONTH';

export function addActiveClass(button) {
  return {
    type: ADD_ACTIVE_BUTTON_CLASS,
    button,
  };
}

export function removeActiveClass() {
  return {
    type: REMOVE_ACTIVE_BUTTON_CLASS,
  };
}

export function showSwitchMonth(button) {
  return {
    type: SHOW_SWITCHING_MONTH,
    button,
  };
}

export function hideSwitchMonth(button) {
  return {
    type: HIDE_SWITCHING_MONTH,
    button,
  };
}
