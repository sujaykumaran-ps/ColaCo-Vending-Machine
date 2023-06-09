import React from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      admins:[],
      error: ''
    };
  }
  
  // Function to check the length of access code
  handlePasswordChange = (event) => {
    const password = event.target.value;
    if (/^\d{0,5}$/.test(password)) {
      this.setState({ password });
    }
  };

  // Submit Handler function to check the access code
  handleSubmit = (event) => {
    event.preventDefault();
    const admin = this.state.admins.find((admin) => admin.access_code === this.state.password);
    if (!admin) {
      this.setState({ error: 'Incorrect Access Code, please try again!!!' });
    } else {
      this.setState({ error: null });
      fetch(`http://localhost:3001/admin/${admin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isLoggedIn: true
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update admin');
        }
        return response.json();
      })
      .then(updatedAdmin => {
        const updatedAdmins = this.state.admins.map((a) => {
          if (a.id === updatedAdmin.id) {
            return updatedAdmin;
          }
          return a;
        });
        this.setState({ admins: updatedAdmins });
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  componentDidMount() {
    const toJson = (response) => response.json();
    const loadData = (config) => {
      fetch(config.admin_api_url)
        .then(toJson)
        .then((admins) => this.setState({ admins }));
    };
    fetch("config.json").then(toJson).then(loadData);
  }

  render() {
    const {
      admins
    } = this.state;
    // Navigating to /restock page if logged in
    if (admins.length && admins[0].isLoggedIn) {
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
          <button className="submit-btn" type="submit">Submit</button>
          {this.state.error && (
            <p className="error-message">{this.state.error}</p>
          )}
        </form>
      </div>
    );
  }
}
