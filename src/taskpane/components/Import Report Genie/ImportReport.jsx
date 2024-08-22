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
  MenuProps,
} from "./ImportReportStyles";
import { DataFrame } from "dataframe-js";
import * as AWSConnections from "../AWS Midleware/AWSConnections";
import * as excelfunctions from "../ExcelMidleware/excelFucntions";

const dropdownToColumnMap = {
  Cycle: "cycle_name",
  "Asset | Indication | Scenario": ["asset", "indication", "scenario_name"],
};

const ImportReportGenie = ({ setPageValue }) => {
  const [dropdownItems, setDropdownItems] = useState({});
  const [selectedItems, setSelectedItems] = useState({ Cycle: [], "Asset | Indication | Scenario": [] });
  const storedUsername = useMemo(() => sessionStorage.getItem("username"), []);
  const [dataFrame, setDataFrame] = useState(null);

  useEffect(() => {
    fetchDataFromLambda();
  }, []);

  const fetchDataFromLambda = async () => {
    try {
      const url = "https://k06jq91m02.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/SQLdbQueryTest/user-login";
      const jsonPayload = JSON.stringify({ email_id: storedUsername, action: "Fetch Metadata" });

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonPayload,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseBody = await response.json();
      const combinedResults = [...responseBody.results1, ...responseBody.results2];

      const df = new DataFrame(combinedResults);
      setDataFrame(df);

      // Populate the cycle dropdown initially
      const cycleItems = df.distinct("cycle_name")
        .toArray()
        .map(row => row[0])
        .filter(value => value && value.trim() !== "");

      setDropdownItems(prevItems => ({ ...prevItems, Cycle: cycleItems }));
    } catch (error) {
      alert("Error fetching data from Lambda: " + error.message);
    }
  };

  const handleCycleChange = (event) => {
    const selectedCycle = event.target.value;
    setSelectedItems(prevItems => ({ ...prevItems, Cycle: [selectedCycle] }));

    // Filter the DataFrame based on the selected cycle
    const filteredDF = dataFrame.filter(row => row.get("cycle_name") === selectedCycle);

    // Combine Asset | Indication | Scenario values
    const combinedItems = filteredDF.toCollection().map(row => {
      const asset = row.asset || "";
      const indication = row.indication || "";
      const scenario = row.scenario_name || "";
      return `${asset} | ${indication} | ${scenario}`.trim();
    }).filter(value => value && value !== " |  | "); // Ensure no empty strings are added

    // Update the dropdown items
    setDropdownItems(prevItems => ({ ...prevItems, "Asset | Indication | Scenario": combinedItems }));
  };

  const handleMultiSelectChange = (event, label) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(prevState => ({
      ...prevState,
      [label]: Array.isArray(value) ? value : [value],
    }));
  };

  const handleImportACESheetClick = async () => {
    let filteredDF = dataFrame;

    Object.keys(selectedItems).forEach((dropdown) => {
      const value = selectedItems[dropdown];
      if (value.length > 0) {
        const columnName = dropdownToColumnMap[dropdown];
        filteredDF = filteredDF.filter((row) => value.includes(row.get(columnName)));
      }
    });

    const modelMappingIds = filteredDF.toCollection().map((row) => row.output_id);

    const result = { output_id: modelMappingIds };
    console.log(result);
    let resultseetname = await AWSConnections.downloadAndInsertDataFromExcelxlsx(
      result.output_id[0] + ".xlsx",
      "https://upload-docket.s3.amazonaws.com/",
      "Import GENERATE ACE SHEET"
    );
    let updatedsheetnameACE = await AWSConnections.modifySheet(resultseetname.newSheetName);
    console.log(updatedsheetnameACE);
    await excelfunctions.aceSheetformat(updatedsheetnameACE);
  };

  return (
    <Container>
      <Heading>Report Genie</Heading>
      <DropdownContainer>
        <StyledFormControl>
          <StyledInputLabel>Cycle</StyledInputLabel>
          <StyledSelect
            value={selectedItems.Cycle}
            onChange={handleCycleChange}
            input={<StyledOutlinedInput label="Cycle" />}
            renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : selected}
            MenuProps={MenuProps}
          >
            {dropdownItems.Cycle?.map((item, index) => (
              <StyledMenuItem key={index} value={item}>
                <StyledCheckbox checked={selectedItems.Cycle.indexOf(item) > -1} />
                <StyledListItemText primary={item} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>

        <StyledFormControl>
          <StyledInputLabel>Asset | Indication | Scenario</StyledInputLabel>
          <StyledSelect
            value={selectedItems["Asset | Indication | Scenario"]}
            onChange={(event) => handleMultiSelectChange(event, "Asset | Indication | Scenario")}
            input={<StyledOutlinedInput label="Asset | Indication | Scenario" />}
            renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : selected}
            MenuProps={MenuProps}
          >
            {dropdownItems["Asset | Indication | Scenario"]?.map((item, index) => (
              <StyledMenuItem key={index} value={item}>
                <StyledCheckbox checked={selectedItems["Asset | Indication | Scenario"].indexOf(item) > -1} />
                <StyledListItemText primary={item} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
      </DropdownContainer>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", width: "100%" }}>
        <ImportButton onClick={handleImportACESheetClick}>Import Outputs→</ImportButton>
        <ImportButton onClick={handleImportACESheetClick}>Filter Report→</ImportButton>
      </div>
    </Container>
  );
};

export default ImportReportGenie;
