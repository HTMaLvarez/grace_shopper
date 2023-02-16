import React from 'react';

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="App">
      <br></br>
      <p>Sorry, the page you're looking for does not exist.</p>
      <h3>
        <Link to="/">Return to home</Link>
      </h3>
    </div>
  );
};

export default NotFound;
