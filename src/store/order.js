import axios from "axios";

const initialState = {
  order: {},
};

//action type
const CREATE_ORDER = "CREATE_ORDER";

//action ceator
export const _createNewOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

//thunk
export const createNewOrder = (cart) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: order } = await axios.post(
      "/api/orders",
      { cart },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_createNewOrder(order));
  };
};

//reducer
const order = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
};

export default order;
