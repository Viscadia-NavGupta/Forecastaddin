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
  AssumptionsLabel,
  NewFeatureLabel, // New label for the fifth button
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

  const handleAssumptionsCatalogue = async () => {
    setPageValue("AssumptionsCatalogue");
  };

  const handleNewFeature = async () => {
    setPageValue("NewFeaturePage"); // Define the action for the fifth button
  };

  return (
    <Container>
      <Title>Welcome, Craig Leonardi</Title>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/ModelManaegment.svg" alt="Fresh Icon" />
          <FreshLabel>Model Management</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/scenariomanagement.svg" alt="Load Icon" />
          <LoadLabel>Forecast Management</LoadLabel>
        </Button>
        <Button onClick={handleAssumptionsCatalogue}>
          <Icon src="/../assets/simulations.svg" alt="Another Icon 2" />
          <AssumptionsLabel>Assumptions Catalogue</AssumptionsLabel>
        </Button>
        <Button onClick={handleAnotherAction2}>
          <Icon src="/../assets/simulations.svg" alt="Another Icon 2" />
          <AnotherLabel2>Risk & Analytics</AnotherLabel2>
        </Button>
        <Button onClick={handleNewFeature}> {/* New button */}
          <Icon src="/../assets/simulations.svg" alt="New Feature Icon" />
          <NewFeatureLabel>Report Genie</NewFeatureLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
