import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Heading,
  MessageBox,
  DropdownContainer,
  ComboBoxContainer,
  ComboBoxInput,
  ComboBoxList,
  ComboBoxItem,
  Input,
  SaveButton,
} from "./savescenariostyles";
import { DataFrame } from "dataframe-js";
import * as awsconnection from "./AWS Midleware/AWSConnections";

const Savesscenario = ({ setPageValue }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [scenarioName, setScenarioName] = useState("");
  const [heading, setHeading] = useState("Active Sheet Name");
  const [isOutputSheet, setIsOutputSheet] = useState(false);
  const storedUsername = useMemo(() => sessionStorage.getItem("username"), []);
  const [dataFrame, setDataFrame] = useState(null);
  const [cycleItems, setCycleItems] = useState([]);
  const [cellA2Value, setCellA2Value] = useState("");
  const [cellB2Value, setCellB2Value] = useState("");

  useEffect(() => {
    setActiveSheetName();
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
      const results = responseBody.results2;

      const df = new DataFrame(results);
      setDataFrame(df);

      const items = df
        .distinct("cycle_name")
        .toArray()
        .map((row) => row[0]);
      setCycleItems(items);

      alert("Data fetched and dropdown populated successfully!");
    } catch (error) {
      alert("Error fetching data from Lambda: " + error.message);
    }
  };

  const setActiveSheetName = async () => {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        sheet.load("name");
        await context.sync();

        if (sheet.name.toLowerCase() === "outputs") {
          const cellA2 = sheet.getRange("A2");
          const cellB2 = sheet.getRange("B2");
          cellA2.load("values");
          cellB2.load("values");
          await context.sync();

          const cellA2Value = cellA2.values[0][0];
          const cellB2Value = cellB2.values[0][0];
          setCellA2Value(cellA2Value);
          setCellB2Value(cellB2Value);

          setHeading(`Save Scenario for: ${cellA2Value}`);
          setIsOutputSheet(true);
        } else {
          setHeading(sheet.name);
          setIsOutputSheet(false);
        }
      });
    } catch (error) {
      console.error("Error fetching active sheet name or cell B2 value: ", error);
    }
  };

  const handleDropdownClick = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedCycle(item);
    setOpenDropdown(false);
  };

  const handleCycleChange = (e) => {
    setSelectedCycle(e.target.value);
    setOpenDropdown(false);
  };

  const handleScenarioChange = (e) => {
    setScenarioName(e.target.value);
  };

  const handleSaveClick = async () => {
    setPageValue("LoadingCircle");
    const result = { cycle_name: selectedCycle, scenario_name: scenarioName };
    console.log(result);
    console.log(cellA2Value);
    console.log(cellB2Value);
    let saveflag = await awsconnection.orchestrationfucntion(
      "SAVE FORECAST",
      "",
      "",
      cellB2Value,
      result.scenario_name,
      result.cycle_name,
      cellA2Value
    );
    if (saveflag.result === true) {
      console.log("Forcast Saved");
      setPageValue("SaveForecastPage");
    }
  };

  return (
    <Container>
      {isOutputSheet ? (
        <>
          <Heading>{heading}</Heading>
          <DropdownContainer>
            <ComboBoxContainer>
              <ComboBoxInput
                type="text"
                placeholder="Select or Enter Cycle"
                value={selectedCycle}
                onClick={handleDropdownClick}
                onChange={handleCycleChange}
              />
              {openDropdown && (
                <ComboBoxList>
                  {cycleItems.map((item, idx) => (
                    <ComboBoxItem key={idx} onClick={() => handleItemClick(item)}>
                      {item}
                    </ComboBoxItem>
                  ))}
                </ComboBoxList>
              )}
            </ComboBoxContainer>
            <Input type="text" placeholder="Enter Scenario Name" value={scenarioName} onChange={handleScenarioChange} />
          </DropdownContainer>
          <SaveButton onClick={handleSaveClick}>Save</SaveButton>
        </>
      ) : (
        <MessageBox>Please select the "Outputs" sheet to proceed.</MessageBox>
      )}
    </Container>
  );
};

export default Savesscenario;
