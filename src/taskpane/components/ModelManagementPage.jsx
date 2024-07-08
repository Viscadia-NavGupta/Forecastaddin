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
      await AWSConnections.downloadAndInsertDataFromExcel(
        "8ab0233d-5c3d-473a-885f-e9fe82990f22",
        "https://download-docket.s3.amazonaws.com/",
        "RUN COMPUTATION"
      );
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
