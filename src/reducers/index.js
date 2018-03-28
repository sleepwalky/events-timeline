import { combineReducers } from 'redux';

// Reducers
import eventsReducer from './events-reducer';
import overlayReducer from './overlay-reducer';

// Combine Reducers
const reducers = combineReducers({
  eventsState: eventsReducer,
  overlayState: overlayReducer,
});
export default reducers;
