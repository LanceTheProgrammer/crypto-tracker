import React, { useEffect, useState } from "react";
import "./LineChart.css";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  // State to hold data for the line chart
  const [data, setData] = useState([["Date", "Prices"]]);

  // Update data when historicalData changes
  useEffect(() => {
    // Create a copy of the data array with initial headers
    let dataCopy = [["Date", "Prices"]];
    // Check if historicalData contains prices data
    if (historicalData.prices) {
      // Map through each item in historicalData.prices array
      historicalData.prices.forEach((item) => {
        // Format date and price and push into the dataCopy array
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1]
        ]);
      });
      // Update the state with the new data
      setData(dataCopy);
    }
  }, [historicalData]);

  // Render the line chart with provided data
  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;

