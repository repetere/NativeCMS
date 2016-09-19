import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import combinedReducers from '../reducers';

// const logger = (store) => (next) => (action) => {
//   console.log('dispatching: ', action);
//   return next(action);
// };//
const logger = createLogger();

const NativeCMSStore = createStore(
  combinedReducers,
  applyMiddleware(thunk, promise, logger)
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(combinedReducers, () => {
    const nextRootReducer = combinedReducers;
    NativeCMSStore.replaceReducer(nextRootReducer);
  });
}

export default NativeCMSStore;
