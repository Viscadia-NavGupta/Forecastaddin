import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Heading,
  DropdownContainer,
  ImportButton,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledCheckbox,
  StyledListItemText,
  StyledOutlinedInput,
  StyledMenuItem,
} from "./LoadAssumptionsStyles";
import { DataFrame } from "dataframe-js";
import * as testing from "../AWS Midleware/AssumptionsCatelougeAWS"; // Ensure correct import path
import * as excelfucntions from "../ExcelMidleware/excelFucntions";

const LoadAssumptions = ({ setPageValue }) => {
  const [dropdownItems, setDropdownItems] = useState({ Cycle: [], "Asset | Indication | Scenario": [] });
  const [selectedItems, setSelectedItems] = useState({ Cycle: [], "Asset | Indication | Scenario": [] });
  const [dataFrame, setDataFrame] = useState(new DataFrame([]));
  const storedUsername = useMemo(() => sessionStorage.getItem("username"), []);

  useEffect(() => {
    fetchDataFromLambda();
  }, []);

  const fetchDataFromLambda = async () => {
    const url = "https://k06jq91m02.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/SQLdbQueryTest/user-login";
    const jsonPayload = JSON.stringify({ email_id: storedUsername, action: "Fetch Metadata" });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonPayload,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseBody = await response.json();
      const df = new DataFrame(responseBody.results1);
      setDataFrame(df);

      // Populate Cycle dropdown items
      const cycleItems = df
        .distinct("cycle_name")
        .toArray()
        .map((row) => row[0])
        .filter((value) => value && value.trim() !== "");

      setDropdownItems((prevState) => ({
        ...prevState,
        Cycle: cycleItems,
      }));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateAssetIndicationScenarioDropdown = (df, selectedCycle) => {
    if (selectedCycle.length > 0) {
      const filteredDF = df.filter((row) => selectedCycle.includes(row.get("cycle_name")));

      const assetItems = filteredDF
        .select("asset", "indication", "scenario_name")
        .dropDuplicates()
        .toCollection()
        .map((row) => {
          const parts = [row.asset, row.indication, row.scenario_name].filter((part) => part && part.trim() !== "");
          return parts.join(" | ");
        })
        .filter((value) => value !== "");

      setDropdownItems((prevState) => ({
        ...prevState,
        "Asset | Indication | Scenario": assetItems,
      }));
    } else {
      // Clear Asset | Indication | Scenario dropdown items if no cycle is selected
      setDropdownItems((prevState) => ({
        ...prevState,
        "Asset | Indication | Scenario": [],
      }));
    }
  };

  const handleDropdownChange = (event, label) => {
    const selectedValues = typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value;
    setSelectedItems((prevState) => {
      const updatedItems = { ...prevState, [label]: selectedValues };

      if (label === "Cycle") {
        // Update the Asset | Indication | Scenario dropdown based on the selected Cycle
        updateAssetIndicationScenarioDropdown(dataFrame, selectedValues);
      }

      return updatedItems;
    });
  };

  const handleNewFeature = async () => {
    console.log("handleNewFeature triggered");
    setPageValue("LoadingCircle", "", "Updating Assumptions, please wait...");
    await clearReportGenieBackendData();

    try {
      const selectedCycles = selectedItems["Cycle"];
      const selectedAssetIndicationScenario = selectedItems["Asset | Indication | Scenario"];

      // Filter based on selected cycles
      let filteredDF = dataFrame.filter((row) => selectedCycles.includes(row.get("cycle_name")));

      // Further filter based on selected "Asset | Indication | Scenario"
      if (selectedAssetIndicationScenario.length > 0) {
        const parsedSelections = selectedAssetIndicationScenario.map((selection) => {
          const [asset, indication, scenario] = selection.split(" | ");
          return { asset, indication, scenario };
        });

        filteredDF = filteredDF.filter((row) => {
          return parsedSelections.some(
            (selection) =>
              row.get("asset") === selection.asset &&
              row.get("indication") === selection.indication &&
              row.get("scenario_name") === selection.scenario
          );
        });
      }

      let fileNames = filteredDF
        .select("output_id")
        .toArray()
        .map((row) => row[0]);
      const cycle_names = filteredDF
        .select("cycle_name")
        .toArray()
        .map((row) => row[0]);
      const scenario_names = filteredDF
        .select("scenario_name")
        .toArray()
        .map((row) => row[0]);

      // Append .xlsx to each file name
      fileNames = fileNames.map((fileName) => `${fileName}.csv`);

      console.log("Filtered fileNames:", fileNames);
      console.log("Cycle Names:", cycle_names);
      console.log("Scenario Names:", scenario_names);

      const s3Url = "https://download-docket.s3.amazonaws.com/Assumptions Backend Data/";
      const serviceName = "RUN COMPUTATION";

      for (let i = 0; i < fileNames.length; i++) {
        try {
          const result = await testing.downloadAndInsertDataFromExcel(
            fileNames[i],
            s3Url,
            serviceName,
            cycle_names[i] || "",
            scenario_names[i] || ""
          );
          if (result.success) {
            console.log("File processed successfully:", fileNames[i]);
          } else {
            console.error("Error processing file:", fileNames[i], result.error);
          }
        } catch (error) {
          console.error(`An error occurred while processing ${fileNames[i]}:`, error);
        }
      }
    } catch (error) {
      console.error("Error in handleNewFeature:", error);
    }
    setPageValue("LoadAssumptions");
    await excelfucntions.activateSheet("Assumptions Catalogue");
    await refreshPivotTable("Assumptions Catalogue", "PivotTable1");
  };

  async function clearReportGenieBackendData() {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem("Assumptions Backend");

        // Get the last used cell in the sheet
        const lastCell = sheet.getUsedRange().getLastCell();
        lastCell.load("address"); // Explicitly load the address property

        await context.sync(); // Sync to load the last cell's address

        // Define the range starting from A2 to the last used cell
        const range = sheet.getRange(`A2:${lastCell.address}`);

        // Clear the content starting from A2 in all columns and rows
        range.clear(Excel.ClearApplyTo.contents);

        await context.sync();
        console.log("Data cleared successfully from 'Report Genie Backend' sheet starting from A2.");
      });
    } catch (error) {
      console.error("Error clearing data from 'Report Genie Backend' sheet: ", error);
    }
  }

  async function refreshPivotTable(sheetName, pivotTableName) {
    try {
      await Excel.run(async (context) => {
        // Get the specific worksheet
        const sheet = context.workbook.worksheets.getItem(sheetName);

        // Get the PivotTable
        const pivotTable = sheet.pivotTables.getItem(pivotTableName);

        // Refresh the PivotTable
        pivotTable.refresh();

        await context.sync();
        console.log(`PivotTable '${pivotTableName}' in sheet '${sheetName}' refreshed successfully.`);
      });
    } catch (error) {
      console.error(`Error refreshing PivotTable: ${error}`);
    }
  }

  return (
    <Container>
      <Heading>Assumptions Catalogue</Heading>
      <DropdownContainer>
        {["Cycle", "Asset | Indication | Scenario"].map((label) => (
          <StyledFormControl key={label}>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledSelect
              multiple
              value={selectedItems[label]}
              onChange={(event) => handleDropdownChange(event, label)}
              input={<StyledOutlinedInput label={label} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                    width: 250,
                    overflowX: "hidden",
                  },
                },
              }}
            >
              {dropdownItems[label].map((item, index) => (
                <StyledMenuItem key={index} value={item}>
                  <StyledCheckbox checked={selectedItems[label].indexOf(item) > -1} />
                  <StyledListItemText primary={item} />
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        ))}
      </DropdownContainer>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <ImportButton onClick={handleNewFeature}>Import Data→</ImportButton>
      </div>
    </Container>
  );
};

export default LoadAssumptions;
