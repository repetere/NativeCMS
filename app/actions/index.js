import constants from '../constants';
// import Immutable from 'immutable';

const actionCreators = {
  pages:{
    /**
     * @param {string} location name of extension to load
     */
    changePage(location) {
      return {
        type: constants.pages.LOAD_PAGE_ACTION,
        payload: { location, },
      };
    },
  },
};

export default actionCreators;
