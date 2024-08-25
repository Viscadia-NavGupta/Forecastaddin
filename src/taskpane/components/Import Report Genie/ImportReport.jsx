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
} from "./ImportReportStyles";
import { DataFrame } from "dataframe-js";
import * as testing from "../AWS Midleware/AssumptionsCatelougeAWS"; // Ensure this import is correct

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
      updateDropdowns(df);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateDropdowns = (df) => {
    const lockedDF = df.filter(row => row.get("save_status") === "Locked");

    const cycleItems = lockedDF.distinct("cycle_name")
      .toArray()
      .map(row => row[0])
      .filter(value => value && value.trim() !== "");

    const assetItems = lockedDF.select("asset", "indication", "scenario_name").dropDuplicates()
      .toCollection()
      .map(row => {
        const parts = [row.asset, row.indication, row.scenario_name].filter(part => part && part.trim() !== "");
        return parts.join(" | ");
      }).filter(value => value !== "");

    setDropdownItems({ Cycle: cycleItems, "Asset | Indication | Scenario": assetItems });
  };

  const handleDropdownChange = (event, label) => {
    const selectedValues = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
    setSelectedItems(prevState => ({ ...prevState, [label]: selectedValues }));
  };

  const handleNewFeature = async () => {
    // Filter the DataFrame based on the selected filters
    const selectedCycles = selectedItems["Cycle"];
    const filteredDF = dataFrame.filter((row) => selectedCycles.includes(row.get("cycle_name")));

    // Extract the fileNames, cycle_name, and Scenario_Name from the filtered DataFrame
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

    console.log("Filtered fileNames:", fileNames);
    console.log("Cycle Names:", cycle_names);
    console.log("Scenario Names:", scenario_names);

    const s3Url = "https://download-docket.s3.amazonaws.com/RUN COMPUTATION/horizontal_data_dump/";
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
  };

  return (
    <Container>
      <Heading>Assumptions Catalogue</Heading>
      <DropdownContainer>
        {["Cycle", "Asset | Indication | Scenario"].map(label => (
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
                    overflowX: 'hidden',
                  }
                }
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
