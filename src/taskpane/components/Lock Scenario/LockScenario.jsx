import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Heading,
  DropdownContainer,
  ImportButton,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledOutlinedInput,
  StyledMenuItem,
} from "./LockScenarioStyles";
import { DataFrame } from "dataframe-js";
import * as awsconnection from "../AWS Midleware/AWSConnections"; // Import the necessary AWS connection functions
import ListItemText from '@mui/material/ListItemText'; // Import ListItemText from Material-UI

const LockScenario = ({ setPageValue }) => {
  const [dropdownItems, setDropdownItems] = useState({ Cycle: [], "Asset | Indication | Scenario": [] });
  const [selectedItems, setSelectedItems] = useState({ Cycle: "", "Asset | Indication | Scenario": "" });
  const [dataFrame, setDataFrame] = useState(new DataFrame([])); // Initialize with an empty DataFrame
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
      console.log("Data fetched:", responseBody.results1); // Log fetched data

      const df = new DataFrame(responseBody.results1);
      console.log("DataFrame loaded:", df.show(5)); // Show first 5 rows to verify

      setDataFrame(df);

      updateDropdowns(df); // Initial dropdown update
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateDropdowns = (df) => {
    const cycleItems = df.distinct("cycle_name")
      .toArray()
      .map(row => row[0])
      .filter(value => value && value.trim() !== "");

    console.log("Cycle Items:", cycleItems); // Log cycle items to verify

    setDropdownItems(prevItems => ({ ...prevItems, Cycle: cycleItems }));
  };

  const handleDropdownChange = (event, label) => {
    const selectedValue = event.target.value;
    setSelectedItems(prevState => ({ ...prevState, [label]: selectedValue }));

    if (label === "Cycle") {
      const filteredDF = dataFrame
        .filter(row => selectedValue.includes(row.get("cycle_name")))
        .filter(row => row.get("save_status") === "Interim");  // Filter where "save_status" is "Interim"

      console.log("Filtered DataFrame for Cycles and Interim save_status:", filteredDF.show(5)); // Show filtered DataFrame

      const assetItems = filteredDF.select("asset", "indication", "scenario_name").dropDuplicates()
        .toCollection()
        .map(row => {
          const parts = [row.asset, row.indication, row.scenario_name].filter(part => part && part.trim() !== "");
          return parts.join(" | ");
        }).filter(value => value !== "");

      console.log("Asset | Indication | Scenario Items:", assetItems); // Log asset items to verify

      setDropdownItems(prevItems => ({ ...prevItems, "Asset | Indication | Scenario": assetItems }));
    }
  };

  const handleNewFeature = async () => {
    // Filter the DataFrame based on the selected filters
    const selectedCycle = selectedItems["Cycle"];
    const scenarioSelection = selectedItems["Asset | Indication | Scenario"];

    // Split the scenario selection into individual components
    const [selectedAsset, selectedIndication, selectedScenarioName] = scenarioSelection.split(" | ");

    const filteredDF = dataFrame
      .filter(row => selectedCycle.includes(row.get("cycle_name")))
      .filter(row => row.get("asset") === selectedAsset)
      .filter(row => row.get("indication") === selectedIndication)
      .filter(row => row.get("scenario_name") === selectedScenarioName);

    // Convert the filtered DataFrame to an array
    const filteredArray = filteredDF.toCollection();
    console.log("Filtered Array:", filteredArray); // Log the filtered array

    // Extract the desired columns from the filtered data
    const modelIds = filteredArray.map(row => row.model_id);
    const outputIds = filteredArray.map(row => row.output_id);
    const cycleNames = filteredArray.map(row => row.cycle_name);
    const ScenarioName = filteredArray.map(row => row.scenario_name);

    console.log("Model IDs:", modelIds);
    console.log("Output IDs:", outputIds);
    console.log("Cycle Names:", cycleNames);

    // Example: Use the first value from each column (assuming single selection)
    const selectedModelId = modelIds[0];
    const selectedOutputId = outputIds[0];
    const selectedCycleName = cycleNames[0];
    const selectedScenarioName1 = ScenarioName[0];

    console.log("Selected Model ID:", selectedModelId);
    console.log("Selected Output ID:", selectedOutputId);
    console.log("Selected Cycle Name:", selectedCycleName);

    setPageValue("LoadingCircle");

    const cellA2Value = "SomeValueForCellA2";  // Replace with actual value or logic to get this
    const cellB2Value = "SomeValueForCellB2";  // Replace with actual value or logic to get this

    const result = { cycle_name: selectedCycleName, scenario_name: selectedScenarioName };
    console.log(result);
    console.log(cellA2Value);
    console.log(cellB2Value);

    setPageValue("LoadingCircle", "", "Locking Forecast, please wait...");

    let saveflag = await awsconnection.orchestrationfucntion(
      "LOCK FORECAST",
      "",
      "",
      selectedOutputId,
      selectedScenarioName1,
      selectedCycleName,
      selectedModelId
    );

    if (saveflag.result === true) {
      console.log("Forecast Saved");
      setPageValue("Lockedforecast");
    }
  };

  return (
    <Container>
      <Heading>Lock Forecast</Heading>
      <DropdownContainer>
        {["Cycle", "Asset | Indication | Scenario"].map(label => (
          <StyledFormControl key={label}>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledSelect
              value={selectedItems[label]}
              onChange={(event) => handleDropdownChange(event, label)}
              input={<StyledOutlinedInput label={label} />}
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
                  <ListItemText primary={item} />
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        ))}
      </DropdownContainer>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <ImportButton onClick={handleNewFeature}>Lock Forecast→</ImportButton>
      </div>
    </Container>
  );
};

export default LockScenario;
