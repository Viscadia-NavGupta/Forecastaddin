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
  const [message, setMessage] = useState("Message: Please select any button");

  const RunScenario = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename !== "Model Management" && servicename !== "outputs") {
      setPageValue("LoadingCircle");
      const result = await AWSConnections.orchestrationfucntion("RUN COMPUTATION");
      console.log("Outputs fetched");
      await setMessage("Scenario run successfully.");
      setPageValue("Scenario management");
    } else {
      console.log("Active ACE sheet");
      await setMessage("Active ACE sheet not detected.");
    }
  };

  const menuItems = [
    { icon: "/../assets/create_flow.svg", text: "Run Scenario", action: () => RunScenario() },
    { icon: "/../assets/create_flow.svg", text: "Save Scenario", action: () => console.log("Button 1 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Lock Scenario", action: () => console.log("Button 2 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Load Assumptions", action: () => console.log("Button 3 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Load Scenario", action: () => console.log("Button 4 clicked") },
    { icon: "/../assets/create_flow.svg", text: "View Outputs", action: () => console.log("Button 5 clicked") },
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
