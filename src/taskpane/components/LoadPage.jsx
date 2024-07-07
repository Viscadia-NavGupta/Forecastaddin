import React, { useState, useEffect } from "react";
import { useStyles4 } from "./Loadpagestyles";
import { DataFrame } from "dataframe-js";

const LoadPage = ({ setPageValue }) => {
  const styles = useStyles4();

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
    <div className={styles.container}>
      <h2 className={styles.heading}>Load Scenario</h2>
      <div className={styles.dropdownContainer}>
        {["Email ID", "Team Name", "Geography", "Indication", "Sub Indication", "Asset", "Model Name"].map(
          (label, index) => (
            <div key={index} className={styles.dropdown}>
              <div className={styles.dropdownHeading}>{label}</div>
              <div className={styles.dropdownHeader} onClick={() => handleDropdownClick(label)}>
                {selectedItems[label] || label}
                <span className={styles.arrow}>{openDropdown === label ? "▲" : "▼"}</span>
              </div>
              {openDropdown === label && (
                <div className={styles.dropdownList}>
                  {dropdownItems[label].map((item, idx) => (
                    <div key={idx} className={styles.dropdownItem} onClick={() => handleItemClick(label, item)}>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
      <button className={styles.importButton} onClick={() => fetchDataFromLambda()}>
        Import →
      </button>
    </div>
  );
};

export default LoadPage;
