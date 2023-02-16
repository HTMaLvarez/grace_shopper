import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import AllProducts from '../Products/AllProducts';

const Home = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <div className="Banner">
        <h1>Welcome gaming nerds...</h1>
      </div>

      <div className="HomeContent">
        <p>
          Then you've come to the right place! <br></br>HTMaLverez has
          cultivated the very finest collection of video games. Please click
          around our site and enjoy yourself. We can assure you that most of our
          site works like a charm, however if something seems off, it's probably
          a broken piece of shit.
        </p>
      </div>
      <div className="LogOut">
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
