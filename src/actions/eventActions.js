// Event actions
export const LOAD_EVENTS_LIST_SUCCESS = 'LOAD_EVENTS_LIST_SUCCESS';
export const SET_EVENT_PROFILE = 'SET_EVENT_PROFILE';
export const SET_EVENT_PROFILE_BY_ID = 'SET_EVENT_PROFILE_BY_ID';
export const FILTER_EVENTS = 'FILTER_EVENTS';
export const FILTER_EVENTS_BY_MONTH = 'FILTER_EVENTS_BY_MONTH';
export const SET_EVENTS_SUMMARY = 'SET_EVENTS_SUMMARY';

export function getEventsSuccess(events) {
  return {
    type: LOAD_EVENTS_LIST_SUCCESS,
    events,
  };
}

export function setEventProfile(data) {
  return {
    type: SET_EVENT_PROFILE,
    data,
  };
}

export function setEventProfileById(eventData) {
  return {
    type: SET_EVENT_PROFILE_BY_ID,
    eventData,
  };
}

export function filterEvents(filter) {
  return {
    type: FILTER_EVENTS,
    filter,
  };
}

export function filterEventsByMonth(data) {
  return {
    type: FILTER_EVENTS_BY_MONTH,
    data,
  };
}

export function setEventsSummary(data) {
  return {
    type: SET_EVENTS_SUMMARY,
    data,
  };
}
