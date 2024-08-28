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
import * as AWSConnections from "../AWS Midleware/AWSConnections";
import * as Excelfunctions from "../ExcelMidleware/excelFucntions";
import * as MMfunctions from "../ExcelMidleware/ModelManagmentFunctions";
import * as testfucntions from "../ExcelMidleware/testfile";

const ModelManagementPage1 = ({ setPageValue }) => {
  const username = sessionStorage.getItem("username");
  console.log(username);

  Excelfunctions.unhideSheet("Model Management");
  Excelfunctions.unhideSheet("Demo ACE");

  function unhideActivateSheetAndSelectA1() {
    Excel.run(async (context) => {
      const workbook = context.workbook;
      const sheetName = "Model Management | Demo";


      // Try to get the worksheet with the specified name
      const sheet = workbook.worksheets.getItemOrNullObject(sheetName);
      sheet.load("name, visibility");

      await context.sync();

      if (!sheet.isNullObject) {
        // If the sheet is hidden, unhide it
        if (sheet.visibility === Excel.SheetVisibility.hidden) {
          sheet.visibility = Excel.SheetVisibility.visible;
          console.log(`Sheet "${sheetName}" was hidden and is now visible.`);
        } else {
          console.log(`Sheet "${sheetName}" is already visible.`);
        }

        // Activate the sheet
        sheet.activate();
        console.log(`Sheet "${sheetName}" is now active.`);

        // Select and activate cell A1
        const range = sheet.getRange("A1");
        range.select();
        console.log(`Cell A1 in sheet "${sheetName}" is now selected.`);
      } else {
        console.log(`Sheet "${sheetName}" does not exist.`);
      }

      await context.sync();
    }).catch((error) => {
      console.error(`Error: ${error}`);
    });
  }

  const handleCreateNewModel = async () => {
    unhideActivateSheetAndSelectA1();
    setPageValue("Model Editor");
  };

  const handleLoadExistingModel = async () => {
    setPageValue("Importfunnel");
  };

  return (
    <Container>
      <ModelManagementTitle>Model Management</ModelManagementTitle>
      <ButtonsContainer>
        <Button onClick={handleCreateNewModel}>
          <Icon src="/../assets/model.svg" alt="Fresh Icon" />
          <FreshLabel>Design New Model</FreshLabel>
        </Button>
        <Button onClick={handleLoadExistingModel}>
          <Icon src="/../assets/loadmodel.svg" alt="Load Icon" />
          <LoadLabel>Load Existing Model</LoadLabel>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ModelManagementPage1;
