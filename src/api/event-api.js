import axios from 'axios';
import store from '../redux/store';
import { getEventsSuccess } from '../redux/reducers/actions/event-action';

export function getEventsList() {
  return axios.get( '/events' )
    .then( response => {
      store.dispatch( getEventsSuccess( response.data ) );
      return response;
    } );
}
