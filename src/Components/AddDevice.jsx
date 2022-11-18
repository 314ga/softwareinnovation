import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addDeviceFirestore } from "../database/firestore";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

const AddDevice = (props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const DName = useRef("");
  const DBatterySize = useRef(0);
  const DChargerOutputV = useRef(0);
  const DChargerOutputA = useRef(0);
  const DChargeDays = useRef(0);
  const addDevice = (e) => {
    e.preventDefault();
    if (
      DName.current.value &&
      DBatterySize.current.value &&
      DChargerOutputV.current.value &&
      DChargerOutputA.current.value &&
      DChargeDays.current.value
    ) {
      const data = {
        name: DName.current.value,
        batterySize: DBatterySize.current.value,
        chargerOutputV: DChargerOutputV.current.value,
        chargerOutputA: DChargerOutputA.current.value,
        chargeDays: DChargeDays.current.value,
      };
      addDeviceFirestore(data)
        .then((r) => {
          setShowSuccess(true);
          DName.current.value = "";
          DBatterySize.current.value = null;
          DChargerOutputV.current.value = null;
          DChargerOutputA.current.value = null;
          DChargeDays.current.value = null;
        })
        .catch((e) => {
          setErrorText(e);
          setShowError(true);
          console.log(e);
        });
    }
  };
  /**
   * Device name
   */
  return (
    <>
      <Container fluid className="justify-content-center">
        <Row className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Device name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: Owl"
                ref={DName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Battery size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 4500"
                ref={DBatterySize}
              />
              <Form.Text className="text-muted">
                Set batterry size in mAh
              </Form.Text>
            </Form.Group>
          </Col>
          <Col className="justify-content-center" sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Charger Output V</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 5"
                ref={DChargerOutputV}
              />
              <Form.Text className="text-muted">Set output V in V</Form.Text>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Charger Output A</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 4.5"
                ref={DChargerOutputA}
              />
              <Form.Text className="text-muted">Set output A in A</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>How often are you charging your device?</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 2"
                ref={DChargeDays}
              />
              <Form.Text className="text-muted">Number of days</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => addDevice(e)}
            >
              Add device
            </Button>
          </Col>
        </Row>
        <Alert show={showSuccess} variant="success">
          <p> Device successfully added to database</p>

          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setShowSuccess(false)}
              variant="outline-success"
            >
              Close
            </Button>
          </div>
        </Alert>
        <Alert
          variant="danger"
          show={showError}
          onClose={() => setShowError(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! Error!</Alert.Heading>
          <p>{errorText}</p>
        </Alert>
        <h4>List of devices:</h4>
        {props.devices.length > 0 ? (
          <ListGroup>
            {props.devices.map((device) => {
              return (
                <ListGroup.Item key={device.name}>{device.name}</ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <p>No devices </p>
        )}
      </Container>
    </>
  );
};

export default AddDevice;
