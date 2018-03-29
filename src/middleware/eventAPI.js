import axios from 'axios';
import { getEventsSuccess } from '../actions/eventActions';
import { hideOverlay, showOverlay } from '../actions/overlayActions';

export const getEventsList = () => (dispatch) => {
  return axios.get('/events').then((response) => {
    dispatch(getEventsSuccess(response.data));
    dispatch(hideOverlay());
  }).catch(() => {
    dispatch(showOverlay({
      class: 'error',
      title: 'Loading data',
      content: 'An error occurred while loading the calendar. Please, try to refresh later!',
      open: true,
    }));
  });
};
