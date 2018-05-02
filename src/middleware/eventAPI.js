import axios from 'axios';
import React from 'react';
import { getEventsSuccess, filterEvents, setEventProfileById, setEventsSummary } from '../actions/eventActions';
import { hideOverlay, showOverlay } from '../actions/overlayActions';
import { setFilters } from '../actions/filterActions';
import { getUrlValueByName } from '../helpers/urlHelper';
import EventPopup from '../components/popup/eventPopup';
import store from '../store';

export const getEventsList = params => dispatch => {
  return axios.get('/events').then(response => {
    dispatch(getEventsSuccess(response.data));
    dispatch(hideOverlay());
    return response.data;
  }).then(() => {
    const filterData = getUrlValueByName('filter');
    if (filterData) {
      dispatch(filterEvents(filterData));
      dispatch(setFilters(filterData));
    }
    const eventId = getUrlValueByName('eventId');
    if (eventId) {
      const eventData = {
        id: eventId,
        isFiltered: !!filterData,
      };
      dispatch(setEventProfileById(eventData));
      const { eventProfile } = store.getState().event;
      const data = {
        extraClass: 'popup',
        title: eventProfile.name,
        content: <EventPopup
          eventProfile={eventProfile}
        />,
        open: true,
      };
      dispatch(showOverlay(data));
    }
    dispatch(setEventsSummary({
      displayed: params.displayed ? params.displayed : new Date().getMonth(),
      isFiltered: !!filterData,
      view: params.view,
    }));
  }).catch(error => {
    dispatch(showOverlay({
      extraClass: 'error',
      title: 'Loading data',
      content: `An error <${error.message}> occurred while loading the calendar. Please, try to refresh later!`,
      open: true,
    }));
  });
};
