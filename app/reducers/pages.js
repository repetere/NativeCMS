import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  location: 'home',
  initial_app_state_loaded: false,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
    var location = action.payload.location;
      console.log('updating page state location',location);    
    return Object.assign(state, { location, });
  case constants.pages.INITIAL_APP_LOADED:
      // console.log('initial_app_state_loaded state', state);
    return { location: action.payload.location || state.location, initial_app_state_loaded:true, };
  case constants.pages.RESET_APP_LOADED:
    return { location:state.location, initial_app_state_loaded:false, };
  default:
    return state;
  }
};

export default pageReducer;