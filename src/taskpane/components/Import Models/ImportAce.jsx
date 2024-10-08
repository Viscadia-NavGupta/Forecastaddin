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
} from "./Loadpagestyles";
import { DataFrame } from "dataframe-js";
import * as AWSConnections from "../AWS Midleware/AWSConnections";
import * as excelfunctions from "../ExcelMidleware/excelFucntions";

const dropdownToColumnMap = {
  Cycle: "cycle_name",
  Asset: "asset",
  Indication: "indication",
  "Sub Indication": "sub_indication",
  "Model Name": "model_name",
  Scenario: "scenario_name",
};

const initialSelectedItems = Object.keys(dropdownToColumnMap).reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {});

const ImportACE = ({ setPageValue }) => {
  const [dropdownItems, setDropdownItems] = useState({});
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
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

      const updatedDropdownItems = Object.keys(dropdownToColumnMap).reduce((acc, label) => {
        const column = dropdownToColumnMap[label];
        const items = df
          .distinct(column)
          .toArray()
          .map((row) => row[0])
          .filter((value) => {
            const isValid = value !== null && value !== undefined && value.trim() !== "";
            if (!isValid) console.log(`Filtered out: ${value}`);
            return isValid;
          });

        console.log(`Dropdown values for ${label}:`, items);
        acc[label] = items;
        return acc;
      }, {});

      setDropdownItems(updatedDropdownItems);

      alert("Data fetched and dropdowns populated successfully!");
    } catch (error) {
      alert("Error fetching data from Lambda: " + error.message);
    }
  };

  const handleMultiSelectChange = (event, label) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;

    setSelectedItems((prevState) => ({
      ...prevState,
      [label]: selectedValues,
    }));

    filterDropdownItems(selectedValues, label);
  };

  const filterDropdownItems = (selectedValues, label) => {
    let filteredDF = dataFrame;

    if (selectedValues.length > 0) {
      const columnName = dropdownToColumnMap[label];
      filteredDF = filteredDF.filter((row) => selectedValues.includes(row.get(columnName)));
    }

    const updatedDropdownItems = Object.keys(dropdownToColumnMap).reduce((acc, key) => {
      const column = dropdownToColumnMap[key];
      const items = filteredDF
        .distinct(column)
        .toArray()
        .map((row) => row[0])
        .filter((value) => {
          const isValid = value !== null && value !== undefined && value.trim() !== "";
          if (!isValid) console.log(`Filtered out: ${value}`);
          return isValid;
        });

      console.log(`Filtered Dropdown values for ${key}:`, items);
      acc[key] = items;
      return acc;
    }, {});

    setDropdownItems(updatedDropdownItems);
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
    setPageValue("LoadingCircle", "", "Loading ACE, please wait...");
    console.log(result);
    let resultseetname = await AWSConnections.downloadAndInsertDataFromExcelxlsx(
      result.output_id[0] + ".xlsx",
      "https://upload-docket.s3.amazonaws.com/",
      "Import GENERATE ACE SHEET"
    );
    let updatedsheetnameACE = await AWSConnections.modifySheet(resultseetname.newSheetName);
    console.log(updatedsheetnameACE);
    await excelfunctions.aceSheetformat(updatedsheetnameACE);
    await excelfunctions.activateSheet(updatedsheetnameACE);
    setPageValue("DynamicButtonComponent");
  };

  return (
    <Container>
      <Heading>Load Forecast</Heading>
      <DropdownContainer>
        {["Cycle", "Asset", "Indication", "Sub Indication", "Model Name", "Scenario"].map((label, index) => (
          <StyledFormControl key={index}>
            <StyledInputLabel id={`multiple-checkbox-label-${index}`}>{label}</StyledInputLabel>
            <StyledSelect
              labelId={`multiple-checkbox-label-${index}`}
              id={`multiple-checkbox-${index}`}
              multiple
              value={selectedItems[label] || []}
              onChange={(event) => handleMultiSelectChange(event, label)}
              input={<StyledOutlinedInput label={label} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {dropdownItems[label]?.map((item) => (
                <StyledMenuItem key={item} value={item}>
                  <StyledCheckbox checked={selectedItems[label]?.indexOf(item) > -1} />
                  <StyledListItemText primary={item} />
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        ))}
      </DropdownContainer>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <ImportButton onClick={handleImportACESheetClick}>Import ACE</ImportButton>
      </div>
    </Container>
  );
};

export default ImportACE;
