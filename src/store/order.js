import axios from "axios";

const initialState = {
  order: {},
  pastOrders: [],
};

//action type
const CREATE_ORDER = "CREATE_ORDER";
const FETCH_PAST_ORDERS = "FETCH_PAST_ORDERS";

//action ceator
export const _createNewOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});
export const _fetchPastOrders = (pastOrders) => ({
  type: FETCH_PAST_ORDERS,
  pastOrders,
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
    console.log("this is cart in thunk", order);
    dispatch(_createNewOrder(order));
  };
};

export const fetchPastOrders = () => {
  return async (dispatch) => {
    const { data: orders } = await axios.get("/api/orders");
    dispatch(_fetchPastOrders(orders));
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
    case FETCH_PAST_ORDERS:
      return {
        ...state,
        pastOrders: action.pastOrders,
      };
    default:
      return state;
  }
};

export default order;
