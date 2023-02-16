import React, { useState, createContext } from 'react';
import { attemptLogin } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from './Framework/Menu';

const Login = () => {
  // set auth from state
  const { auth } = useSelector(state => state);
  // allow dispatch
  const dispatch = useDispatch();

  // set the navigate var
  const navigate = useNavigate();

  // create a loggedIn state value
  const [loggedIn, setLoggedIn] = useState(false);
  // create creds state
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  // set the creds 'as the input changes'
  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };
  // run 'login' on submit and set the loggedIn state to true
  const login = ev => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="Form">
      {loggedIn ? (
        <Menu />
      ) : (
        <div>
          <h4>Sign In</h4>
          <form onSubmit={login}>
            <input
              placeholder="username"
              value={credentials.username}
              name="username"
              onChange={onChange}
            />
            <input
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button>Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
