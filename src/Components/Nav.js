import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
const { checkout } = require("../stripe");
// import { checkout } from '../../stripe';

const Nav = () => {
  const [isActive, setActive] = useState("true");
  // const handleClose = () => setActive('false');
  // const handleOpen = () => setActive('true');
  //
  const toggleActive = () => {
    setActive(!isActive);
  };

  const checkout = () => {
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        // console.log(url);
        window.location = url;
      })
      .catch((e) => {
        console.error(e.rror);
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
        </ul>
      </div>
      <div className="NavRight">
        <button onClick={toggleActive}>CART</button>
        <div className={isActive ? "Off" : "On"}>
          <div className="ModalContainer">
            <div className="ModalHeader">
              <button className="Close" onClick={toggleActive}>
                Close
              </button>
              <h3>Modal Header</h3>
            </div>
            <hr></hr>
            <div className="ModalBody">
              <p>Modal body...</p>
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
