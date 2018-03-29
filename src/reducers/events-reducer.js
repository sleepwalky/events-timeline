import * as types from '../actions/action-types';

const initialState = {
  eventsList: [],
  eventProfile: {},
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: action.events });
    case types.SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    default: {
      return state;
    }
  }
}

export default eventReducer;
