import axios from 'axios';
import store from '../store/store';
import { getEventsSuccess } from '../actions/eventActions';
import { hideOverlay, showOverlay } from '../actions/overlayActions';

export function getEventsList() {
  return axios.get('/events').then((response) => {
    store.dispatch(getEventsSuccess(response.data));
    store.dispatch(hideOverlay());
  }).catch((error) => {
    store.dispatch(showOverlay({
      class: 'error',
      title: 'Loading data',
      content: 'An error occurred while loading the calendar. Please, try to refresh later!',
      open: true,
    }));
  });
}
