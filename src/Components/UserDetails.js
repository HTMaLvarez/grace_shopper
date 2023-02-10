import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store';
import UpdateUser from './UpdateUser';

const UserDetails = () => {
  let id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id.id));
  }, []);

  const { user } = useSelector(state => state);
  const userProfile = user.user;
  // console.log(userProfile);

  return (
    <main className="UserContainer">
      <div className="ProfileHeader">
        <h3>{userProfile.username}</h3>
      </div>
      <div className="ProfileDetails">Profile details</div>
      <div className="UpdateUser">
        <UpdateUser />
      </div>
    </main>
  );
};

export default UserDetails;
