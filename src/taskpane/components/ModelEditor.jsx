import React from "react";
import { Container, ModelManagementButton, ButtonsContainer, Button, Icon, Label } from "./modelEditorstyles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";
import * as MMfunctions from "./ExcelMidleware/ModelManagmentFunctions";

const MMSheetManagment = ({ setPageValue }) => {
  const handleCreateNewModel = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename === "Model Management") {
      setPageValue("LoadingCircle");
      let Service_flag = await AWSConnections.orchestrationfucntion("GENERATE ACE SHEET", "True");
      if (Service_flag.result === "Override") {
        setPageValue("Overirdeconfirmation", Service_flag.uuid); // Pass the UUID when navigating to the override confirmation page
      } else {
        setPageValue("Model Editor");
      }
    } else {
      console.log("Activate MM Sheet");
    }
  };

  const menuItems = [
    { icon: "/../assets/Createmodel.svg", text: "Create Model", action: () => handleCreateNewModel() },
    { icon: "/../assets/AddAssumptions.svg", text: "Add Assumption", action: () => MMfunctions.addAssumption() },
    {
      icon: "/../assets/deleteAssumption.svg",
      text: "Delete Assumption",
      action: () => MMfunctions.deleteAssumption(),
    },
    { icon: "/../assets/addflow.svg", text: "Add Flow", action: () => MMfunctions.addFlow() },
    { icon: "/../assets/deleteflow.svg", text: "Delete Flow", action: () => MMfunctions.deleteflow() },
    { icon: "/../assets/adddimension.svg", text: "Add Dimension", action: () => MMfunctions.addDimension1() },
    {
      icon: "/../assets/deletedimension.svg",
      text: "Delete Dimension",
      action: () => MMfunctions.deletediemnsions(),
    },
    { icon: "/../assets/create_flow.svg", text: "Add SKU", action: () => MMfunctions.addSku() },
    { icon: "/../assets/create_flow.svg", text: "Delete SKU", action: () => MMfunctions.DeleteSku() },
    { icon: "/../assets/create_flow.svg", text: "Add Product", action: () => MMfunctions.addProduct() },
    { icon: "/../assets/create_flow.svg", text: "Delete Product", action: () => MMfunctions.deleteProduct() },
  ];

  return (
    <Container>
      <ModelManagementButton>Model Editor</ModelManagementButton>
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

export default MMSheetManagment;
