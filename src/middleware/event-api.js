import axios from 'axios';
import store from '../store/store';
import { getEventsSuccess } from '../actions/event-action';
import { showOverlay } from '../actions/overlay-action';

const data = {
  type: '',
  class: '',
  title: '',
  content: '',
  open: false,
};

export function getEventsList() {
  return axios.get('/events').then((response) => {
    store.dispatch(getEventsSuccess(response.data));
    store.dispatch(showOverlay(data));
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
