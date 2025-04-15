import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Heading,
  DropdownContainer,
  ImportButton,
  FilterButton,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledCheckbox,
  StyledListItemText,
  StyledOutlinedInput,
  StyledMenuItem,
} from "./ImportReportStyles";
import { DataFrame } from "dataframe-js";
import * as testing from "../AWS Midleware/test";
import * as excelfucntions from "../ExcelMidleware/excelFucntions";

const ImportReport = ({ setPageValue }) => {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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

  const updateGeoAssetIndicationScenarioDropdown = (df, selectedCycle) => {
    if (selectedCycle.length > 0) {
      const filteredDF = df.filter((row) => selectedCycle.includes(row.get("cycle_name")));

      const gaisItems = filteredDF
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
        "Geography | Asset | Indication | Scenario": gaisItems,
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
        updateGeoAssetIndicationScenarioDropdown(dataFrame, selectedValues);
      }

      return updatedItems;
    });
  };

  const handleNewFeature = async () => {
    const selectedCycles = selectedItems["Cycle"];
    const selectedGAIS = selectedItems["Geography | Asset | Indication | Scenario"];
    const selectedGAISParts = selectedGAIS.map((item) => item.split(" | "));

    const filteredDF = dataFrame.filter((row) => {
      const cycleMatch = selectedCycles.includes(row.get("cycle_name"));
      const gaisMatch = selectedGAISParts.some(
        ([geography, asset, indication, scenario]) =>
          row.get("geography") === geography &&
          row.get("asset") === asset &&
          row.get("indication") === indication &&
          row.get("scenario_name") === scenario
      );
      return cycleMatch && gaisMatch;
    });

    await clearReportGenieBackendData();
    setPageValue("LoadingCircle", "", "Updating Data, please wait...");

    const fileNames = filteredDF
      .select("output_id")
      .toArray()
      .map((row) => row[0])
      .filter((id) => id && id.trim() !== "");

    const cycle_names = filteredDF
      .select("cycle_name")
      .toArray()
      .map((row) => row[0])
      .filter((name) => name && name.trim() !== "");

    const scenario_names = filteredDF
      .select("scenario_name")
      .toArray()
      .map((row) => row[0])
      .filter((name) => name && name.trim() !== "");

    const assets = filteredDF
      .select("asset")
      .toArray()
      .map((row) => row[0])
      .filter((name) => name && name.trim() !== "");

    const indications = filteredDF
      .select("indication")
      .toArray()
      .map((row) => row[0])
      .filter((name) => name && name.trim() !== "");

    const s3Url = "https://download-docket.s3.amazonaws.com/RUN COMPUTATION/horizontal_data_dump/";
    const serviceName = "RUN COMPUTATION";

    for (let i = 0; i < fileNames.length; i++) {
      const fileNameWithExtension = `${fileNames[i]}.csv`;
      try {
        const result = await testing.downloadAndInsertDataFromExcel(
          fileNameWithExtension,
          s3Url,
          serviceName,
          cycle_names[i] || "",
          scenario_names[i] || "",
          assets[i] || "",
          indications[i] || ""
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

    setPageValue("ImportReportGenie");
    await excelfucntions.activateSheet("Report Genie");
    await refreshPivotTable("Report Genie", "PivotTable1");
  };

  const handleFilterReport = () => {
    setPageValue("ReportGinnie");
  };

  async function clearReportGenieBackendData() {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem("Report Genie Backend");
        const lastCell = sheet.getUsedRange().getLastCell();
        lastCell.load("address");
        await context.sync();

        const range = sheet.getRange(`A2:${lastCell.address}`);
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
      <Heading>Report Genie</Heading>
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%", gap: "10px" }}>
        <ImportButton onClick={handleNewFeature}>Import Data→</ImportButton>
        <FilterButton onClick={handleFilterReport}>Filter Report</FilterButton>
      </div>
    </Container>
  );
};

export default ImportReport;
