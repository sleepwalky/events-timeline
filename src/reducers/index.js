import { combineReducers } from 'redux';

// Reducers
import eventsReducer from './events-reducer';

// Combine Reducers
const reducers = combineReducers({
  eventsState: eventsReducer
});
export default reducers;
