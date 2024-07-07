import React from "react";
import { makeStyles } from "@mui/styles";
import * as AWSConnections from "./AWS Midleware/AWSConnections";
import * as Excelfunctions from "./ExcelMidleware/excelFucntions";

// Replace these imports with the actual paths to your icons
// import Icon1 from "/../assets/create_flow.svg";
// import Icon2 from "/path/to/icon2.svg";
// ... up to Icon10

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
  modelManagementButton: {
    backgroundColor: "#00a19B",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "30px",
    // cursor: "pointer",
  },
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gap: "25px", // Adjust the gap as needed
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
});

const MMSheetManagment = ({setPageValue}) => {
  const classes = useStyles();

  const handleCreateNewModel = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename === "Model Management") {
      setPageValue("LoadingCircle")
      await AWSConnections.orchestrationfucntion("GENERATE ACE SHEET");
      console.log("ACE Genrated");
      setPageValue("Model Editor")
    } else {
      console.log("Activate MM Sheet");
    }
  };

  const menuItems = [
    { icon: "/../assets/Createmodel.svg", text: "Create Model", action: () => handleCreateNewModel() },
    { icon: "/../assets/AddAssumptions.svg", text: "Add Assumption", action: () => MMfunctions.addAssumption() },
    {
      icon: "/../assets/deleteAssumption.svg",
      text: "Delete Assumption",
      action: () => MMfunctions.deleteAssumption(),
    },
    { icon: "/../assets/addflow.svg", text: "Add Flow", action: () => console.log("Button 3 clicked") },
    { icon: "/../assets/deleteflow.svg", text: "Delete Flow", action: () => console.log("Button 4 clicked") },
    { icon: "/../assets/adddimension.svg", text: "Add Dimension", action: () => MMfunctions.addDimension1() },
    { icon: "/../assets/deletedimension.svg", text: "Delete Dimension", action: () => MMfunctions.deletediemnsions() },
    { icon: "/../assets/create_flow.svg", text: "Add SKU", action: () => MMfunctions.addSku() },
    { icon: "/../assets/create_flow.svg", text: "Delete SKU", action: () => MMfunctions.DeleteSku() },
    { icon: "/../assets/create_flow.svg", text: "Add Product", action: () => MMfunctions.addProduct() },
    { icon: "/../assets/create_flow.svg", text: "Delete Product", action: () => MMfunctions.deleteProduct() },
  ];

  return (
    <div className={classes.container}>
      <button className={classes.modelManagementButton}>Model Editor</button>
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

export default MMSheetManagment;
