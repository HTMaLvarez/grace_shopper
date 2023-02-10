import axios from 'axios';

//Action Type
const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT';

//Action Creator
const _fetchSingleProduct = singleProduct => {
  return {
    type: FETCH_SINGLE_PRODUCT,
    singleProduct,
  };
};

//Thunk
const fetchSingleProduct = productId => {
  return async dispatch => {
    const singleProduct = (await axios.get(`/api/products/${productId}`)).data;
    dispatch(_fetchSingleProduct(singleProduct));
  };
};

//Reducer
const singleProduct = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return { ...action.singleProduct };
    default:
      return state;
  }
};

export { fetchSingleProduct };
export default singleProduct;
