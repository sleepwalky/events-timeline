import { HIDE_EVENT_POPUP, SHOW_EVENT_POPUP } from '../actions/popupActions';

const initialState = {
  component: '',
  display: '',
};

function popupReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_EVENT_POPUP:
      return Object.assign({}, state, {
        component: 'event',
        display: 'block',
      });
    case HIDE_EVENT_POPUP:
      return Object.assign({}, state, initialState);
    default: {
      return state;
    }
  }
}

export default popupReducer;
