import { createStore, applyMiddleware, } from 'redux';
import combinedReducers from '../reducers';

const logger = (store) => (next) => (action) => {
  console.log('dispatching: ', action);
  return next(action);
};//

const NativeCMSStore = createStore(
  combinedReducers,
  applyMiddleware(logger)
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(combinedReducers, () => {
    const nextRootReducer = combinedReducers;
    NativeCMSStore.replaceReducer(nextRootReducer);
  });
}

export default NativeCMSStore;
