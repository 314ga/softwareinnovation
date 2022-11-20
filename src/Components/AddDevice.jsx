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
  const DChargeTime = useRef(0);
  const DChargeDays = useRef(0);
  const addDevice = (e) => {
    e.preventDefault();
    if (
      DName.current.value &&
      DChargeTime.current.value &&
      DChargeDays.current.value
    ) {
      const data = {
        name: DName.current.value,
        chargeTime: DChargeTime.current.value,
        chargeDays: DChargeDays.current.value,
      };
      addDeviceFirestore(data)
        .then((r) => {
          setShowSuccess(true);
          DName.current.value = "";
          DChargeTime.current.value = null;
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
                placeholder="Example: Huawei P20"
                ref={DName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="device">
              <Form.Label>Time from 0% to 100% charge</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 180"
                ref={DChargeTime}
              />
              <Form.Text className="text-muted">
                Set charge time in minutes
              </Form.Text>
            </Form.Group>
          </Col>
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
