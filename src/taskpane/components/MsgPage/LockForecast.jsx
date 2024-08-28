import React from "react";
import {
  Container,
  Heading,
  MessageBox,
  SaveButton,
} from "./SaveforecastPagestyles";

const Lockedforecast = ({ setPageValue }) => {
  const handleButtonClick = () => {
    setPageValue("Home");
  };

  return (
    <Container>
      <MessageBox>Forecast is Locked</MessageBox>
      <SaveButton onClick={handleButtonClick}>Go to Home</SaveButton>
    </Container>
  );
};

export default Lockedforecast;
