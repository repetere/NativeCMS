import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  isLoggedIn:false,
  profile: false,
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  profile_image_preview: null,
  jwt_token: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
  case constants.user.FETCH_DATA_REQUEST:
    var requestPayload = action.payload;
    return Object.assign(state, {
      isFetching: true,
      url: requestPayload.url,
      options: requestPayload.options,
    });
  case constants.user.FETCH_DATA_SUCCESS:
    var successPayload = action.payload;
    return Object.assign({
      isFetching: false,
      url: successPayload.url,
      error: null,
      response: successPayload.response,
      json: successPayload.json,
      updatedAt: successPayload.updatedAt,
    });
  case constants.user.FETCH_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign(state, {
      isFetching: false,
      url: failurePayload.url,
      error: failurePayload.error,
      updatedAt: failurePayload.updatedAt,
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default userReducer;