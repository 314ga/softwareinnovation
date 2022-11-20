import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const client = axios.create({
  baseURL:
    "https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2022-11-17T00:00&end=2022-11-18T00:00&filter=%7B%22PriceArea%22:[%22DK1%22]%7D&sort=HourUTC%20DESC&timezone=dk",
  withCredentials: false,
});

const EnergyGraph = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  const [energyPrices, setEnergyPrices] = useState(null);

  useEffect(() => {
    // axios
    //   .get(
    //     "https://www.nordpoolgroup.com/api/marketdata/page/41?currency=,DKK,DKK,EUR&endDate=20-11-2022",
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     }
    //   )
    client.get().then((response) => {
      console.log("dkk");
      setEnergyPrices(response.data);
      console.log(energyPrices.records[0]);
    });
  }, []);

  const refreshPrices = () => {
    // client.get(
    //   `start=${startDate}T00:00&end=${endDate}T00:00&filter=%7B%22PriceArea%22:[%22DK1%22,%22DK2%22]%7D&sort=HourUTC%20DESC&timezone=dk`
    // );
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
  };
  const refreshPricess = async (startDate, endDate) => {
    // client.get(
    //   `start=${startDate}T00:00&end=${endDate}T00:00&filter=%7B%22PriceArea%22:[%22DK1%22,%22DK2%22]%7D&sort=HourUTC%20DESC&timezone=dk`
    // );
  };

  return (
    <div className="app__energy">
      {/* <h1>{energyPrices.title}</h1>
      <p>{energyPrices.body}</p> */}
      {energyPrices ? (
        <div>
          {energyPrices.records.map((data, index) => {
            return <div key={index}>{data.PriceArea}</div>;
          })}
        </div>
      ) : (
        <div>No information found for this day</div>
      )}
      <Chart
        chartType="ColumnChart"
        data={[
          ["Age", "Weight"],
          [4, 5.5],
          [8, 12],
        ]}
        width="100%"
        height="400px"
        legendToggle
      />
      <button
        type="button"
        className="btn"
        variant="outline"
        onClick={refreshPrices}
      >
        Get
      </button>
    </div>
  );
};

export default EnergyGraph;
