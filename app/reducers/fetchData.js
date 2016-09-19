import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  isFetching:false,
  didInvalidate: false,
  updatedAt: null,
  url: null,
  response: null,
  responseFormatter: null,
  json: null,
  fetchedDataPageCount: 0,
  fetchedDataNextPageUrl: null,
};

const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.pages.LOAD_PAGE_ACTION:
    var location = action.payload.location;
    return Object.assign(state, { location, });
  default:
    return state;
  }
};

export default fetchDataReducer;