import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  location: 'home',
  initial_app_state_loaded: false,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
      console.log('updating page state');    
    var location = action.payload.location;
    return Object.assign(state, { location, });
  case constants.pages.INITIAL_APP_LOADED:
    return Object.assign(state, { initial_app_state_loaded:true, });
  default:
    return state;
  }
};

export default pageReducer;