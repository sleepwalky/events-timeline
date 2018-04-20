import axios from 'axios';
import { getEventsSuccess, filterEvents, setEventProfileById, setEventsSummary } from '../actions/eventActions';
import { hideOverlay, showOverlay } from '../actions/overlayActions';
import { setFilters } from '../actions/filterActions';
import { showPopup } from '../actions/popupActions';
import { getUrlValueByName } from '../helpers/urlHelper';

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
      const data = {
        display: true,
      };
      const eventData = {
        id: eventId,
        isFiltered: !!filterData,
      };
      dispatch(setEventProfileById(eventData));
      dispatch(showPopup(data));
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
