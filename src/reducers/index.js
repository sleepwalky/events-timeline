import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import overlayReducer from './overlayReducer';
import popupReducer from './popupReducer';

const reducers = combineReducers({
  event: eventsReducer,
  overlay: overlayReducer,
  popup: popupReducer,
});

export default reducers;
