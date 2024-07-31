import React from "react";
import {
  Container,
  ModelManagementButton,
  ButtonsContainer,
  Button,
  Icon,
  FreshLabel,
  LoadLabel,
} from "./OverideConfirmationpagestyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "./ExcelMidleware/testfile";

const Overirdeconfirmation = ({ setPageValue, UUID }) => {
  const handleyes = async () => {

    if (UUID != "") {
      setPageValue("LoadingCircle");
      let Service_flag = await AWSConnections.orchestrationfucntion("GENERATE ACE SHEET", "False", UUID);
      if (Service_flag.result === true) {
        setPageValue("Model Editor"); // Pass the UUID when navigating to the override confirmation page
      }
    } else {
      console.log("Activate MM Sheet");
    }
  };

  const handleNo = async () => {
    setPageValue("Model Editor");
  };

  return (
    <Container>
      <ModelManagementButton>
        The Model with same name already Exist's in the data base, Do you wish to override the Model
      </ModelManagementButton>
      <ButtonsContainer>
        <Button onClick={handleyes}>
          <Icon src="/../assets/create_flow.svg" alt="Fresh Icon" />
          <FreshLabel>Yes</FreshLabel>
        </Button>
        <Button onClick={handleNo}>
          <Icon src="/../assets/load_flow.svg" alt="Load Icon" />
          <LoadLabel>No</LoadLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Overirdeconfirmation;
