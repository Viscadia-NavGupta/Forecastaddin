import React, { useState, useEffect } from "react";
import {
  Container,
  Logo,
  Heading,
  BackButton,
  BackIcon,
  DropdownContainer,
  Dropdown,
  DropdownHeading,
  DropdownHeader,
  Arrow,
  DropdownList,
  DropdownItem,
  ImportButton,
} from "./Loadpagestyles";
import { DataFrame } from "dataframe-js";

const LoadPage = ({ setPageValue }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItems, setSelectedItems] = useState({
    "Email ID": "",
    "Team ID": "",
    Geography: "",
    Indication: "",
    "Sub Indication": "",
    Asset: "",
    "Model Name": "",
  });

  const [dataFrame, setDataFrame] = useState(null);
  const [dropdownItems, setDropdownItems] = useState({
    "Email ID": [],
    "Team ID": [],
    Geography: [],
    Indication: [],
    "Sub Indication": [],
    Asset: [],
    "Model Name": [],
  });

  useEffect(() => {
    fetchDataFromLambda();
  }, []);

  async function fetchDataFromLambda() {
    try {
      const url = "https://k06jq91m02.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/SQLdbQueryTest/user-login";
      const jsonPayload = JSON.stringify({ email_id: "Navendu.gupta@viscadia.com", action: "Fetch Metadata" });

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

      // Populate dropdown items with unique values
      setDropdownItems({
        "Email ID": df.distinct("email_id").toArray().map(row => row[0]),
        "Team ID": df.distinct("team_name").toArray().map(row => row[0]),
        Geography: df.distinct("geography").toArray().map(row => row[0]),
        Indication: df.distinct("indication").toArray().map(row => row[0]),
        "Sub Indication": df.distinct("sub_indication").toArray().map(row => row[0]),
        Asset: df.distinct("asset").toArray().map(row => row[0]),
        "Model Name": df.distinct("model_name").toArray().map(row => row[0]),
      });

      alert("Data fetched and dropdowns populated successfully!");
    } catch (error) {
      alert("Error fetching data from Lambda: " + error.message);
    }
  }

  const handleDropdownClick = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleItemClick = (dropdown, item) => {
    const updatedSelectedItems = { ...selectedItems, [dropdown]: item };
    setSelectedItems(updatedSelectedItems);
    setOpenDropdown(null);

    filterDropdownItems(updatedSelectedItems);
  };

  const filterDropdownItems = (selectedItems) => {
    let filteredDF = dataFrame;

    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[key]) {
        const columnName = key.toLowerCase().replace(" ", "_");
        filteredDF = filteredDF.filter(row => row.get(columnName) === selectedItems[key]);
      }
    });

    setDropdownItems({
      "Email ID": filteredDF.distinct("email_id").toArray().map(row => row[0]),
      "Team ID": filteredDF.distinct("team_name").toArray().map(row => row[0]),
      Geography: filteredDF.distinct("geography").toArray().map(row => row[0]),
      Indication: filteredDF.distinct("indication").toArray().map(row => row[0]),
      "Sub Indication": filteredDF.distinct("sub_indication").toArray().map(row => row[0]),
      Asset: filteredDF.distinct("asset").toArray().map(row => row[0]),
      "Model Name": filteredDF.distinct("model_name").toArray().map(row => row[0]),
    });
  };

  return (
    <Container>
      <Heading>Load Scenario</Heading>
      <DropdownContainer>
        {["Email ID", "Team ID", "Geography", "Indication", "Sub Indication", "Asset", "Model Name"].map(
          (label, index) => (
            <Dropdown key={index}>
              <DropdownHeading>{label}</DropdownHeading>
              <DropdownHeader onClick={() => handleDropdownClick(label)}>
                {selectedItems[label] || label}
                <Arrow>{openDropdown === label ? "▲" : "▼"}</Arrow>
              </DropdownHeader>
              {openDropdown === label && (
                <DropdownList>
                  {dropdownItems[label].map((item, idx) => (
                    <DropdownItem key={idx} onClick={() => handleItemClick(label, item)}>
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </Dropdown>
          )
        )}
      </DropdownContainer>
      <ImportButton onClick={() => fetchDataFromLambda()}>Import →</ImportButton>
    </Container>
  );
};

export default LoadPage;
