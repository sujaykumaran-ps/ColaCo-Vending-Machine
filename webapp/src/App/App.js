import React from 'react';
import './App.css';
import { Navbar } from './Navbar/Navbar';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSoda: null,
      remainingMoney: 0,
      virtualSodas: [{
        name: 'Fizz',
        description: 'An effervescent fruity experience with hints of grape and coriander',
        cost: 1,
        maxQuantity: 100
      },
      {
        name: 'Pop',
        description: 'An explosion of flavor that will knock your socks off!',
        cost: 1,
        maxQuantity: 100
      },
      {
        name: 'Cola',
        description: 'A basic no nonsense cola that is the perfect pick me up for any occasion.',
        cost: 1,
        maxQuantity: 200
      },
      {
        name: 'Mega Pop',
        description: 'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.',
        cost: 1,
        maxQuantity: 50
      }
      ]
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
      remainingMoney,
      virtualSodas
    } = this.state;
    // check if a soda is selected and enough money is inserted
    if (selectedSoda && remainingMoney >= selectedSoda.cost) {
      // generate JSON soda file and download it
      const sodaFile = JSON.stringify(selectedSoda);
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sodaFile));
      element.setAttribute('download', `${selectedSoda.name}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      this.setState(prevState => ({
        remainingMoney: prevState.remainingMoney - selectedSoda.cost,
        virtualSodas: prevState.virtualSodas.map(soda => {
          if (soda.name === selectedSoda.name) {
            soda.maxQuantity -= 1;
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

  render() {
    const {
      selectedSoda,
      remainingMoney,
      virtualSodas
    } = this.state;

    return (
      <div className="app-container">
        <Navbar />
        <div className="vending-machine">
          <div className="soda-selection">
            {virtualSodas.map((soda) => (
              <div className={`soda ${soda.name.split(' ').join('')} ${soda.name === selectedSoda?.name ? "selected" : ""}`} key={soda.name} onClick={() => this.handleSodaSelection(soda)}>
                <h3>{soda.name}</h3>
                <div className="price-container">
                  <p>${soda.cost}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="money-insertion">
            <p>Insert money:</p>
            <button onClick={() => this.handleMoneyInsertion(1)}>$1</button>
            <button onClick={() => this.handleMoneyInsertion(5)}>$5</button>
            <button onClick={() => this.handleMoneyInsertion(10)}>$10</button>
            <button onClick={() => this.handleMoneyInsertion(20)}>$20</button>
          </div>
          <div className="purchase-button">
            <button
              disabled={!selectedSoda || remainingMoney < selectedSoda.cost}
              onClick={this.handlePurchase}
            >
              Purchase
            </button>
            <p>Remaining money: {remainingMoney}</p>
          </div>
        </div>
      </div>
    );
  }
}
