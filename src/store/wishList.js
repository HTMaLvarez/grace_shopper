import axios from 'axios';

const initialState = {
  wishlist: [],
  wish: {},
};

// const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const CREATE_NEW_WISH = 'CREATE_NEW_WISH';
const FETCH_WISHLIST = 'FETCH_WISHLIST';

// export const _addToWishList = wish => ({ type: ADD_TO_WISHLIST, wish });
export const _createNewWish = wish => ({ type: CREATE_NEW_WISH, wish });
export const _fetchWishList = wishlist => ({ type: FETCH_WISHLIST, wishlist });

// ADD WISH
// export const addToWish = wish => {
//   return async dispatch => {
//     const token = window.localStorage.getItem('token');
//     const { data: wishToAdd } = await axios.post('/api/wishlist', wish);
//     dispatch(_addToWishList(wishToAdd));
//   };
// };

export const createNewWish = wish => {
  return async dispatch => {
    const token = window.localStorage.getItem('token');
    const { data: newWish } = await axios.post('/api/wishlist', wish, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_createNewWish(newWish));
  };
};

// FETCH ALL WISHES
export const fetchWishes = () => {
  return async dispatch => {
    const token = window.localStorage.getItem('token');
    const { data: wishes } = await axios.get('/api/wishlist', {
      headers: {
        authorization: token,
      },
    });
    dispatch(_fetchWishList(wishes));
  };
};

// REDUCER
const wishList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlist: action.wishlist,
      };
    case CREATE_NEW_WISH:
      return {
        wishlist: [...state.wishlist, action.wish],
        // ...state,
        // wish: action.wish,
      };
    default:
      return state;
  }
};

export default wishList;
