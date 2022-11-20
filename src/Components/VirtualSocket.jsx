import React, { useState, useRef } from "react";
import { pics } from "../constants";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getChargeTimes } from "../utils/chargeLogic";
import { addChargingPlan } from "../database/firestore";
const VirtualSocket = (props) => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedSocket, setSelectedSocket] = useState("1");
  const [selectedHours, setSelectedHours] = useState("1");
  const percentage = useRef(0);
  const startCharge = (e) => {
    e.preventDefault();
    if (selectedDevice !== "" && percentage.current.value) {
      const deviceName = props.devices.filter(
        (device) => device.name === selectedDevice
      );
      const chargeTimes = getChargeTimes(
        deviceName[0],
        selectedHours,
        props.priceData,
        percentage.current.value
      );
      const data = {
        socket: "socket" + selectedSocket,
        chargePlan: chargeTimes,
      };
      console.log(data);
      addChargingPlan(data);
      //console.log(selectedSocket);
    } else {
      //display alert
    }

    //
    //getChargeTimes(props.devices)
  };
  const checkSocketOn = (socketNumber) => {
    const nowHours = new Date().getHours();
    let isOn = "";
    const chargingPlan = props.chargingPlan[socketNumber];
    if (chargingPlan && chargingPlan.charge_time.length > 0) {
      chargingPlan.charge_time.every((plan) => {
        const dateTime = new Date(plan.date);
        console.log(dateTime.getHours());
        console.log(nowHours);
        if (dateTime.getHours() === nowHours) {
          isOn = "on";
          return false;
        }
        return true;
      });
    }
    return isOn;
  };
  return (
    <Container fluid className="justify-content-center">
      <Row className="mt-5 mb-5">
        <h3>
          Select device to charge, and in how many hours you need it to be
          ready:
        </h3>
        <Col md={6}>
          {props.devices.length > 0 ? (
            <Form.Select
              aria-label="Default select example"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.currentTarget.value)}
            >
              <option key="null" value="">
                Select device
              </option>
              {props.devices.map((device) => {
                return (
                  <option key={device.name} value={device.name}>
                    {device.name}
                  </option>
                );
              })}
            </Form.Select>
          ) : (
            <p>Add device to be able to charge it</p>
          )}
        </Col>
        <Col md={6}>
          <Form.Select
            aria-label="Default select example"
            value={selectedHours}
            onChange={(e) => setSelectedHours(e.currentTarget.value)}
          >
            <option value="1">1h</option>
            <option value="2">2h</option>
            <option value="3">3h</option>
            <option value="4">4h</option>
            <option value="5">5h</option>
            <option value="6">6h</option>
            <option value="7">7h</option>
            <option value="8">8h</option>
            <option value="9">9h</option>
            <option value="10">10h</option>
            <option value="11">11h</option>
            <option value="12">12h</option>
            <option value="13">13h</option>
            <option value="14">14h</option>
            <option value="15">15h</option>
            <option value="16">16h</option>
            <option value="17">17h</option>
            <option value="18">18h</option>
            <option value="19">19h</option>
            <option value="20">20h</option>
            <option value="21">21h</option>
            <option value="22">22h</option>
            <option value="23">23h</option>
            <option value="24">24h</option>
          </Form.Select>
        </Col>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>
                Choose in which socket you will plug your device
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={selectedSocket}
                onChange={(e) => setSelectedSocket(e.currentTarget.value)}
              >
                <option value="1">Socket n.1</option>
                <option value="2">Socket n.2</option>
                <option value="3">Socket n.3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Current battery level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 20"
                ref={percentage}
              />
              <Form.Text className="text-muted">Set it in %</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="success" onClick={(e) => startCharge(e)}>
              Start charge!
            </Button>{" "}
          </Col>
        </Row>
      </Row>
      <Row>
        {props.chargingPlan.map((element, index) => {
          return (
            <Col key={"Socket" + index}>
              {element && element.charge_time.length > 0 && (
                <>
                  {element.charge_time.map((plan, index2) => {
                    return (
                      <div key={index + "data" + index2}>
                        <p className="mb-0">{"Date: " + plan.date}</p>
                        <p key={"data" + index}>
                          {"Charging time: " + plan.charge_time + "m"}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </Col>
          );
        })}
      </Row>
      <Row>
        <div id="counter">
          <img
            id="over_pin1"
            src={pics.pin1}
            alt="1"
            className={checkSocketOn(0)}
          />
          <img
            id="over_pin2"
            src={pics.pin2}
            alt="2"
            className={checkSocketOn(1)}
          />
          <img
            id="over_pin3"
            src={pics.pin3}
            alt="3"
            className={checkSocketOn(2)}
          />
          <img id="socket" src={pics.socket} alt="bg" />
        </div>
      </Row>
    </Container>
  );
};

export default VirtualSocket;
