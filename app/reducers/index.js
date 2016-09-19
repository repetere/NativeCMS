import { combineReducers, } from 'redux';
import pageReducer from './pages';
import fetchDataReducer from './pages';
import clientCacheDataReducer from './pages';
import tabBarExtensionReducer from './tabBarExtensions';
import { routerReducer, } from 'react-router-redux';

const NativeCMSReducer = combineReducers({
  page: pageReducer,
  tabBarExtensions: tabBarExtensionReducer,
  routing: routerReducer,
  fetchData: fetchDataReducer,
  clientCacheData: clientCacheDataReducer,
});

export default NativeCMSReducer;