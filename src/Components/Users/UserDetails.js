import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store';
import UpdateUser from './UpdateUser';

const UserDetails = () => {
  // useParams to grab id
  let params = useParams();
  const dispatch = useDispatch();
  // set id var.
  const id = params.id;
  // fetch the user on load
  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  // destruct the user attributes
  const { user } = useSelector(state => state);
  // set the userProfile var.
  const userProfile = user.user;
  // set the attributes
  const name = userProfile.username;
  const rating = userProfile.userRating;
  const genres = userProfile.favoriteGenres;

  return (
    <>
      <div className="UserContainer">
        <div className="ProfileHeader">
          <h2>{name}</h2>
          <div className="Rating">
            <div>
              User Rating <h2>{rating}</h2>
            </div>
          </div>
        </div>
        <div className="ProfileDetails">
          <h3>Favorite genre's</h3>
          <h5>{genres}</h5>
        </div>
        <div className="UpdateUser">
          <UpdateUser id={id} />
        </div>
      </div>
    </>
  );
};

export default UserDetails;
