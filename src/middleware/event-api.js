import axios from 'axios';
import store from '../store/store';
import {
  getEventsSuccess,
  getEventsFailure,
  getSingleEventFailure,
  getSingleEventSuccess,
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

export function getSingleEvent() {
  return axios.get('/events/:id')
    .then((response) => {
      store.dispatch(getSingleEventSuccess(response.data));
      return response;
    })
    .catch((error) => {
      store.dispatch(getSingleEventFailure(error.message));
      return error.message;
    });
}
