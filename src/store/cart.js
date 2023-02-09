import axios from "axios";

const UPDATE_CART = "UPDATE_CART";

//reducer
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  } else if (action.type === "UPDATE_CART") {
    return action.updated;
  }
  return state;
};

//action creator
export const _updateCart = (updated) => ({ type: UPDATE_CART, updated });

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
    console.log("this is updated product", updated);
    dispatch(_updateCart(updated));
  };
};

export default cart;
