import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  // Get the coinId from the URL parameters
  const { coinId } = useParams();
  // State to hold the current coin data
  const [coinData, setCoinData] = useState();
  // State to hold historical data of the coin
  const [historicalData, setHistoricalData] = useState();
  // Get the selected currency from context
  const { currency } = useContext(CoinContext);

  // Function to fetch historical data of the coin from API
  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // API key for accessing CoinGecko API
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  // Function to fetch current data of the coin from API
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // API key for accessing CoinGecko API
        "x-cg-demo-api-key": "CG-F3edvnmS8FKgiadNwEdjfBVH",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  // Fetch coin data and historical data when currency changes or component mounts
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  // Render coin details and chart if data is available, otherwise show a spinner
  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          {/* Display coin image, name, and symbol */}
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          {/* Render LineChart component with historical data */}
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          {/* Display various coin information */}
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    // Show spinner if data is being fetched
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;

