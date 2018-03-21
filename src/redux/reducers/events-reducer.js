import * as types from './actions/action-types';

const initialState = {
  eventsList : [] ,
  eventProfile : {
    id : '' ,
    name : '' ,
    date : '' ,
    duration : '',
    type:'',
    speakers:[]
  },
  error:''
};

const eventReducer = function ( state = initialState , action ) {
  switch ( action.type ) {

    case types.LOAD_EVENTS_LIST_SUCCESS:
      return Object.assign( {} , state , { eventsList : action.events } );
    case types.LOAD_EVENTS_LIST_FAILURE:
      return Object.assign( {} , state , { error : action.error } );
    case types.LOAD_SINGLE_EVENT:
      return Object.assign( {} , state , { eventProfile : action.event } );
    default: {
    }

  }
  return state;
};

export default eventReducer;
