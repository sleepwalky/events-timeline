import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS } from '../actions/eventActions';

const initialState = {
  eventsList: [],
  eventProfile: {},
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: action.events });
    case SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    default: {
      return state;
    }
  }
}

export default eventReducer;
