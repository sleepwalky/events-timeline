import { SHOW_OVERLAY, HIDE_OVERLAY } from '../actions/overlayActions';

const initialState = {
  title: '',
  content: '',
  open: null,
  class: '',
};

function overlayReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return Object.assign({}, state, {
        title: action.data.title,
        content: action.data.content,
        class: action.data.class,
        open: action.data.open,
      });
    case HIDE_OVERLAY:
      return Object.assign({}, state, initialState);
    default: {
      return state;
    }
  }
}

export default overlayReducer;
