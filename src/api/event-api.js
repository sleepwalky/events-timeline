import axios from 'axios';
import store from '../redux/store';
import { getEventSuccess } from '../redux/reducers/actions/event-action';

export function getEventsList() {
  return axios.get( '/events' )
    .then( response => {
      store.dispatch( getEventSuccess( response.data ) );
      return response;
    } );
}
