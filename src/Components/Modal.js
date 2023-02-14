import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Modal = () => {
  const [open, setOpen] = useState('false');
  // const handleOpen = () => setOpen('true');
  const handleClose = () => setOpen('false');

  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="Cart">
      <div className="ModalHeader">
        <button onClick={handleClose}> x </button>
        <h3>Modal Header</h3>
      </div>
      <hr></hr>
      <div className="Item">
        <div className="LineItems">
          {cart.lineItems.map(item => (
            <div className="Item" key={item.id}>
              <p>{item.product.name}</p>
              <p>Qty: {item.quantity} </p>
              <button
                onClick={() =>
                  dispatch(updateCart(item.product.id, item.quantity))
                }
              >
                Remove Item
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="ModalFooter">
        <p>footer</p>
        <button>CHECKOUT</button>
      </div>
    </div>
  );
};

export default Modal;
