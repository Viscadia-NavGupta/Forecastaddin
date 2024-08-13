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
  NewFeatureLabel, // Add this line
} from "./ScenarioManagerStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";
import * as Excelfunctions from "../ExcelMidleware/excelFucntions";
import * as MMfunctions from "../ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "../ExcelMidleware/testfile";

const ScenarioManager = ({ setPageValue }) => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleLoadforecast = async () => {
    setPageValue("LoadPage");
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

  const handleNewFeature = () => {
    // Add this function
    setPageValue("NewFeaturePage");
  };
  const RunScenario = async () => {
    console.log("RunScenario function called");

    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename !== "Model Management" && servicename !== "outputs") {
      setPageValue("LoadingCircle");
      const result = await AWSConnections.orchestrationfucntion("RUN COMPUTATION");
      console.log("Outputs fetched");
      setPageValue("Scenario management");

      if (isFirstRun) {
        setMessage("Please select any button");
        setIsFirstRun(false); // Mark that the first run has occurred
      } else {
        setMessage("Scenario run successfully.");
        setIsFirstRun(true);
      }
    } else {
      console.log("Active ACE sheet");
      setMessage("Active ACE sheet not detected.");
      setIsFirstRun(true);
    }
  };
  const SaveScenario = async () => {
    console.log("Save Scenario function called");

    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename == "outputs") {
      setPageValue("savescenario");
    } else {
      console.log("Activate Outputs sheet");
      setMessage("Activate Outputs sheet");
      setIsFirstRun(true);
    }
  };
  return (
    <Container>
      <Title>Forecast Management</Title>
      <ButtonsContainer>
        <Button onClick={handleLoadforecast}>
          <Icon src="/../assets/computation.svg" alt="Fresh Icon" />
          <FreshLabel>Load Forecast</FreshLabel>
        </Button>
        <Button onClick={RunScenario}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <LoadLabel>Run Computation</LoadLabel>
        </Button>
        <Button onClick={handleViewOutputs}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <OutputsLabel>View Outputs</OutputsLabel>
        </Button>
        <Button onClick={SaveScenario}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <SettingsLabel>Save Forecast</SettingsLabel>
        </Button>
        <Button onClick={handleNewFeature}>
          <Icon src="/../assets/loadmodel.svg" alt="New Feature Icon" />
          <NewFeatureLabel>Lock Forecast</NewFeatureLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ScenarioManager;
