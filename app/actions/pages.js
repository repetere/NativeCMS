import constants from '../constants';
// import Immutable from 'immutable';

const pages = {
  /**
   * @param {string} location name of extension to load
   */
  changePage(location) {
    return {
      type: constants.pages.LOAD_PAGE_ACTION,
      payload: { location, },
    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  initialAppLoaded() {
    return {
      type: constants.pages.INITIAL_APP_LOADED,
      payload: { },
    };
  },
};

export default pages;