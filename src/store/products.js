import axios from 'axios';

//Action Types
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

//Action Creators
const _fetchProducts = allProducts => {
  return {
    type: FETCH_PRODUCTS,
    allProducts,
  };
};

//Thunks
const fetchProducts = () => {
  return async dispatch => {
    const allProducts = (await axios.get('/api/products')).data;
    dispatch(_fetchProducts(allProducts));
  };
};

//Reducer

const products = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.allProducts];
    default:
      return state;
  }
};

export { fetchProducts };
export default products;
