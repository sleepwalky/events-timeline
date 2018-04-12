import axios from 'axios';
import { getEventsSuccess, filterEvents, setEventProfileById, setEventsSummary } from '../actions/eventActions';
import { hideOverlay, showOverlay } from '../actions/overlayActions';
import { setFilters } from '../actions/filterActions';
import { showPopup } from '../actions/popupActions';

function getUrlParam(name) {
  const params = window.location.search.split('?')[1];
  if (params !== '' && params !== undefined) {
    let paramValue = '';
    params.split('&').forEach(param => {
      const paramName = param.split('=')[0];
      if (paramName === 'filter' && name === 'filter') {
        paramValue = param.split('=')[1] !== '' ? param.split('=')[1].split(',') : [];
      }
      if (paramName === 'eventId' && name === 'eventId') {
        paramValue = param.split('=')[1] ? param.split('=')[1] : '';
      }
    });
    return paramValue;
  }
}
export const getEventsList = params => dispatch => {
  return axios.get('/events').then(response => {
    dispatch(getEventsSuccess(response.data));
    dispatch(hideOverlay());
    return response.data;
  }).then(() => {
    const filterData = getUrlParam('filter');
    if (filterData) {
      dispatch(filterEvents(filterData));
      dispatch(setFilters(filterData));
    }
    const eventId = getUrlParam('eventId');
    if (eventId) {
      const data = {
        display: true,
      };
      const eventData = {
        id: eventId,
        isFiltered: filterData,
      };
      dispatch(setEventProfileById(eventData));
      dispatch(showPopup(data));
    }
    dispatch(setEventsSummary({
      displayed: params.displayed ? params.displayed : new Date().getMonth(),
      isFiltered: filterData,
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
