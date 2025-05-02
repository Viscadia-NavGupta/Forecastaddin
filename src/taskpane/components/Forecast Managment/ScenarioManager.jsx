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
  NewFeatureLabel,
  EnableCalculationsLabel, // Added this line
} from "./ScenarioManagerStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";
// import * as Excelfunctions from "../ExcelMidleware/excelFucntions";
import * as MMfunctions from "../ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "../ExcelMidleware/testfile";
import * as testing from "../AWS Midleware/test";

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
    activateDashboardSheet();
  };

  const handleForecastSettings = () => {
    setPageValue("ForecastSettingsPage");
  };

  const handleNewFeature = async () => {
    console.log("Navigating to LockScenario page");
    setPageValue("LockScenario");
  };


  const handleEnableCalculations = async () => {
    await activateSheet("ACE- Calcs");
  };

  async function processFiles(fileNames, s3Url, serviceName) {
    for (const fileName of fileNames) {
      try {
        const result = await testing.downloadAndInsertDataFromExcel(fileName, s3Url, serviceName);
        if (result.success) {
          console.log("File processed successfully:", fileName);
        } else {
          console.error("Error processing file:", fileName, result.error);
        }
      } catch (error) {
        console.error(`An error occurred while processing ${fileName}:`, error);
      }
    }
  }

  const RunScenario = async () => {
    console.log("RunScenario function called");

    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename !== "Model Management" && servicename !== "outputs") {
      setPageValue("LoadingCircle", "", "Running Computation, please wait...");
      const result = await AWSConnections.orchestrationfucntion("RUN COMPUTATION");
      console.log("Outputs fetched");
      setPageValue("ScenarioManager");
      await Excelfunctions.activateSheet("Forecast Summary");
      await refreshPivotTable("Forecast Summary", "PivotTable1");

      if (isFirstRun) {
        setMessage("Please select any button");
        setIsFirstRun(false);
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
    setPageValue("savescenario");
  };

  async function activateDashboardSheet() {
    try {
      await Excel.run(async (context) => {
        const sheetName = "Dashboard";
        const workbook = context.workbook;
        const dashboardSheet = workbook.worksheets.getItem(sheetName);
        dashboardSheet.load("name");
        await context.sync();
        dashboardSheet.activate();
        await context.sync();
        console.log(`The sheet '${sheetName}' has been activated.`);
      });
    } catch (error) {
      console.error("Error activating sheet:", error);
    }
  }

  async function refreshPivotTable(sheetName, pivotTableName) {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem(sheetName);
        const pivotTable = sheet.pivotTables.getItem(pivotTableName);
        pivotTable.refresh();
        await context.sync();
        console.log(`PivotTable '${pivotTableName}' in sheet '${sheetName}' refreshed successfully.`);
      });
    } catch (error) {
      console.error(`Error refreshing PivotTable: ${error}`);
    }
  }

  async function activateSheet(sheetName) {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem(sheetName);
        sheet.activate();
        await context.sync();
        console.log(`Sheet '${sheetName}' activated.`);
      });
    } catch (error) {
      console.error(`Error activating sheet: ${error}`);
    }
  }



  return (
    <Container>
      <Title>Forecast Management</Title>
      <ButtonsContainer>
        <Button onClick={handleLoadforecast}>
          <Icon src="/../assets/computation.svg" alt="Fresh Icon" />
          <FreshLabel>Load</FreshLabel>
        </Button>
        <Button onClick={RunScenario}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <LoadLabel>Compute</LoadLabel>
        </Button>
        <Button onClick={handleViewOutputs}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <OutputsLabel>Outputs</OutputsLabel>
        </Button>
        <Button onClick={SaveScenario}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <SettingsLabel>Save</SettingsLabel>
        </Button>
        <Button onClick={handleNewFeature}>
          <Icon src="/../assets/loadmodel.svg" alt="New Feature Icon" />
          <NewFeatureLabel>Lock</NewFeatureLabel>
        </Button>
        {/* New Enable Calculations Button */}
        <Button onClick={handleEnableCalculations}>
          <Icon src="/../assets/loadmodel.svg" alt="Enable Calculations Icon" />
          <EnableCalculationsLabel>Enable Calculations</EnableCalculationsLabel>
        </Button>
      </ButtonsContainer>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <a href="#" onClick={() => setPageValue("DynamicButtonComponent")}>
          ACE
          <span style={{ fontSize: "60%" }}>
            <sup>TM</sup>
          </span>{" "}
          Navigation
        </a>
      </div>
    </Container>
  );
};

export default ScenarioManager;
