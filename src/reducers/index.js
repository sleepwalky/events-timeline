import { combineReducers } from 'redux';

// Reducers
import eventsReducer from './events-reducer';
import overlayReducer from './overlay-reducer';
import popupReducer from './popup-reducer';

// Combine Reducers
const reducers = combineReducers({
  eventsState: eventsReducer,
  overlayState: overlayReducer,
  popupState: popupReducer,
});
export default reducers;
