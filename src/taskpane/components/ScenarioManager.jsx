import React from "react";
import {
  Container,
  Title,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
  OutputsLabel,
  SettingsLabel,
} from "./ScenarioManagerStyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "./ExcelMidleware/testfile";

const ScenarioManager = ({ setPageValue }) => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleCreateNewModel = async () => {
    setPageValue("Scenario management");
  };

  const handleLoadExistingModel = async () => {
    try {
      await AWSConnections.downloadAndInsertDataFromExcel(
        "3524544c-b4ca-45f9-bc34-a53dd73f576a.csv",
        "https://download-docket.s3.amazonaws.com/",
        "GENERATE ACE SHEET"
      );
      await Excelfunctions.aceSheetformat("US_TL-01_Non AGA_Dato Dxd_testi");
    } catch (error) {
      console.error("Error loading existing model:", error);
    }
    setPageValue("LoadExistingModelPage");
  };

  const handleViewOutputs = () => {
    setPageValue("ViewOutputsPage");
  };

  const handleForecastSettings = () => {
    setPageValue("ForecastSettingsPage");
  };

  return (
    <Container>
      <Title>Forecast Management</Title>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/computation.svg" alt="Fresh Icon" />
          <FreshLabel>Create new forecast</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <LoadLabel>Load an existing forecast</LoadLabel>
        </Button>
        <Button onClick={handleViewOutputs}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <OutputsLabel>View Outputs</OutputsLabel>
        </Button>
        <Button onClick={handleForecastSettings}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <SettingsLabel>Forecast Settings</SettingsLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ScenarioManager;
