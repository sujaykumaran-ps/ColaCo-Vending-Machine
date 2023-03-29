import React from 'react';
import './Restock.css';
import { Navigate } from 'react-router-dom';

export class Restock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSoda: null,
        virtualSodas: [],
    };
}

handleSodaSelection = (soda) => {
    this.setState({
        selectedSoda: soda
    });
};
componentDidMount() {
    const toJson = (response) => response.json();
    const loadData = (config) => {
      fetch(config.soda_api_url)
        .then(toJson)
        .then((virtualSodas) => this.setState({ virtualSodas }));
    };
  
    fetch("config.json").then(toJson).then(loadData);
  }
  
    render() {
      const {
        selectedSoda,
        virtualSodas,
        isLoggedIn
      } = this.state;
      console.log('isLoggedIn', this.props.isLoggedIn);
      const defaultQuantity = selectedSoda ? selectedSoda.currQuantity : '';
      const defaultCost = selectedSoda ? selectedSoda.cost : '';
    //   if (!isLoggedIn) {
    //     return <Navigate to="/admin" />;
    //   }
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

            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" min="1" max="100" defaultValue={defaultQuantity}></input>
            <label for="cost">Cost</label>
            <input type="number" id="cost" name="cost" defaultValue={defaultCost}></input>

          </div>
          <div className="purchase-button">
          <button className="purchase-btn" type="button" disabled={!selectedSoda} onClick={this.handlePurchase}>
            <span className="purchase-btn-shadow"></span>
            <span className="purchase-btn-edge"></span>
            <span className="purchase-btn-front text">Buy Soda</span>
          </button>
          <button className="change-btn" type="button" disabled={selectedSoda} onClick={this.handleRemainingMoney}>
            <span className="change-btn-shadow"></span>
            <span className="change-btn-edge"></span>
            <span className="change-btn-front text">Done</span>
          </button>
          </div>

          </div>
        </div>
      );
    }
}
  