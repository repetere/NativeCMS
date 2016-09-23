import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  isFetching: false,
  updatedAt: new Date(),
  loginURL: null,
  isLoggedIn:false,
  userdata: false,
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  profile_image_preview: null,
  jwt_token: null,
  jwt_token_expires:null,
  jwt_token_timeout:null,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
  case constants.user.LOGIN_DATA_REQUEST:
    // var requestPayload = action.payload;
    return Object.assign(state, {
      isFetching: true,
      loginURL: action.payload.url,
      updatedAt: new Date(),
    });
  case constants.user.LOGIN_DATA_SUCCESS:
  case constants.user.SAVE_DATA_SUCCESS:
    var successPayload = action.payload;
    return Object.assign({
      isFetching: false,
      loginURL: successPayload.url,
      isLoggedIn: true,
      error: null,
      email: successPayload.json.user.email,
      firstname: successPayload.json.user.firstname,
      lastname: successPayload.json.user.lastname,
      profile_image_preview: successPayload.json.user.primaryasset.attributes.location,
      jwt_token: successPayload.json.token,
      jwt_token_expires: successPayload.json.expires,
      jwt_token_timeout: successPayload.json.timeout,
      userdata: successPayload.json.user,
      updatedAt: successPayload.updatedAt,
    });
  case constants.user.USER_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign(state, {
      isFetching: false,
      loginURL: failurePayload.url,
      error: failurePayload.error,
      updatedAt: new Date(),
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default userReducer;