import React from 'react';
import './Restock.css';
import { Navigate } from 'react-router-dom';

export class Restock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cost: 0,
        selectedSoda: null,
        virtualSodas: [],
        admins: [],
        quantity: 0
    };
}

handleQuantityChange = (event) => {
    const quantity = event.target.value;
    this.setState({ quantity });
};

handleCostChange = (event) => {
    const cost = event.target.value;
    this.setState({ cost });
    console.log(cost);
};

handleSodaSelection = (soda) => {
    this.setState({
        selectedSoda: soda
    });
};

handleLogout = (event) => { 
    event.preventDefault();
    const admin = this.state.admins.find((admin) => admin.isLoggedIn === true);
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
          isLoggedIn: false
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

handleQuantityUpdate = () => {
    const { selectedSoda, quantity, virtualSodas } = this.state;
    const quantityNumber = parseInt(quantity); 
    if (selectedSoda.maxQuantity >= (selectedSoda.currQuantity + quantityNumber)) {
      const updatedVirtualSodas = virtualSodas.map(soda => {
        if (soda.name === selectedSoda.name) {
          soda.currQuantity += quantityNumber ;
          // make a PUT request to update the currQuantity field in the database
          fetch(`http://localhost:3001/sodas/${soda.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              currQuantity: soda.currQuantity
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update soda quantity');
              }
              return response.json();
            })
            .then(updatedSoda => {
              // update the virtualSodas array with the updated soda
              return {
                ...soda,
                currQuantity: updatedSoda.currQuantity
              };
              
            })
            .catch(error => {
              console.error(error);
              return soda;
            });
        }
        return soda;
      });
      // update the state with the updated virtualSodas array and remainingMoney
      this.setState({
        quantity: 0,
        cost: 0,
        virtualSodas: updatedVirtualSodas,
        selectedSoda: null
      });
    }
};

handleCostUpdate = () => {
    const { selectedSoda, cost, virtualSodas } = this.state;
    const costNumber = parseInt(cost); 
    if (costNumber) {
      const updatedVirtualSodas = virtualSodas.map(soda => {
        if (soda.name === selectedSoda.name) {
          soda.cost = costNumber ;
          // make a PUT request to update the cost field in the database
          fetch(`http://localhost:3001/sodas/${soda.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cost: soda.cost
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update soda quantity');
              }
              return response.json();
            })
            .then(updatedSoda => {
              // update the virtualSodas array with the updated soda
              return {
                ...soda,
                cost: updatedSoda.cost
              };
              
            })
            .catch(error => {
              console.error(error);
              return soda;
            });
        }
        return soda;
      });
      // update the state with the updated virtualSodas array and remainingMoney
      this.setState({
        quantity: 0,
        cost: 0,
        virtualSodas: updatedVirtualSodas,
        selectedSoda: null
      });
    }
};

componentDidMount() {
    const toJson = (response) => response.json();
    const loadData = (config) => {
      fetch(config.soda_api_url)
        .then(toJson)
        .then((virtualSodas) => this.setState({ virtualSodas }));
    };
    const loadAdmins = (config) => {
      fetch(config.admin_api_url)
        .then(toJson)
        .then((admins) => this.setState({ admins }));
    };

    fetch("config.json")
      .then(toJson)
      .then((config) => {
        loadData(config);
        loadAdmins(config);
      });
  }

  
    render() {
      const {
        selectedSoda,
        virtualSodas,
        admins
      } = this.state;
      if (admins.length && !admins[0].isLoggedIn) {
        return <Navigate to="/" />;
      }
      const defaultQuantity = selectedSoda ? selectedSoda.maxQuantity - selectedSoda.currQuantity : '';
      const defaultCost = selectedSoda ? selectedSoda.cost : '';
      return (
        <div className="app-container">
          <div className="vending-machine">
            <div className="soda-selection">
              {virtualSodas.map((soda) => (
                <div className={`soda ${soda.name.split(' ').join('')} ${soda.name === selectedSoda?.name ? "selected" : ""}`} key={soda.name} onClick={() => this.handleSodaSelection(soda)}>
                  <h3>{soda.name}</h3>
                  <div className="quantity-container">
                  <p>{soda.currQuantity} left</p>
                </div>
                  <div className="price-container">
                    <p>${soda.cost}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={selectedSoda ? "update-div" : "hidden"}>
                <div className={`qty-div ${selectedSoda?.name.split(' ').join('')}-update`}>
                    <label htmlFor="quantity">Quantity to refill</label>
                    <input type="range" id="quantity" name="quantity" min="0" max={defaultQuantity} value={this.state.quantity} onChange={this.handleQuantityChange}></input>
                    <span className="range-value">{this.state.quantity}</span>
                    <button type="button" onClick={this.handleQuantityUpdate}>Refill Soda</button>
                </div>
                <div className={`cost-div ${selectedSoda?.name.split(' ').join('')}-update`}>
                    <label htmlFor="cost" >Cost</label>
                    <input type="text" id="cost" name="cost" value={this.state.cost} onChange={this.handleCostChange}></input> 
                    <button type="button" onClick={this.handleCostUpdate}>Update Cost</button>
                </div>
            </div>
            <div className="purchase-button">
            <button className="change-btn" type="button" disabled={selectedSoda} onClick={this.handleLogout}>
                <span className="change-btn-shadow"></span>
                <span className="change-btn-edge"></span>
                <span className="change-btn-front text">Logout</span>
            </button>
            </div>
          </div>
        </div>
      );
    }
}