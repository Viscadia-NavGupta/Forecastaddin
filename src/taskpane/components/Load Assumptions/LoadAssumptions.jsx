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
import * as testing from "../AWS Midleware/AssumptionsCatelougeAWS";
import * as excelfucntions from "../ExcelMidleware/excelFucntions";

const LoadAssumptions = ({ setPageValue }) => {
  const [dropdownItems, setDropdownItems] = useState({ Cycle: [], "Geography | Asset | Indication | Scenario": [] });
  const [selectedItems, setSelectedItems] = useState({ Cycle: [], "Geography | Asset | Indication | Scenario": [] });
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

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const responseBody = await response.json();
      const df = new DataFrame(responseBody.results1);
      setDataFrame(df);

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

  const updateGAISDropdown = (df, selectedCycle) => {
    if (selectedCycle.length > 0) {
      const filteredDF = df.filter((row) => selectedCycle.includes(row.get("cycle_name")));

      const items = filteredDF
        .select("geography", "asset", "indication", "scenario_name")
        .dropDuplicates()
        .toCollection()
        .map((row) => {
          const parts = [row.geography, row.asset, row.indication, row.scenario_name]
            .filter((part) => part && part.trim() !== "");
          return parts.join(" | ");
        })
        .filter((value) => value !== "");

      setDropdownItems((prevState) => ({
        ...prevState,
        "Geography | Asset | Indication | Scenario": items,
      }));
    } else {
      setDropdownItems((prevState) => ({
        ...prevState,
        "Geography | Asset | Indication | Scenario": [],
      }));
    }
  };

  const handleDropdownChange = (event, label) => {
    const selectedValues = typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value;
    setSelectedItems((prevState) => {
      const updatedItems = { ...prevState, [label]: selectedValues };

      if (label === "Cycle") {
        updateGAISDropdown(dataFrame, selectedValues);
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
      const selectedGAIS = selectedItems["Geography | Asset | Indication | Scenario"];

      let filteredDF = dataFrame.filter((row) => selectedCycles.includes(row.get("cycle_name")));

      if (selectedGAIS.length > 0) {
        const parsedSelections = selectedGAIS.map((selection) => {
          const [geography, asset, indication, scenario] = selection.split(" | ");
          return { geography, asset, indication, scenario };
        });

        filteredDF = filteredDF.filter((row) =>
          parsedSelections.some(
            (s) =>
              row.get("geography") === s.geography &&
              row.get("asset") === s.asset &&
              row.get("indication") === s.indication &&
              row.get("scenario_name") === s.scenario
          )
        );
      }

      let fileNames = filteredDF
        .select("output_id")
        .toArray()
        .map((row) => `${row[0]}.csv`);

      const cycle_names = filteredDF
        .select("cycle_name")
        .toArray()
        .map((row) => row[0]);

      const scenario_names = filteredDF
        .select("scenario_name")
        .toArray()
        .map((row) => row[0]);

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
        const lastCell = sheet.getUsedRange().getLastCell();
        lastCell.load("address");
        await context.sync();

        const range = sheet.getRange(`A2:${lastCell.address}`);
        range.clear(Excel.ClearApplyTo.contents);

        await context.sync();
        console.log("Data cleared successfully from 'Assumptions Backend' sheet starting from A2.");
      });
    } catch (error) {
      console.error("Error clearing data from 'Assumptions Backend' sheet: ", error);
    }
  }

  async function refreshPivotTable(sheetName, pivotTableName) {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem(sheetName);
        const pivotTable = sheet.pivotTables.getItem(pivotTableName);
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
        {["Cycle", "Geography | Asset | Indication | Scenario"].map((label) => (
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
