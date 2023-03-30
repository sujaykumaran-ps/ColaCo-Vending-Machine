import React from 'react';
import './Restock.css';
import { Navigate } from 'react-router-dom';

export class Restock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSoda: null,
        virtualSodas: [],
        admins: [],
        quantity: 0
    };
}

handleQuantityChange = (event) => {
    const quantity = event.target.value;
    this.setState({ quantity });
    console.log(quantity);
};

handleSodaSelection = (soda) => {
    this.setState({
        selectedSoda: soda
    });
};

handleQuantityUpdate = () => {
    const { selectedSoda, quantity, virtualSodas } = this.state;
    const quantityNumber = parseInt(quantity); 
    if (selectedSoda.maxQuantity >= (selectedSoda.currQuantity + quantityNumber)) {
      const updatedVirtualSodas = virtualSodas.map(soda => {
        if (soda.name === selectedSoda.name) {
          soda.currQuantity += quantityNumber ;
          console.log(soda.currQuantity);
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
        quanity: 0,
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
        return <Navigate to="/admin" />;
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
            <div className="money-insertion">
            <p>Update Sodas</p>

            <label htmlFor="quantity">Quantity to refill</label>
            <input type="range" id="quantity" name="quantity" min="1" max={defaultQuantity} value={this.state.quantity} onChange={this.handleQuantityChange}></input>
            <button type="button" onClick={this.handleQuantityUpdate}>Refill Sodas</button>
            <label htmlFor="cost">Cost</label>
            <input type="number" id="cost" name="cost" defaultValue={defaultCost}></input> 
          </div>
          <div className="purchase-button">
          <button className="change-btn" type="button" disabled={selectedSoda} onClick={this.handleRemainingMoney}>
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
  