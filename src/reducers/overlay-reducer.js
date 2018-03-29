import * as types from '../actions/action-types';

const initialState = {
  title: '',
  content: '',
  open: null,
  class: '',
};

function overlayReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_OVERLAY:
      return Object.assign({}, state, {
        title: action.data.title,
        content: action.data.content,
        class: action.data.class,
        open: action.data.open,
      });
    case types.HIDE_OVERLAY:
      return Object.assign({}, state, initialState);
    default: {
      return state;
    }
  }
}

export default overlayReducer;
