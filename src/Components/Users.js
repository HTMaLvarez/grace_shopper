import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { fetchUser, fetchUsers } from '../store';

const Users = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { user } = useSelector(state => state);
  const activeUsers = user.users;

  useEffect(() => {
    const filteredUsers = activeUsers.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredUsers);
  }, [activeUsers, search]);

  return (
    <div>
      <h3>All Users</h3>

      <div className="Form">
        <form className="searchForm" onSubmit={e => e.preventDefault()}>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            placeholder="Search Users"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>

      <ul>
        {searchResults.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
