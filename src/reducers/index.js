import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import overlayReducer from './overlayReducer';
import popupReducer from './popupReducer';
import tableReducer from './tableReducer';

const reducers = combineReducers({
  event: eventsReducer,
  overlay: overlayReducer,
  popup: popupReducer,
  table: tableReducer,
});

export default reducers;
