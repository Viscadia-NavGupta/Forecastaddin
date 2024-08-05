import React from "react";
import {
  Container,
  ModelManagementTitle,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
} from "./ModelManagmentStyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "./ExcelMidleware/testfile";

const ModelManagementPage1 = ({ setPageValue }) => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleCreateNewModel = async () => {
    setPageValue("Model Editor");
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

  return (
    <Container>
      <ModelManagementTitle>Model Desinger</ModelManagementTitle>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/model.svg" alt="Fresh Icon" />
          <FreshLabel>Design a new model</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <LoadLabel>Load an existing model</LoadLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ModelManagementPage1;
