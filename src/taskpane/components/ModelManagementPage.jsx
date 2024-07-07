import React from "react";
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
    marginBottom: "30px",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    gap: "15px",
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
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  freshLabel: {
    color: "#bd302b",
    textAlign: "center",
  },
  loadLabel: {
    color: "#007bff",
    textAlign: "center",
  },
});

const ModelManagementPage1 = () => {
  const classes = useStyles();
  const username = sessionStorage.getItem("username");
  console.log(username);

  const handleCreateNewModel = async () => {
    let servicename = await Excelfunctions.getActiveSheetName();

    if (servicename === "EU_CC_PDL_TV_TEST_AA_2") {
      await AWSConnections.orchestrationfucntion();
      console.log("ACE Genrated");
    } else {
      console.log("Activate MM Sheet");
    }

    // AWSConnections.poll(
    //   "50fe4204-afc1-4fec-bd3c-2e80c550f21e",
    //   "vba-viscadia-2",
    //   "https://vmw4b518he.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/polling_check"
    // );
  };

  const handleLoadExistingModel = async () => {
    try {
      await AWSConnections.downloadAndInsertDataFromExcel(
        "8ab0233d-5c3d-473a-885f-e9fe82990f22",
        "https://download-docket.s3.amazonaws.com/",
        "ACE"
      );
      // await Excel.run(async (context) => {
      //   await Excelfunctions.aceSheetformat(context, "Sheet1");
    } catch (error) {
      console.error("Error loading existing model:", error);
    }
  };

  return (
    <div className={classes.container}>
      <button className={classes.modelManagementButton}>Model Management</button>
      <div className={classes.buttonsContainer}>
        <div className={classes.button} onClick={handleCreateNewModel}>
          <img src="/../assets/create_flow.svg" alt="Fresh Icon" className={classes.icon} />
          <span className={`${classes.label} ${classes.freshLabel}`}>Create New Model</span>
        </div>
        <div className={classes.button} onClick={handleLoadExistingModel}>
          <img src="/../assets/load_flow.svg" alt="Load Icon" className={classes.icon} />
          <span className={`${classes.label} ${classes.loadLabel}`}>Load Existing Model</span>
        </div>
      </div>
    </div>
  );
};

export default ModelManagementPage1;
