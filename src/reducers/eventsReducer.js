import { SET_EVENT_PROFILE, LOAD_EVENTS_LIST_SUCCESS, SET_EVENT_PROFILE_BY_ID, FILTER_EVENTS, FILTER_EVENTS_BY_MONTH, SET_EVENTS_SUMMARY } from '../actions/eventActions';

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

function checkElemtntInArray(array, elementId) {
  const tempArr = array.filter(item => {
    return item.id.toString() === elementId.toString();
  });
  return tempArr.length === 0;
}

function filterEventArrayByMonth(month, eventsArray) {
  const filteredEventsByMonth = [];
  if (month !== null) {
    eventsArray.forEach(event => {
      const eventMonth = new Date(event.startDate).getMonth();
      if (eventMonth === month) {
        filteredEventsByMonth.push(event);
      }
    });
  } else {
    return eventsArray;
  }
  return filteredEventsByMonth.length > 0 ? filteredEventsByMonth : [];
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
function getEventType(eventNmae) {
  const fullStringName = eventNmae.replace(/ /g, '').toLowerCase();
  if (fullStringName.indexOf('meetup') !== -1 || fullStringName.indexOf('meet-up') !== -1) {
    return 'meetup';
  } else if (fullStringName.indexOf('talk') !== -1) {
    return 'talks';
  } else if (fullStringName.indexOf('rollingscopes') !== -1) {
    return 'meetup';
  } else if (fullStringName.indexOf('openday') !== -1) {
    return 'openday';
  } else if (fullStringName.indexOf('itday') !== -1) {
    return 'meetup';
  } else if (fullStringName.indexOf('hackathon') !== -1) {
    return 'ccupdate';
  } else if (fullStringName.indexOf('truestory') !== -1) {
    return 'meetup';
  }
  return 'others';
}

function getSummaryInfo(events) {
  const summary = {
    talks: 0,
    meetup: 0,
    openday: 0,
    ccupdate: 0,
    others: 0,
  };

  events.forEach(event => {
    const eventType = getEventType(event.name);
    summary[eventType] += 1;
  });
  return summary;
}

function getSummary(state, action) {
  if (action.data.isFiltered) {
    if (action.data.view === 'months') {
      return getSummaryInfo(state.filteredEvents);
    }
    return getSummaryInfo(filterEventArrayByMonth(action.data.displayed, state.filteredEvents));
  } else {
    if (action.data.view === 'weeks' || action.data.view === 'nextweeks' || action.data.view === 'prevweeks') {
      return getSummaryInfo(filterEventArrayByMonth(action.data.displayed, state.eventsList));
    }
    return getSummaryInfo(filterEventArrayByMonth(null, state.eventsList));
  }
}

function parseEvents(events) {
  const parsedArray = [];
  events.forEach(entity => {
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
  return parsedArray;
}

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
