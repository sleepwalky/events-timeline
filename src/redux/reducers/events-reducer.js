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
  }
};

const eventReducer = function ( state = initialState , action ) {
  switch ( action.type ) {

    case types.LOAD_EVENTS_LIST:
      return Object.assign( {} , state , { eventsList : action.events } );
    case types.LOAD_SINGLE_EVENT:
      return Object.assign( {} , state , { eventProfile : action.event } );
    default: {
    }

  }
  return state;
};

export default eventReducer;
