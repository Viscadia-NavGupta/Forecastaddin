import React from "react";
import {
  Container,
  Heading,
  MessageBox,
  SaveButton,
} from "./SaveforecastPagestyles";

const SaveForecastPage = ({ setPageValue }) => {
  const handleButtonClick = () => {
    setPageValue("Home");
  };

  return (
    <Container>
      <MessageBox>Forecast is saved</MessageBox>
      <SaveButton onClick={handleButtonClick}>Go to Home</SaveButton>
    </Container>
  );
};

export default SaveForecastPage;
