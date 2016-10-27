import constants from '../constants';
import { AsyncStorage, } from 'react-native';
import customSettings from '../../content/config/settings.json';
// import Immutable from 'immutable';

const pages = {
  /**
   * @param {string} location name of extension to load
   */
  updateTabExtensions(arrayOfTabExtensions) {
    return {
      type: constants.tabBarExtensions.SET_EXTENSIONS_ACTION,
      payload: { arrayOfTabExtensions },
    };
  },
  /**
   * once initial check of user login status, then set app state to loaded
   */
  setTabExtensions(arrayOfTabExtensions) {
    // let initialLocation = (customSettings.defaultExtensionRoute) ? customSettings.defaultExtensionRoute : location;
    return (dispatch) => {
      // AsyncStorage.getItem(constants.pages.ASYNCSTORAGE_KEY)
      //   .then((page_location) => {
      //     dispatch(this.initialAppLoad(page_location));
      //   })
      //   .catch((error) => {
      //     dispatch(this.initialAppLoad(initialLocation));
      //   });
      dispatch(this.updateTabExtensions(arrayOfTabExtensions));
    };
  },
};

export default pages;