import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'reducers';
import promise from 'store/promise';

const configureStore = (history) => {
  const middleware = [
    thunk,
    promise,
    routerMiddleware(history)
  ];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

  return store;
};

export default configureStore;
