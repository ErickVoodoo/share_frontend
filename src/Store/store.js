import { combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { compose } from 'redux';
import { rootEpic } from './epic.js';

// redurers
import core from './Reducers/core.js';
import products from './Reducers/product.js';
import behaviors from './Reducers/behavior.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(
  rootEpic,
);

export const reducers = combineReducers({
  core,
  products,
  behaviors,
});

export const middlewares = composeEnhancers(
  applyMiddleware(
    epicMiddleware,
  )
);
