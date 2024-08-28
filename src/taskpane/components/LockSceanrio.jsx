// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Container,
//   Heading,
//   DropdownContainer,
//   Dropdown,
//   DropdownHeading,
//   DropdownHeader,
//   Arrow,
//   DropdownList,
//   DropdownItem,
//   ImportButton,
// } from "./LockScenariostyles";
// import { DataFrame } from "dataframe-js";
// import * as AWSConnections from "./AWS Midleware/AWSConnections";

// const dropdownToColumnMap = {
//   Geography: "geography",
//   Indication: "indication",
//   "Team ID": "team_name",
//   "Sub Indication": "sub_indication",
//   Asset: "asset",
//   "Model Name": "model_name",
//   Scenario: "scenario_name",
//   Cycle: "cycle_name",
// };

// const initialSelectedItems = Object.keys(dropdownToColumnMap).reduce((acc, key) => {
//   acc[key] = "Select";
//   return acc;
// }, {});

// const initialDropdownItems = Object.keys(dropdownToColumnMap).reduce((acc, key) => {
//   acc[key] = [];
//   return acc;
// }, {});

// const Lockscenario = ({ setPageValue }) => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
//   const storedUsername = useMemo(() => sessionStorage.getItem("username"), []);
//   const [dataFrame, setDataFrame] = useState(null);
//   const [dropdownItems, setDropdownItems] = useState(initialDropdownItems);

//   useEffect(() => {
//     fetchDataFromLambda();
//   }, []);

//   const fetchDataFromLambda = async () => {
//     try {
//       const url = "https://k06jq91m02.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/SQLdbQueryTest/user-login";
//       const jsonPayload = JSON.stringify({ email_id: storedUsername, action: "Fetch Metadata" });

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: jsonPayload,
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }

//       const responseBody = await response.json();
//       const combinedResults = [...responseBody.results1, ...responseBody.results2];

//       const df = new DataFrame(combinedResults);
//       setDataFrame(df);

//       const updatedDropdownItems = Object.keys(dropdownToColumnMap).reduce((acc, label) => {
//         const column = dropdownToColumnMap[label];
//         acc[label] = [
//           "Select",
//           ...df.distinct(column).toArray().map((row) => row[0]),
//         ];
//         return acc;
//       }, {});

//       setDropdownItems(updatedDropdownItems);

//       alert("Data fetched and dropdowns populated successfully!");
//     } catch (error) {
//       alert("Error fetching data from Lambda: " + error.message);
//     }
//   };

//   const handleDropdownClick = (dropdown) => {
//     setOpenDropdown(openDropdown === dropdown ? null : dropdown);
//   };

//   const handleItemClick = (dropdown, item) => {
//     const updatedSelectedItems = { ...selectedItems, [dropdown]: item };
//     setSelectedItems(updatedSelectedItems);
//     setOpenDropdown(null);

//     filterDropdownItems(updatedSelectedItems);
//   };

//   const filterDropdownItems = (selectedItems) => {
//     let filteredDF = dataFrame;

//     Object.keys(selectedItems).forEach((dropdown) => {
//       const value = selectedItems[dropdown];
//       if (value && value !== "Select") {
//         const columnName = dropdownToColumnMap[dropdown];
//         filteredDF = filteredDF.filter((row) => row.get(columnName) === value);
//       }
//     });

//     const updatedDropdownItems = Object.keys(dropdownToColumnMap).reduce((acc, label) => {
//       const column = dropdownToColumnMap[label];
//       const items = filteredDF
//         .distinct(column)
//         .toArray()
//         .map((row) => row[0]);
//       acc[label] = ["Select", ...items];
//       return acc;
//     }, {});

//     setDropdownItems(updatedDropdownItems);
//   };

//   const handleImportACESheetClick = () => {
//     let filteredDF = dataFrame;

//     Object.keys(selectedItems).forEach((dropdown) => {
//       const value = selectedItems[dropdown];
//       if (value && value !== "Select") {
//         const columnName = dropdownToColumnMap[dropdown];
//         filteredDF = filteredDF.filter((row) => row.get(columnName) === value);
//       }
//     });

//     const modelMappingIds = filteredDF.toCollection().map((row) => row.model_mapping_id);

//     const result = { model_mapping_id: modelMappingIds };
//     console.log(result);
//     AWSConnections.downloadAndInsertDataFromExcel(
//       result.model_mapping_id + ".csv",
//       "https://download-docket.s3.amazonaws.com/",
//       "GENERATE ACE SHEET"
//     );
//   };

//   const handleImportOutputsClick = () => {
//     let filteredDF = dataFrame;

//     Object.keys(selectedItems).forEach((dropdown) => {
//       const value = selectedItems[dropdown];
//       if (value && value !== "Select") {
//         const columnName = dropdownToColumnMap[dropdown];
//         filteredDF = filteredDF.filter((row) => row.get(columnName) === value);
//       }
//     });

//     const outputIds = filteredDF.toCollection().map((row) => row.output_id);

//     const result = { output_id: outputIds };
//     console.log(result);
//     AWSConnections.downloadAndInsertDataFromExcel(
//       result.output_id,
//       "https://download-docket.s3.amazonaws.com/",
//       "RUN COMPUTATION"
//     );
//   };

//   return (
//     <Container>
//       <Heading>Lock Scenario</Heading>
//       <DropdownContainer>
//         {Object.keys(dropdownToColumnMap).map((label, index) => (
//           <Dropdown key={index}>
//             <DropdownHeading>{label}</DropdownHeading>
//             <DropdownHeader onClick={() => handleDropdownClick(label)}>
//               {selectedItems[label] !== "Select" ? selectedItems[label] : label}
//               <Arrow>{openDropdown === label ? "▲" : "▼"}</Arrow>
//             </DropdownHeader>
//             {openDropdown === label && (
//               <DropdownList>
//                 {dropdownItems[label].map((item, idx) => (
//                   <DropdownItem key={idx} onClick={() => handleItemClick(label, item)}>
//                     {item}
//                   </DropdownItem>
//                 ))}
//               </DropdownList>
//             )}
//           </Dropdown>
//         ))}
//       </DropdownContainer>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', width: '100%' }}>
//         <ImportButton onClick={handleImportACESheetClick}>Lock Scenario →</ImportButton>
//         <ImportButton onClick={handleImportOutputsClick}>Un-Lock Scenario →</ImportButton>
//       </div>
//     </Container>
//   );
// };

// export default Lockscenario;
