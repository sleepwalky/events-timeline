import * as types from '../actions/action-types';

const initialState = {
  component: '',
  display: '',
  xPosCurrent: 0,
  yPosCurrent: 0,
};

function popupReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_EVENT_POPUP:
      return Object.assign({}, state, {
        component: 'event',
        display: 'block',
        xPosCurrent: action.data.xPosCurrent,
        yPosCurrent: action.data.yPosCurrent,
      });
    case types.HIDE_EVENT_POPUP:
      return Object.assign({}, state, initialState);
    default: {
      return state;
    }
  }
}

export default popupReducer;
