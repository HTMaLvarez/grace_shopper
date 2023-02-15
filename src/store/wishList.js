const initialState = [];

const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";

export const addToWishList = (product) => ({
  type: ADD_TO_WISHLIST,
  product,
});

const wishList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.product];
    default:
      return state;
  }
};

export default wishList;
