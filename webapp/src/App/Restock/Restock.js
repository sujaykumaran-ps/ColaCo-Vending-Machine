import React from 'react';
import './Restock.css';

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

          </div>
        </div>
      );
    }
}
  