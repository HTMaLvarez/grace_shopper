import axios from "axios";

const UPDATE_CART = "UPDATE_CART";
const ADD_TO_CART = "ADD_TO_CART";

//reducer
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  } else if (action.type === "UPDATE_CART") {
    return action.updated;
  } else if (action.type === ADD_TO_CART) {
    return action.product;
  }
  return state;
};

//action creator
export const _updateCart = (updated) => ({ type: UPDATE_CART, updated });

export const _addToCart = (product) => ({ type: ADD_TO_CART, product });

//thunk
export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const updateCart = (product, quantityToRemove = 1) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: updated } = await axios.put(
      "/api/orders/cart",
      { product, quantityToRemove },
      {
        headers: {
          authorization: token,
        },
      }
    );

    dispatch(_updateCart(updated));
  };
};

export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: addedProduct } = await axios.post(
      "/api/orders/cart",
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );

    dispatch(_addToCart(addedProduct));
  };
};

export default cart;
