import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './products';
import singleProduct from './singleProduct';

const reducer = combineReducers({
  auth,
  cart,
  products,
  singleProduct,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './products'; //not sure what this does but im following suit. (I.A.)
export * from './singleProduct';
