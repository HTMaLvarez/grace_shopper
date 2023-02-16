import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  // set auth from state
  const { auth } = useSelector(state => state);
  return <>{auth ? <Outlet /> : <Navigate to="/home" />}</>;
};

export default PublicRoute;
