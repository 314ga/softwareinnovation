import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
// import client from "../api/energiApi";

const EnergyGraph = (props) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let minute = today.getHours();
  let hour = today.getMinutes();
  let startDate = yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + minute;
  let endDate = yyyy + "-" + mm + "-" + (dd + 1) + "T" + hour + ":" + minute;
  const [energyPrices, setEnergyPrices] = useState([]);

  useEffect(() => {
    setEnergyPrices(props.priceData);
  }, []);

  return (
    <div className="app__energy">
      <h2 className="display-2">Today's Prices</h2>
      <p className="lead">Prices on the graph are Price per kWh</p>
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
