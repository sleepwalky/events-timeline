import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS, SET_EVENT_PROFILE_BY_ID, FILTER_EVENTS, SET_EVENTS_FILTER } from '../actions/eventActions';

const initialState = {
  eventsList: [],
  filteredEvents: [],
  eventsFilter: [],
  eventProfile: {},
};

const noEventFound = {
  name: 'No event found',
};

const topics = {
  js: ['Javascript', 'JS'],
  react: ['React', 'ReactJS'],
  css: ['CSS', 'Cascading Style Sheets'],
  html: ['HTML', 'Hypertext Markup Language'],
};

function eventReducer(state = initialState, action) {
  let events = '';
  let filteredById = '';
  const topicsArray = [];
  switch (action.type) {
    case LOAD_EVENTS_LIST_SUCCESS:
      if (state.eventsFilter.length > 0) {
        state.eventsFilter.forEach(filter => {
          if (topics[filter]) {
            topics[filter].forEach(topic => {
              action.events.forEach(event => {
                if (event.topics) {
                  if (event.topics.join(',').toLowerCase().replace(/ /g, '').indexOf(topic.toLowerCase()) !== -1) {
                    topicsArray.push(event);
                  }
                }
              });
            });
          }
        });
        events = topicsArray.length > 0 ? topicsArray : [];
        return Object.assign({}, state, { filteredEvents: events, eventsList: action.events });
      }
      return Object.assign({}, state, { eventsList: action.events });
    case SET_EVENT_PROFILE:
      return Object.assign({}, state, { eventProfile: action.data });
    case SET_EVENT_PROFILE_BY_ID:
      filteredById = state.eventsList.filter(item => item.id.toString() === action.eventId);
      events = filteredById.length > 0 ? filteredById[0] : noEventFound;
      return Object.assign({}, state, { eventProfile: events });
    case SET_EVENTS_FILTER:
      return Object.assign({}, state, { eventsFilter: action.filters });
    case FILTER_EVENTS:
      action.param.forEach(filter => {
        if (topics[filter]) {
          topics[filter].forEach(topic => {
            state.eventsList.forEach(event => {
              if (event.topics) {
                if (event.topics.join(',').toLowerCase().replace(/ /g, '').indexOf(topic.toLowerCase()) !== -1) {
                  topicsArray.push(event);
                }
              }
            });
          });
        }
      });
      events = topicsArray.length > 0 ? topicsArray : [];
      return Object.assign({}, state, { filteredEvents: events });
    default: {
      return state;
    }
  }
}

export default eventReducer;
