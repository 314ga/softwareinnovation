import "./App.css";
import React, { useEffect, useState } from "react";
import { AddDevice, EnergyGraph } from "./Components";
import { getDevices } from "./database/firestore";
import Button from "react-bootstrap/Button";
function App() {
  const [view, setView] = useState(0);
  const [devices, setDevices] = useState([0]);
  useEffect(() => {
    getDevices()
      .then((r) => {
        if (r.length > 0) {
          setDevices(r);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const renderView = (param) => {
    switch (param) {
      case 0: {
        return (
          <>
            <h1>Welcome how can we help you today?</h1>
          </>
        );
      }
      case 1: {
        return (
          <>
            <AddDevice devices={devices} />
          </>
        );
      }
      case 2: {
        return (
          <>
            <EnergyGraph />
          </>
        );
      }
      case 3: {
        return <></>;
      }
      case 4: {
        return <></>;
      }

      default:
        return "";
    }
  };

  return (
    <div className="App mt-5">
      <Button
        variant="primary"
        onClick={() => {
          setView(1);
        }}
      >
        Add Device
      </Button>{" "}
      <Button
        variant="secondary"
        onClick={() => {
          setView(2);
        }}
      >
        Energy Graphs
      </Button>{" "}
      <Button variant="success">X</Button> <Button variant="warning">X</Button>{" "}
      <Button variant="danger">X</Button> <Button variant="info">X</Button>{" "}
      {renderView(view)}
    </div>
  );
}

export default App;
