import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import user from './user';
import products from './products';
import singleProduct from './singleProduct';


const reducer = combineReducers({
  auth,
  cart,
  user,
  products,
  singleProduct,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './user';
export * from './products'; //not sure what this does but im following suit. (I.A.)
export * from './singleProduct';