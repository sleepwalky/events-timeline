// Event actions
export const LOAD_EVENTS_LIST_SUCCESS = 'LOAD_EVENTS_LIST_SUCCESS';
export const SET_EVENT_PROFILE = 'SET_EVENT_PROFILE';
export const SET_EVENT_PROFILE_BY_ID = 'SET_EVENT_PROFILE_BY_ID';

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

export function setEventProfileById(eventId) {
  return {
    type: SET_EVENT_PROFILE_BY_ID,
    eventId,
  };
}
