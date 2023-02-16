import React from "react";
import { fetchPastOrders } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const PastOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPastOrders());
  }, []);
  const { order } = useSelector((state) => state);
  console.log("this is order", order);
  return (
    <div>
      <h2>Past Orders</h2>
      <div>
        {order.pastOrders?.length > 0 ? (
          order.pastOrders.map((order) => (
            <div key={order.id}>
              <p>Order Number: {order.id}</p>
            </div>
          ))
        ) : (
          <p>You have no past orders</p>
        )}
      </div>
    </div>
  );
};

export default PastOrders;
