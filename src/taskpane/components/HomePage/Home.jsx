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
import * as AWSconnections from "../AWS Midleware/AWSConnections";

const Home = ({ setPageValue }) => {
  const username = "Craig Leonardi"; // Use a fixed name for demo purposes

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
    setPageValue("LoadAssumptions");
  };

  const handleNewFeature = async () => {
    setPageValue("ReportGinnie"); // Define the action for the fifth button
  };

  return (
    <Container>
      <Title>
        Welcome,
        <span>{username}</span>
      </Title>
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
          <Icon src="/../assets/Homecatelouge.svg" alt="Another Icon 2" />
          <AssumptionsLabel>Assumptions Catalogue</AssumptionsLabel>
        </Button>
        <Button onClick={handleAnotherAction2}>
          <Icon src="/../assets/Homeanalytics.svg" alt="Another Icon 2" />
          <AnotherLabel2>Risk & Analytics</AnotherLabel2>
        </Button>
        <Button onClick={handleNewFeature}> {/* New button */}
          <Icon src="/../assets/Homereportgenie.svg" alt="New Feature Icon" />
          <NewFeatureLabel>Report Genie</NewFeatureLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
