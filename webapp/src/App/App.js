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
    const {
      selectedSoda,
      remainingMoney
    } = this.state;
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

      this.setState(prevState => ({
        remainingMoney: prevState.remainingMoney - selectedSoda.cost,
        virtualSodas: prevState.virtualSodas.map(soda => {
          if (soda.name === selectedSoda.name) {
            soda.currQuantity -= 1;
          }
          return soda;
        })
      }));

      // clear selection
      this.setState({
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
            <p>$ Insert Money $</p>
            <button onClick={() => this.handleMoneyInsertion(1)}>$1</button>
            <button onClick={() => this.handleMoneyInsertion(5)}>$5</button>
            <button onClick={() => this.handleMoneyInsertion(10)}>$10</button>
            <button onClick={() => this.handleMoneyInsertion(20)}>$20</button>
          </div>
          <div className="purchase-button">
            <button disabled={!selectedSoda || remainingMoney < selectedSoda.cost} onClick={this.handlePurchase}>Purchase</button>
            <p>Remaining money: ${remainingMoney}</p>
          </div>
        </div>
      </div>
    );
  }
}
