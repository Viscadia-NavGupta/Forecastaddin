import React from "react";
import {
  Container,
  ModelManagementButton,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
} from "./ModelManagmentStyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";

const ModelManagementPage1 = () => {
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
      // await AWSConnections.uploadFileToS3test(
      //   "13460925-5481-0A4C-8F81-B7495E7E3C41",
      //   "https://upload-docket.s3.amazonaws.com/",
      //   "GENERATE ACE SHEET"
      // );
      await MMfunctions.addflow1();
    } catch (error) {
      console.error("Error loading existing model:", error);
    }
  };

  return (
    <Container>
      <ModelManagementButton>Model Management</ModelManagementButton>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/create_flow.svg" alt="Fresh Icon" />
          <FreshLabel>Create New Model</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/load_flow.svg" alt="Load Icon" />
          <LoadLabel>Load Existing Model</LoadLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ModelManagementPage1;
