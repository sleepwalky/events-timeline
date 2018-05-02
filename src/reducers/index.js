import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import overlayReducer from './overlayReducer';
import tableReducer from './tableReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  event: eventsReducer,
  overlay: overlayReducer,
  table: tableReducer,
  filter: filterReducer,
});

export default reducers;
