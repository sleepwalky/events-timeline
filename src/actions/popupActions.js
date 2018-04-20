// Popup actions
export const SHOW_EVENT_POPUP = 'SHOW_EVENT_POPUP';
export const HIDE_EVENT_POPUP = 'HIDE_EVENT_POPUP';

export function showPopup(data) {
  return {
    type: SHOW_EVENT_POPUP,
    data,
  };
}

export function hidePopup() {
  return {
    type: HIDE_EVENT_POPUP,
  };
}
