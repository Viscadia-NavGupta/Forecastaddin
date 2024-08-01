import React, { useState } from "react";
import {
  Container,
  ModelManagementButton,
  ButtonsContainer,
  Button,
  Icon,
  Label,
  MessageBox,
} from "./scenariomanegmentstyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";

const ScenarioManagement = ({ setPageValue }) => {
  const [message, setMessage] = useState("Please select any button");
  const [isFirstRun, setIsFirstRun] = useState(true);

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

  const menuItems = [
    { icon: "/../assets/create_flow.svg", text: "Run Computation", action: RunScenario },
    { icon: "/../assets/create_flow.svg", text: "Save Forecast", action: () => console.log("Button 1 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Lock Forecast", action: () => console.log("Button 2 clicked") },
    // { icon: "/../assets/create_flow.svg", text: "Load Assumptions", action: () => console.log("Button 3 clicked") },
  ];

  return (
    <Container>
      <ModelManagementButton>Scenario Management</ModelManagementButton>
      {message && <MessageBox>{message}</MessageBox>}
      <ButtonsContainer>
        {menuItems.map((item, index) => (
          <Button key={index} onClick={item.action}>
            <Icon src={item.icon} alt={`Icon ${index + 1}`} />
            <Label>{item.text}</Label>
          </Button>
        ))}
      </ButtonsContainer>
    </Container>
  );
};

export default ScenarioManagement;
