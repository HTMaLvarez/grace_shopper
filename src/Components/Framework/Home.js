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
        <p>You love games don't you? Well you've come to the right place!</p>
        <br></br>
        <p>
          <strong>HTMaLvarez</strong> has cultivated the very finest collection
          of video games. Some old some new, some probably suck, but most don't.
          Please click around our site and enjoy yourself. We can assure you
          that most of our site works like a charm, however if something seems
          off, it's probably becasue we didn't finish it.
        </p>
      </div>
      <hr></hr>
    </div>
  );
};

export default Home;
