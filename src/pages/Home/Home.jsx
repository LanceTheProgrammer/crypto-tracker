import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  // Get allCoin and currency from CoinContext
  const { allCoin, currency } = useContext(CoinContext);
  // State to hold displayed coins
  const [displayCoin, setDisplayCoin] = useState([]);
  // State to hold user input for search
  const [input, setInput] = useState("");

  // Handler for input change
  const inputHandler = (event) => {
    setInput(event.target.value);
    // Reset displayCoin to allCoin if input is empty
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // Handler for search form submission
  const searchHandler = async (event) => {
    event.preventDefault();
    // Filter coins based on user input
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  // Reset displayCoin to allCoin when allCoin changes
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about crypto.
        </p>
        {/* Search form */}
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search crypto.."
            list="coinlist"
            required
          />
          {/* Datalist for autocomplete */}
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      {/* Display top 10 coins */}
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24Hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {/* Display current price */}
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {/* Display 24Hr change */}
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {/* Display market cap */}
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
