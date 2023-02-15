import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import user from './user';
import products from './products';
import singleProduct from './singleProduct';
import order from './order';
import wishList from './wishList';
import productReviews from './productReviews';

const reducer = combineReducers({
  auth,
  cart,
  user,
  products,
  singleProduct,
  order,
  wishList,
  productReviews,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './user';
export * from './products'; //not sure what this does but im following suit. (I.A.)
export * from './singleProduct';
export * from './order';
export * from './wishList';
export * from './productReviews';
