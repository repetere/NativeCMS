import constants from '../constants';
import LoginSettings from '../../content/config/login.json';
import AppConfigSettings from '../../content/config/settings.json';
import { AsyncStorage, } from 'react-native';
// import Immutable from 'immutable';

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const user = {
  /**
   * @param {string} url restful resource
   */
  loginRequest(url) {
    return {
      type: constants.user.LOGIN_DATA_REQUEST,
      payload: {
        url,
      },
    };
  },
  /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  recievedLoginUser(url, response, json) {
    return {
      type: constants.user.LOGIN_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} location name of extension to load
  */
  failedUserRequest(url, error) {
    return {
      type: constants.user.USER_DATA_FAILURE,
      payload: {
        url,
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} url url for fetch request
  * @param {object} options what-wg fetch options
  * @param {function} responseFormatter custom reponse formatter, must be a function that returns a promise that resolves to json/javascript object
  */
  loginUser(loginData,responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      let url = LoginSettings.url;
      dispatch(this.loginRequest(url));
      fetch(url, {
        method: LoginSettings.method || 'POST',
        headers: Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, LoginSettings.headers, {
          username: loginData.username,
          password: loginData.password,
        }),
        // body: JSON.stringify({
        //   username: loginData.username,
        //   password: loginData.password,
        // })
      })
        .then(checkStatus)
        .then((response) => {
          fetchResponse = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          AsyncStorage.setItem(`${AppConfigSettings.name}_jwt_token`, responseData.token);
          dispatch(this.recievedLoginUser(url, fetchResponse, responseData));
        })
        .catch((error) => {
          dispatch(this.failedUserRequest(url, error));
        });
    };
  },
};

export default user;