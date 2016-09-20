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
  error: null,
  fetchedDataPageCount: 0,
  fetchedDataNextPageUrl: null,
};

const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.fetchData.FETCH_DATA_REQUEST:
    let requestPayload = action.payload;
    return Object.assign(state, {
      isFetching: true,
      url: requestPayload.url,
      options: requestPayload.options,
    });
  case constants.fetchData.FETCH_DATA_SUCCESS:
    let successPayload = action.payload;
    return Object.assign(state, {
      isFetching: false,
      error: null,
      response: successPayload.response,
      json: successPayload.json,
      updatedAt: successPayload.updatedAt,
    });
  case constants.fetchData.FETCH_DATA_FAILURE:
    let failurePayload = action.payload;
    return Object.assign(state, {
      isFetching: false,
      url: failurePayload.url,
      error: failurePayload.error,
      updatedAt: failurePayload.updatedAt,
    });
  default:
    return state;
  }
};

export default fetchDataReducer;