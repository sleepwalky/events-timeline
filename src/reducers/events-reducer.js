import * as types from '../actions/action-types';

const initialState = {
  eventsList: [],
  eventProfile: {
    _id: '',
    id: '',
    title: '',
    period: '',
    start_date: '',
    end_date: '',
    url: '',
    background_image_url: ''
  },
  error: ''
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign({}, state, { eventsList: action.events });
    case types.LOAD_EVENTS_LIST_FAILURE:
      return Object.assign({}, state, { error: action.error });
    default: {
      return state;
    }
  }
}

export default eventReducer;
