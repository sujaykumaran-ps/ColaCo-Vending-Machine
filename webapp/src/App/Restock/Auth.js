import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';
import { Restock } from './Restock';

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isLoggedIn: false,
      error: ''
    };
  }

  handlePasswordChange = (event) => {
    const password = event.target.value;
    if (/^\d{0,5}$/.test(password)) {
      this.setState({ password });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== '12345') {
      this.setState({ error: 'Incorrect Access Code, please try again!!!', isLoggedIn: false  });
    } else if (this.state.password === '12345') {
      this.setState({ isLoggedIn: true, error: null });
    } else{
      this.setState({ error: 'Please enter a 5-digit Access Code!!', isLoggedIn: false  });
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
          {this.state.error && (
            <p className="error-message">{this.state.error}</p>
          )}
        </form>
        {this.state.isLoggedIn && <Restock isLoggedIn={this.state.isLoggedIn} />}
      </div>
    );
  }
}
