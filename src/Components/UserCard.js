import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = props => {
  const { user } = props;

  return (
    <main className="UserCard">
      <h4>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </h4>
    </main>
  );
};

export default UserCard;
