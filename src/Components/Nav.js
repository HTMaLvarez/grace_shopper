import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
const { checkout } = require('../stripe');
// import { checkout } from '../../stripe';
import { logout, updateCart } from '../store';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {
  const [isActive, setActive] = useState('true');
  // bring in cart for modal
  const { cart } = useSelector(state => state);
  // console.log(cart.lineItems);
  // dispatch to run cart
  const dispatch = useDispatch();
  // active toggle to display model
  const toggleActive = () => {
    setActive(!isActive);
  };
  console.log(cart);
  // checkout creates a fetch request to connect with the 'post' checkout-session - we must pass in the cart data as 'req.body'
  // it passes the correct data and then renders the response (stripe url) to current window
  // see db/index.js for 'post'
  const checkout = async () => {
    await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };
  return (
    <nav className="Nav">
      <div className="NavLeft">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/order-history">Order History</Link>
          </li>
          <li>
            <Link to="/wish-list">Wish List</Link>
          </li>
        </ul>
      </div>
      <div className="NavRight">
        <button onClick={toggleActive}>CART</button>
        <div className={isActive ? 'Off' : 'On'}>
          <div className="Cart">
            <div className="ModalHeader">
              <button className="Close" onClick={toggleActive}>
                Close
              </button>
              <h3>Your cart</h3>
            </div>
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
            <div className="ModalFooter">
              <p>footer</p>
              <button className="Checkout" onClick={() => checkout()}>
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// const items = req.body.items;
//         let lineItems = [];
//         items.forEach((item) => {
//           lineItems.push(
//             {
//               price: item.id,
//               quantity: item.quantity
//             }
//           )
//         })

// const checkout = () => {
//   fetch('/create-checkout-session', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       items: [
//         { id: 1, quantity: 1 },
//         { id: 2, quantity: 1 },
//       ],
//     }),
//   })
//     .then(res => {
//       if (res.ok) return res.json();
//       return res.json().then(json => Promise.reject(json));
//     })
//     .then(({ url }) => {
//       // console.log(url);
//       window.location = url;
//     })
//     .catch(e => {
//       console.error(e.rror);
//     });
