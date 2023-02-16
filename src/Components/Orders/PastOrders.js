import React from 'react';
import { fetchPastOrders } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const PastOrders = () => {
  //useSelector to get our auth state
  const { auth } = useSelector(state => state);
  // const userId = auth.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPastOrders());
  }, []);
  const { order } = useSelector(state => state);

  return (
    <div className="PastOrders">
      <h2>Your Account Order History</h2>
      <div>
        {order.pastOrders?.length > 0 ? (
          order.pastOrders.map(order => (
            <div className="OrdersList" key={order.id}>
              <div>
                <p>Order Number:</p> {order.id}
              </div>
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
