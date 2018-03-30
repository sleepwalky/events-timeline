import { SET_MONTH } from '../actions/tableActions';

const initialState = {
  monthDisplayed: '',
};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return Object.assign({}, state, { monthDisplayed: action.month });
    default: {
      return state;
    }
  }
}

export default tableReducer;
