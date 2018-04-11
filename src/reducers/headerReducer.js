import {
  ADD_ACTIVE_BUTTON_CLASS,
  REMOVE_ACTIVE_BUTTON_CLASS,
  SHOW_SWITCHING_MONTH,
  HIDE_SWITCHING_MONTH,
} from '../actions/headerActions';

const initialState = {
  activeClass: '',
  hideMonth: '',
};

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ACTIVE_BUTTON_CLASS:
      return Object.assign({}, { activeClass: action.button });
    case REMOVE_ACTIVE_BUTTON_CLASS:
      return Object.assign({}, { activeClass: '' });
    case SHOW_SWITCHING_MONTH:
      return Object.assign({}, { hideMonth: action.button });
    case HIDE_SWITCHING_MONTH:
      return Object.assign({}, { hideMonth: action.button });
    default: {
      return state;
    }
  }
}

export default headerReducer;
