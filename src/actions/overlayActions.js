// Overlay actions
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';

export function showOverlay(data) {
  return {
    type: SHOW_OVERLAY,
    data,
  };
}

export function hideOverlay() {
  return {
    type: HIDE_OVERLAY,
  };
}
