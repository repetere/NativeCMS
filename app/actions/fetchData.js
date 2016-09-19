import constants from '../constants';
// import Immutable from 'immutable';

const fetchData = {
  /**
   * @param {string} url restful resource
   * @param {object} options what-wg fetch options
   */
  requestFetchData(url, options, responseFormatter) {
    return {
      type: constants.fetchData.FETCH_DATA_REQUEST,
      payload: { url, options, responseFormatter, },
    };
  },
  /**
   * @param {string} location name of extension to load
   */
  recievedFetchData(response, json) {
    return {
      type: constants.fetchData.FETCH_DATA_SUCCESS,
      payload: {
        response,
        json,
        updatedAt: Date.now(),
      },
    };
  },
   /**
   * @param {string} location name of extension to load
   */
  failedFetchData(url, response) {
    return {
      type: constants.fetchData.FETCH_DATA_FAILURE,
      payload: {
        response,
        url,
        updatedAt: Date.now(),
      },
    };
  },
};

export default fetchData;