import { SET_MONTH, SET_DISPLAY_TO_TABLE, SET_NEXT_PREV_MONTH, SET_VIEW_TO_TABLE } from '../actions/tableActions';
import { months } from '../helpers/consts';

const initialState = {
  displayedMonth: new Date().getMonth(),
  view: 'months',
  display: months,
  currentMonth: new Date().getMonth(),
  nextMonth: new Date().getMonth() + 1,
  prevMonth: new Date().getMonth() - 1,
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return Object.assign({}, state, { displayedMonth: action.month });
    case SET_DISPLAY_TO_TABLE:
      return Object.assign({}, state, { display: action.display });
    case SET_NEXT_PREV_MONTH:
      return Object.assign({}, state, {
        nextMonth: +state.displayedMonth + 1,
        prevMonth: +state.displayedMonth - 1,
      });
    case SET_VIEW_TO_TABLE:
      return Object.assign({}, state, { view: action.view });
    default: {
      return state;
    }
  }
}

export default tableReducer;
