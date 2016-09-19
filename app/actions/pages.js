import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  location:'home',
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
    var page = action.payload.page;
    return Object.assign(state, { page, });
  default:
    return state;
  }
};

export default pageReducer;