import React, { useState } from "react";
import { pics } from "../constants";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const VirtualSocket = (props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <Container fluid className="justify-content-center">
      <Row>
        <div id="counter">
          <img id="over_pin1" src={pics.pin1} alt="1" />
          <img id="over_pin2" src={pics.pin2} alt="2" />
          <img id="over_pin3" src={pics.pin3} alt="3" />
          <img id="socket" src={pics.socket} alt="bg" />
        </div>
      </Row>
    </Container>
  );
};

export default VirtualSocket;
