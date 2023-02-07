import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  //useSelector is like mapStateToProps, it gets state from store
  const { auth } = useSelector((state) => state);

  //useDispatch refrences the thunk (or dispatch function) from store
  const dispatch = useDispatch();

  //useEffect is similar to componentDidMount & componentDidUpdate, it calls a function after the component renders
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
