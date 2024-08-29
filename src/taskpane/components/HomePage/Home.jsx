import React from "react";
import {
  Container,
  Title,
  ButtonsContainer,
  Button,
  FreshLabel,
  LoadLabel,
  AnotherLabel2,
  AssumptionsLabel,
  NewFeatureLabel,
  OpenGoogleLabel, // New label for the Google button
} from "./HomeStyles";

// Importing all the icons as React components
import ModelDesignIcon from "../Icons/ModelDesignIcon";
import ForecastManagementIcon from "../Icons/ForecastManagementIcon";
import CatalogueIcon from "../Icons/CatalogueIcon";
import PowerBiIcon from "../Icons/powerbiicon";
import ReportGenieIcon from "../Icons/ReportGenieIcon";
import RiskIcon from "../Icons/Riskicons"; // Corrected component name

const Home = ({ setPageValue }) => {
  const username = "Craig Leonardi"; // Use a fixed name for demo purposes

  const handleCreateNewModel = async () => {
    setPageValue("ModelManagementPage1");
  };

  const handleLoadExistingModel = async () => {
    setPageValue("ScenarioManager");
  };

  const handleAnotherAction2 = async () => {
    setPageValue("RiskManager");
  };

  const handleAssumptionsCatalogue = async () => {
    setPageValue("LoadAssumptions");
  };

  const handleNewFeature = async () => {
    setPageValue("ImportReportGenie"); // Define the action for the fifth button
  };

  const handleOpenGoogle = () => {
    window.open(
      "https://app.powerbi.com/links/Umg-8JIt0M?ctid=c05372cf-28bd-4caf-83dd-e8b65c066ce9&pbi_source=linkShare",
      "_blank"
    );
  };

  return (
    <Container>
      <Title>
        Welcome,
        <span>{username}</span>
      </Title>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <ModelDesignIcon width="30" height="30" color="#7F7F7F" />
          <FreshLabel>Model Management</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <ForecastManagementIcon width="30" height="30" color="#7F7F7F" />
          <LoadLabel>Forecast Management</LoadLabel>
        </Button>
        <Button onClick={handleAssumptionsCatalogue}>
          <CatalogueIcon width="30" height="30" color="#7F7F7F" />
          <AssumptionsLabel>Assumptions Catalogue</AssumptionsLabel>
        </Button>
        <Button onClick={handleAnotherAction2}>
          <RiskIcon width="30" height="30" color="#7F7F7F" />
          <AnotherLabel2>Risk & Analytics</AnotherLabel2>
        </Button>
        <Button onClick={handleOpenGoogle}>
          <PowerBiIcon width="30" height="30" color="#7F7F7F" />
          <OpenGoogleLabel>Power BI Report</OpenGoogleLabel>
        </Button>
        <Button onClick={handleNewFeature}>
          <ReportGenieIcon width="30" height="30" color="#7F7F7F" />
          <NewFeatureLabel>Report Genie</NewFeatureLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
