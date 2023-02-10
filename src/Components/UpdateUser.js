import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../store';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      genre: '',
    };
    // bind the handles to 'this'
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // fetch the user
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.props.fetchUser(id);
  // }

  // set the state with input
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ ...this.props.user, ...this.state });
  }

  render() {
    const { username, password, genre } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <p>Update profile:</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password"></label>
          <input
            type="text"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
          <br></br>
          <br></br>
        </form>
        <form className="DeleteUser" onSubmit={e => e.preventDefault()}>
          <label htmlFor="delete">Delete this user</label>
          <button>Delete</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: user => dispatch(updateUser(user, history)),
    getUser: id => dispatch(fetchUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
