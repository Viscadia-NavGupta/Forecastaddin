// ScenarioManagement.jsx
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modelManagementButton: {
    backgroundColor: "#00a19B",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "0px",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gap: "20px", // Adjust the gap as needed
    justifyItems: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "100px",
    backgroundColor: "#ededed",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    width: "40px",
    height: "40px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  messageBox: {
    marginTop: "10px",
    marginBottom:"10px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontSize: "14px",
    textAlign: "center",
    width: "80%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

const ScenarioManagement = ({ setPageValue }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("Message: Please select any button");

  const RunScenario = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename !== "Model Management" && servicename !== "outputs") {
      setPageValue("LoadingCircle");
      const result = await AWSConnections.orchestrationfucntion("RUN COMPUTATION");
      console.log("Outputs fetched");
      await setMessage("Scenario run successfully."); 
      setPageValue("Scenario management");
      // Update the message here
    } else {
      console.log("Active ACE sheet");
      await setMessage("Active ACE sheet not detected."); // Update the message here
    }
  };

  const menuItems = [
    { icon: "/../assets/create_flow.svg", text: "Run Scenario", action: () => RunScenario() },
    { icon: "/../assets/create_flow.svg", text: "Save Scenario", action: () => console.log("Button 1 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Lock Scenario", action: () => console.log("Button 2 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Load Assumptions", action: () => console.log("Button 3 clicked") },
    { icon: "/../assets/create_flow.svg", text: "Load Scenario", action: () => console.log("Button 4 clicked") },
    { icon: "/../assets/create_flow.svg", text: "View Outputs", action: () => console.log("Button 5 clicked") },
  ];

  return (
    <div className={classes.container}>
      <button className={classes.modelManagementButton}>Scenario Management</button>
      {message && <div className={classes.messageBox}>{message}</div>}
      <div className={classes.buttonsContainer}>
        {menuItems.map((item, index) => (
          <div key={index} className={classes.button} onClick={item.action}>
            <img src={item.icon} alt={`Icon ${index + 1}`} className={classes.icon} />
            <span className={classes.label}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioManagement;
