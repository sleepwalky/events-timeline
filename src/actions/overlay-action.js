import * as types from './action-types';

export function showOverlay(data) {
  return {
    type: types.SHOW_OVERLAY,
    data,
  };
}
