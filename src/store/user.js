import axios from 'axios';

const initialState = {
  users: [],
  user: {},
};

// ACTION TYPE
const CREATE_USER = 'CREATE_USER';
const FETCH_USER = 'FETCH_USER';
const UPDATE_USER = 'UPDATE_USER';

// FETCH ALL
const FETCH_USERS = 'FETCH_USERS';

// ACTION CREATOR
export const _createNewUser = user => ({ type: CREATE_USER, user });
export const _fetchUser = user => ({ type: FETCH_USER, user });
export const _fetchUsers = users => ({ type: FETCH_USERS, users });
export const _updateUser = user => ({ type: UPDATE_USER, user });

//THUNKS
// SINGLE USER
export const createNewUser = credentials => {
  return async dispatch => {
    const { data: user } = await axios.post('/api/users', credentials);
    dispatch(_createNewUser(user));
  };
};

export const fetchUser = id => {
  return async dispatch => {
    const { data: user } = await axios.get(`/api/users/${id}`);
    dispatch(_fetchUser(user));
  };
};
// updating in the reducer involves returning state, and then mapping through users to match the id, then reset with updates
export const updateUser = user => {
  return async dispatch => {
    const { data: updated } = await axios.put(`/api/users/${user.id}`, user);
    dispatch(_updateUser(updated));
  };
};

// ALL USERS
export const fetchUsers = () => {
  return async dispatch => {
    const { data: users } = await axios.get('/api/users');
    dispatch(_fetchUsers(users));
  };
};

// REDUCER
const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.users,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        ),
      };

    default:
      return state;
  }
};

export default user;
