import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // set auth from state
  const { auth } = useSelector(state => state);

  return <>{auth.id ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};

export default PrivateRoute;
