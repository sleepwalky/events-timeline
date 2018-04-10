import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS, SET_EVENT_PROFILE_BY_ID, FILTER_EVENTS } from '../actions/eventActions';

const initialState = {
  eventsList: [],
  filteredEvents: [],
  eventProfile: {},
};

const noEventFound = {
  name: 'No event found',
};

function checkElemtntInArray(array, elementId) {
  const tempArr = array.filter(item => {
    return item.id.toString() === elementId.toString();
  });
  return tempArr.length === 0;
}

function filterEventArray(eventsFilter, eventsArray) {
  const filteredEvents = [];
  eventsFilter.forEach(filter => {
    eventsArray.forEach(event => {
      if (event.topics.length > 0) {
        event.topics.forEach(eventTopic => {
          if (eventTopic.toLowerCase().includes(filter.toLowerCase())) {
            if (checkElemtntInArray(filteredEvents, event.id)) {
              filteredEvents.push(event);
            }
          }
        });
      }
    });
  });
  return filteredEvents.length > 0 ? filteredEvents : [];
}

function eventReducer(state = initialState, action) {
  let events = '';
  let filteredById = '';
  const parsedArray = [];
  switch (action.type) {
    case LOAD_EVENTS_LIST_SUCCESS:
      action.events.forEach(entity => {
        if (entity.events) {
          entity.events.forEach(event => {
            if (checkElemtntInArray(parsedArray, event.id)) {
              parsedArray.push(event);
            }
          });
        } else {
          if (checkElemtntInArray(parsedArray, entity.id)) {
            parsedArray.push(entity);
          }
        }
      });

      return Object.assign({}, state, { eventsList: parsedArray });
    case SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    case SET_EVENT_PROFILE_BY_ID:
      filteredById = (state.filteredEvents.length === 0 && action.eventData.isFiltered === false)
        ? state.eventsList.filter(item => item.id.toString() === action.eventData.id)
        : state.filteredEvents.filter(item => item.id.toString() === action.eventData.id);
      events = filteredById.length > 0 ? filteredById[0] : noEventFound;
      return Object.assign({}, state, { eventProfile: events });
    case FILTER_EVENTS:
      events = filterEventArray(action.filter, state.eventsList);
      return Object.assign({}, state, { filteredEvents: events });
    default: {
      return state;
    }
  }
}

export default eventReducer;
