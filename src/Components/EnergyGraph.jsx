import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
// import client from "../api/energiApi";

const EnergyGraph = (props) => {
  const [energyPrices, setEnergyPrices] = useState([]);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let month = today.toLocaleDateString("default", { month: "long" });
  let tomorrow = String(today.getDate() + 1).padStart(2, "0");
  let startDate = yyyy + "-" + mm + "-" + dd;
  let endDate = yyyy + "-" + mm + "-" + tomorrow;
  useEffect(() => {
    setEnergyPrices(props.priceData);
  }, []);

  return (
    <div className="app__energy ">
      <h2 className="display-2">Today's Prices</h2>
      <p className="lead">Prices on the graph are Price per kWh</p>
      <p className="text-info bg-dark p-2 w-50 mx-auto ">
        {"Displaying data from " +
          dd +
          " " +
          month +
          " to " +
          tomorrow +
          " " +
          month}
      </p>
      {energyPrices.length > 0 ? (
        <div>
          <Chart
            chartType="ColumnChart"
            data={energyPrices}
            width="100%"
            height="400px"
            legendToggle
          />
        </div>
      ) : (
        <div>No information found for this day</div>
      )}
    </div>
  );
};

export default EnergyGraph;
