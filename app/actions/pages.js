import constants from '../constants';
import { AsyncStorage, } from 'react-native';
// import Immutable from 'immutable';

const pages = {
  /**
   * @param {string} location name of extension to load
   */
  changePage(location) {
    return (dispatch) => {
      if (location !== 'login') {
        AsyncStorage.setItem(constants.pages.ASYNCSTORAGE_KEY, location);
      }
      dispatch(this.setPage(location));
    };
  },
  setPage(location) {
    return {
      type: constants.pages.LOAD_PAGE_ACTION,
      payload: { location, },
    };
  },
  initialAppLoad(location) {
    return {
      type: constants.pages.INITIAL_APP_LOADED,
      payload: { location },
    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  initialAppLoaded() {
    return (dispatch) => {
      AsyncStorage.getItem(constants.pages.ASYNCSTORAGE_KEY)
        .then((page_location) => {
          console.log('loaded page_location from asyncstorage', page_location);
          dispatch(this.initialAppLoad(page_location));
        })
        .catch((error) => {
          console.error('error while loading from asyncstorage', error);
          dispatch(this.initialAppLoad());
        });
    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  resetAppLoadedState() {
    return {
      type: constants.pages.RESET_APP_LOADED,
      payload: { },
    };
  },
};

export default pages;