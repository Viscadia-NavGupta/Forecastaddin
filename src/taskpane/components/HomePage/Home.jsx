import React from "react";
import {
  Container,
  Title,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
  AnotherLabel1,
  AnotherLabel2,
} from "./HomeStyles";

const Home = ({ setPageValue }) => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleCreateNewModel = async () => {
    setPageValue("ModelManagementPage1");
  };

  const handleLoadExistingModel = async () => {
    setPageValue("ScenarioManager");
  };

  const handleAnotherAction1 = async () => {
    setPageValue("OutputManager");
  };

  const handleAnotherAction2 = async () => {
    setPageValue("RiskManager");
  };

  return (
    <Container>
      <Title>Welcome, Aditya</Title>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/ModelManaegment.svg" alt="Fresh Icon" />
          <FreshLabel>Model Management</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/scenariomanagement.svg" alt="Load Icon" />
          <LoadLabel>Scenario Management</LoadLabel>
        </Button>
        <Button onClick={handleAnotherAction1}>
          <Icon src="/../assets/dashboard.svg" alt="Another Icon 1" />
          <AnotherLabel1>Outputs</AnotherLabel1>
        </Button>
        <Button onClick={handleAnotherAction2}>
          <Icon src="/../assets/simulations.svg" alt="Another Icon 2" />
          <AnotherLabel2>Risk Analytics</AnotherLabel2>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
