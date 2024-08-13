import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import {
  Container,
  Heading,
  DropdownContainer,
  ImportButton,
} from "./LoadAssumptionsStyles";
import { DataFrame } from "dataframe-js";
import * as AWSConnections from "../AWS Midleware/AWSConnections";

const LoadAssumptions = ({ setPageValue }) => {
  const [cycleOptions, setCycleOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [scenarioOptions, setScenarioOptions] = useState([]);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const storedUsername = useMemo(() => sessionStorage.getItem("username"), []);
  const [dataFrame, setDataFrame] = useState(null); // Declare dataFrame state

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

      const cycleOptions = df.distinct('cycle_name').toArray().map(row => ({ value: row[0], label: row[0] }));
      setCycleOptions(cycleOptions);

      setDataFrame(df); // Set dataFrame state
    } catch (error) {
      alert("Error fetching data from Lambda: " + error.message);
    }
  };

  const handleCycleChange = (selected) => {
    setSelectedCycles(selected);
    filterDropdownItems(selected.map(item => item.value));
  };

  const filterDropdownItems = (selectedCycles) => {
    let filteredDF = dataFrame;
    if (selectedCycles.length > 0) {
      filteredDF = filteredDF.filter(row => selectedCycles.includes(row.get('cycle_name')));
    }

    const assetOptions = filteredDF.distinct('asset').toArray().map(row => ({ value: row[0], label: row[0] }));
    const scenarioOptions = filteredDF.distinct('scenario_name').toArray().map(row => ({ value: row[0], label: row[0] }));

    setAssetOptions(assetOptions);
    setScenarioOptions(scenarioOptions);
  };

  const handleImportClick = () => {
    console.log("Selected Cycles:", selectedCycles);
    console.log("Selected Assets:", selectedAssets);
    console.log("Selected Scenarios:", selectedScenarios);
  };

  return (
    <Container>
      <Heading>Load Assumptions</Heading>
      <DropdownContainer>
        <Select
          options={cycleOptions}
          isMulti
          placeholder="Select Cycle"
          onChange={handleCycleChange}
        />
        <Select
          options={assetOptions}
          isMulti
          placeholder="Select Asset"
          onChange={setSelectedAssets}
        />
        <Select
          options={scenarioOptions}
          isMulti
          placeholder="Select Scenario"
          onChange={setSelectedScenarios}
        />
      </DropdownContainer>
      <ImportButton onClick={handleImportClick}>Import Data →</ImportButton>
    </Container>
  );
};

export default LoadAssumptions;
