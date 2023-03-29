import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isLoggedIn: false
    };
  }


  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === '12345') {
      this.setState({ isLoggedIn: true });
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/restock" />;
    }

    return (
      <div className="form-div">
        <form className="form-style" onSubmit={this.handleSubmit}>
          <label>
            Enter the 5 Digit Access Code
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
