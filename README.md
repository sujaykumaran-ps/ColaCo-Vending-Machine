# ColaCo-Vending-Machine

import React from 'react';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSoda: null,
      remainingMoney: 0,
      virtualSodas: [],
    };
  }

  handleSodaSelection = (soda) => {
    this.setState({
      selectedSoda: soda
    });
  };

  // function to handle money insertion
  handleMoneyInsertion = (amount) => {
    this.setState(prevState => ({
      remainingMoney: prevState.remainingMoney + amount
    }));
  };

  // function to handle purchase
  handlePurchase = () => {
    const { selectedSoda, remainingMoney, virtualSodas } = this.state;
  
    // check if a soda is selected and enough money is inserted
    if (selectedSoda && remainingMoney >= selectedSoda.cost) {
      // generate JSON soda file and download it
      const amtReturned = remainingMoney - selectedSoda.cost;
      const sodaFile = JSON.stringify(selectedSoda);
      const { name, description, cost } = JSON.parse(sodaFile);
      const returnSoda = JSON.stringify({ name, description, cost});
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(returnSoda));
      element.setAttribute('download', `${selectedSoda.name}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  
      // update virtualSodas array to decrease currQuantity of selected soda by 1
      const updatedVirtualSodas = virtualSodas.map(soda => {
        if (soda.name === selectedSoda.name) {
          // make a PUT request to update the currQuantity field in the database
          fetch(`http://localhost:3001/sodas/${soda.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              currQuantity: soda.currQuantity - 1
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
        remainingMoney: amtReturned,
        virtualSodas: updatedVirtualSodas,
        selectedSoda: null
      });
    }
  };

//Getting the data from Server
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
      remainingMoney,
      virtualSodas
    } = this.state;

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
            <p>$ Insert Bills $</p>
            <button onClick={() => this.handleMoneyInsertion(1)}>$1</button>
            <button onClick={() => this.handleMoneyInsertion(5)}>$5</button>
            <button onClick={() => this.handleMoneyInsertion(10)}>$10</button>
            <button onClick={() => this.handleMoneyInsertion(20)}>$20</button>
            <p>Remaining: ${remainingMoney}</p>
          </div>
          <div className="purchase-button">
          <button className="purchase-btn" type="button" disabled={!selectedSoda || remainingMoney < selectedSoda.cost} onClick={this.handlePurchase}>
            <span className="purchase-btn-shadow"></span>
            <span className="purchase-btn-edge"></span>
            <span className="purchase-btn-front text">
            Purchase
            </span>
          </button>
          </div>
        </div>
      </div>
    );
  }
}
