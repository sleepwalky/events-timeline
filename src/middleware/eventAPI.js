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
      title: 'Problems with fetching data',
      content: error.message,
      open: true,
    }));
    getEventsList();
  });
}
