import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import overlayReducer from './overlayReducer';
import popupReducer from './popupReducer';
import tableReducer from './tableReducer';
import filterReducer from './topicsFilterReducer';

const reducers = combineReducers({
  event: eventsReducer,
  overlay: overlayReducer,
  popup: popupReducer,
  table: tableReducer,
  filter: filterReducer,
});

export default reducers;
