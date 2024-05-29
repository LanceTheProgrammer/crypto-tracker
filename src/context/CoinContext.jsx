import { createContext, useEffect, useState } from "react";

// Create a context for managing coin-related data
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // State to hold all available coins
  const [allCoin, setAllCoin] = useState([]);
  // State to hold the selected currency
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // Function to fetch data of all coins from API
  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        // API key for accessing CoinGecko API
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
  };

  // Fetch all coin data when currency changes or component mounts
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  // Provide context value containing allCoin, currency, and setCurrency
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  // Provide the context value to its children components
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
