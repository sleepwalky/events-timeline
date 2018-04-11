import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import overlayReducer from './overlayReducer';
import popupReducer from './popupReducer';
import tableReducer from './tableReducer';
import filterReducer from './topicsFilterReducer';
import headerReducer from './headerReducer';

const reducers = combineReducers({
  event: eventsReducer,
  overlay: overlayReducer,
  popup: popupReducer,
  table: tableReducer,
  filter: filterReducer,
  header: headerReducer,
});

export default reducers;
