import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  location:'home',
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
    var location = action.payload.location;
    return Object.assign(state, { location, });
  default:
    return state;
  }
};

export default pageReducer;