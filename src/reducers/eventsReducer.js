import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS, SET_EVENT_PROFILE_BY_ID, FILTER_EVENTS, FILTER_EVENTS_BY_MONTH, SET_EVENTS_SUMMARY } from '../actions/eventActions';
import { filterEventArrayByMonth, filterEventArray, parseEvents, getSummary } from '../helpers/eventHelper';

const initialState = {
  eventsList: [],
  filteredEvents: [],
  filteredByMonth: [],
  eventProfile: {},
  summary: {},
};

const noEventFound = {
  name: 'No event found',
};

function eventReducer(state = initialState, action) {
  let filteredById = '';
  let arrayForFilter = '';
  switch (action.type) {
    case LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: parseEvents(action.events) });
    case SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    case SET_EVENT_PROFILE_BY_ID:
      filteredById = (state.filteredEvents.length === 0 && action.eventData.isFiltered === false)
        ? state.eventsList.filter(item => item.id.toString() === action.eventData.id)
        : state.filteredEvents.filter(item => item.id.toString() === action.eventData.id);
      return Object.assign({}, state, {
        eventProfile: filteredById.length > 0 ? filteredById[0] : noEventFound,
      });
    case FILTER_EVENTS:
      return Object.assign({}, state, {
        filteredEvents: filterEventArray(action.filter, state.eventsList),
      });
    case SET_EVENTS_SUMMARY:
      return Object.assign({}, state, { summary: getSummary(state, action) });
    case FILTER_EVENTS_BY_MONTH:
      arrayForFilter = state.filteredEvents.length >= 0 && action.data.isFiltered === true
        ? state.filteredEvents
        : state.eventsList;
      return Object.assign({}, state, {
        filteredByMonth: filterEventArrayByMonth(action.data.month, arrayForFilter),
      });
    default: {
      return state;
    }
  }
}

export default eventReducer;
