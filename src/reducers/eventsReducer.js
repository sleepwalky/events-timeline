import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS, SET_EVENT_PROFILE_BY_ID } from '../actions/eventActions';

const initialState = {
  eventsList: [],
  eventProfile: {},
};

const noEventFound = {
  name: 'No event found',
};

function eventReducer(state = initialState, action) {
  let event = '';
  let filteredArray = '';
  switch (action.type) {
    case LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: action.events });
    case SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    case SET_EVENT_PROFILE_BY_ID:
      filteredArray = state.eventsList.filter(item => item.id.toString() === action.eventId);
      event = filteredArray.length > 0 ? filteredArray[0] : noEventFound;
      return Object.assign({}, state, { eventProfile: event });
    default: {
      return state;
    }
  }
}

export default eventReducer;
