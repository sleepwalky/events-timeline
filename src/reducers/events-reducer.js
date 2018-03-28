import * as types from '../actions/action-types';

const initialState = {
  eventsList: [],
  eventProfile: {},
  display: false,
  xPosCurrent: 0,
  yPosCurrent: 0,
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: action.events });
    case types.SHOW_EVENT_POPUP:
      return Object.assign({}, state, {
        xPosCurrent: action.data.xPosCurrent,
        yPosCurrent: action.data.yPosCurrent,
        display: action.data.display === true ? 'block' : 'none',
        eventProfile: action.data.event,
      });
    default: {
      return state;
    }
  }
}

export default eventReducer;
