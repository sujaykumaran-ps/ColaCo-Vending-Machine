# ColaCo-Vending-Machine

const [selectedSoda, setSelectedSoda] = useState(null);
  const [remainingMoney, setRemainingMoney] = useState(0);
  const [virtualSodas, setVirtualSodas] = useState([
    { name: 'Fizz', description: 'An effervescent fruity experience with hints of grape and coriander', cost: 1, maxQuantity: 100 },
    { name: 'Pop', description: 'An explosion of flavor that will knock your socks off!', cost: 1, maxQuantity: 100 },
    { name: 'Cola', description: 'A basic no nonsense cola that is the perfect pick me up for any occasion.', cost: 1, maxQuantity: 200 },
    { name: 'Mega Pop', description: 'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.', cost: 1, maxQuantity: 50 }
  ]);
  const handleSodaSelection = (soda) => {
    setSelectedSoda(soda);
  };

  // function to handle money insertion
  const handleMoneyInsertion = (amount) => {
    setRemainingMoney(remainingMoney + amount);
  };

  // function to handle purchase
  const handlePurchase = () => {
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

      // update remaining money and soda quantity
      setRemainingMoney(remainingMoney - selectedSoda.cost);
      const updatedSodas = virtualSodas.map(soda => {
        if (soda.name === selectedSoda.name) {
          soda.maxQuantity -= 1;
        }
        return soda;
      });
      setVirtualSodas(updatedSodas);

      // clear selection
      setSelectedSoda(null);
    }
  };
  return (
    <div className="vending-machine">
      <div className="soda-selection">
        {virtualSodas.map(soda => (
          <div className={`soda ${soda.name === selectedSoda?.name ? 'selected' : ''}`} key={soda.name} onClick={() => handleSodaSelection(soda)}>
            <h3>{soda.name}</h3>
            
            <p>Price: {soda.cost}</p>
          </div>
        ))}
      </div>
      <div className="money-insertion">
        <p>Insert money:</p>
        <button onClick={() => handleMoneyInsertion(1)}>1 dollar</button>
        <button onClick={() => handleMoneyInsertion(5)}>5 dollars</button>
        <button onClick={() => handleMoneyInsertion(10)}>10 dollars</button>
        <button onClick={() => handleMoneyInsertion(20)}>20 dollars</button>
      </div>
      <div className="purchase-button">
        <button disabled={!selectedSoda || remainingMoney < selectedSoda.cost} onClick={handlePurchase}>Purchase</button>
        <p>Remaining money: {remainingMoney}</p>
      </div>
    </div>
  );