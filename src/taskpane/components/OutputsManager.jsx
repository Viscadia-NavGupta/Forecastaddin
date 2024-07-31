import React from "react";
import {
  Container,
  ModelManagementTitle,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
} from "./Outputsmanagerstyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "./ExcelMidleware/testfile";

const Outputsmaneger = () => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleCreateNewModel = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename === "EU_CC_PDL_TV_TEST_AA_2") {
      await AWSConnections.orchestrationfucntion();
      console.log("ACE Generated");
    } else {
      console.log("Activate MM Sheet");
    }
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
  };

  return (
    <Container>
      <ModelManagementTitle>Forecast Reporting</ModelManagementTitle>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/dashboard.svg" alt="Fresh Icon" />
          <FreshLabel>View Outputs</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/forecastsetting.svg" alt="Load Icon" />
          <LoadLabel>Forecast Setting</LoadLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Outputsmaneger;
