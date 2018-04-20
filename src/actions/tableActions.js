// Event actions
export const SET_MONTH = 'SET_MONTH';
export const SET_NEXT_PREV_MONTH = 'SET_NEXT_PREV_MONTH';
export const SET_VIEW_TO_TABLE = 'SET_VIEW_TO_TABLE';
export const SET_DISPLAY_TO_TABLE = 'SET_DISPLAY_TO_TABLE';

export function setMonthToEvents(month) {
  return {
    type: SET_MONTH,
    month,
  };
}

export function setNextPrevMonthToEvents() {
  return {
    type: SET_NEXT_PREV_MONTH,
  };
}

export function setViewToTable(view) {
  return {
    type: SET_VIEW_TO_TABLE,
    view,
  };
}

export function setDisplayToTable(display) {
  return {
    type: SET_DISPLAY_TO_TABLE,
    display,
  };
}
