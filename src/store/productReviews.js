import axios from 'axios';

//Action Types
const FETCH_ALL_REVIEWS = 'FETCH_ALL_REVIEWS';
const FETCH_SINGLE_REVIEW = 'FETCH_SINGLE_REVIEW';

//Action Creators
const _fetchAllReviews = allReviews => {
  return {
    type: FETCH_ALL_REVIEWS,
    allReviews,
  };
};

const _fetchSingleReview = singleReview => {
  return {
    type: FETCH_SINGLE_REVIEW,
    singleReview,
  };
};

//Thunks
const fetchAllReviews = () => {
  return async dispatch => {
    const allReviews = (await axios.get('/api/productReviews')).data;
    dispatch(_fetchAllReviews(allReviews));
  };
};
const fetchAllReviewsByProduct = productId => {
  return async dispatch => {
    const allReviews = (
      await axios.get(`/api/productReviews/product/${productId}`)
    ).data;
    dispatch(_fetchAllReviews(allReviews));
  };
};
const fetchAllReviewsByAuthor = userId => {
  return async dispatch => {
    const allReviews = (await axios.get(`/api/productReviews/user/${userId}`))
      .data;
    dispatch(_fetchAllReviews(allReviews));
  };
};
const fetchSingleReview = reviewId => {
  return async dispatch => {
    const review = (await axios.get(`/api/productReviews/${reviewId}`)).data;
    dispatch(_fetchSingleReview(review));
  };
};

//Reducer

const productReviews = (
  state = { allReviews: [], singleReview: {} },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_REVIEWS:
      return { ...state, allReviews: [...action.allReviews] };
    case FETCH_SINGLE_REVIEW:
      return { ...state, singleReview: { ...action.singleReview } };
    default:
      return state;
  }
};

export {
  fetchAllReviews,
  fetchSingleReview,
  fetchAllReviewsByAuthor,
  fetchAllReviewsByProduct,
};
export default productReviews;
