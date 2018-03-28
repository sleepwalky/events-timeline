import axios from 'axios';
import store from '../store/store';
import {
  getEventsSuccess,
  getEventsFailure
} from '../actions/event-action';

export function getEventsList() {
  return axios.get('/events')
    .then((response) => {
      store.dispatch(getEventsSuccess(response.data));
      return response;
    })
    .catch((error) => {
      store.dispatch(getEventsFailure(error.message));
      return error.message;
    });
}
