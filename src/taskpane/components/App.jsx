import React, { useState, useEffect } from "react";
import UserLogin from "./userlogin/UserLogin";
import ModelManagementPage1 from "./Model Managment/Model Desinger";
import ImportACE from "./Import Models/ImportAce";
import UserRegistrationForm from "./Userregistration/UserRegistrationform";
import Submitpage from "./Submitpage/SubmitPage";
import MainLayout from "./MainLayout/MainLayout";
import MMSheetManagment from "./ModelEditor";
import ScenarioManagement from "./ScenarioManagment";
import * as AWSConnections from "./AWS Midleware/AWSConnections"; // import AWSConnections to use in App.js
import LoadingCircle from "./loadingcircle";
import DynamicButtonComponent from "./ACENavigation";
import Overirdeconfirmation from "./OverideConfirmationpage";
import Savesscenario from "./savescenario";
import Lockscenario from "./LockSceanrio";
import Home from "./HomePage/Home";
import ScenarioManeger from "./Forecast Managment/ScenarioManager";
import Outputsmaneger from "./OutputsManager";
import Riskmanager from "./RiskManager";
import LoadAssumptions from "./Load Assumptions/LoadAssumptions";
import ReportGinnie from "./ReportGinnie/ReportGinnie";
import SaveForecastPage from "./MsgPage/SaveForcastPage";
import ImportReportGenie from "./Import Report Genie/ImportReport";
import LockScenario from "./Lock Scenario/LockScenario";
import Importfunnel from "./Import Models/ImportFunnel";

function App() {
  const [page, setPage] = useState("UserLogin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uuid, setUuid] = useState(""); // New state to hold the UUID
  const [loadingMessage, setLoadingMessage] = useState(""); // State to hold the loading message

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) {
        const result = await AWSConnections.getCognitoAccessToken(storedUsername, "overarching");
        if (result.success) {
          setIsLoggedIn(true);
          setPage("Home");
        } else {
          sessionStorage.removeItem("username");
          setIsLoggedIn(false);
          setPage("UserLogin");
        }
      } else {
        setIsLoggedIn(false);
        setPage("UserLogin");
      }
    };

    checkUserSession();
  }, []);

  const setPageValue = (value, uuid = "", message = "") => {
    setPage(value);
    setUuid(uuid); // Set the UUID when the page is changed
    setLoadingMessage(message); // Set the loading message when the page is changed
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("Home");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    setPage("UserLogin");
  };

  const routesPages = (page) => {
    switch (page) {
      case "ModelManagementPage1":
        return <ModelManagementPage1 setPageValue={setPageValue} />;
      case "Home":
        return <Home setPageValue={setPageValue} />;
      case "UserLogin":
        return <UserLogin setPageValue={setPageValue} handleLogin={handleLogin} />;
      case "Model Editor":
        return <MMSheetManagment setPageValue={setPageValue} />;
      case "Scenario management":
        return <ScenarioManagement setPageValue={setPageValue} />;
      case "LoadPage":
        return <ImportACE setPageValue={setPageValue} />;
      case "Importfunnel":
        return <Importfunnel setPageValue={setPageValue} />;
      case "Submitpage":
        return <Submitpage setPageValue={setPageValue} />;
      case "ContactUs":
        return <UserRegistrationForm setPageValue={setPageValue} />;
      case "DynamicButtonComponent":
        return <DynamicButtonComponent setPageValue={setPageValue} />;
      case "LoadingCircle":
        return <LoadingCircle message={loadingMessage} />; // Pass the dynamic loading message here
      case "Overirdeconfirmation":
        return <Overirdeconfirmation setPageValue={setPageValue} UUID={uuid} />;
      case "savescenario":
        return <Savesscenario setPageValue={setPageValue} />;
      case "ScenarioManager":
        return <ScenarioManeger setPageValue={setPageValue} />;
      case "OutputManager":
        return <Outputsmaneger setPageValue={setPageValue} />;
      case "RiskManager":
        return <Riskmanager setPageValue={setPageValue} />;
      case "LoadAssumptions":
        return <LoadAssumptions setPageValue={setPageValue} />;
      case "ReportGinnie":
        return <ReportGinnie setPageValue={setPageValue} />;
      case "SaveForecastPage":
        return <SaveForecastPage setPageValue={setPageValue} />;
      case "ImportReportGenie":
        return <ImportReportGenie setPageValue={setPageValue} />;
      case "LockScenario":
        return <LockScenario setPageValue={setPageValue} />;
      default:
        return <UserLogin setPageValue={setPageValue} handleLogin={handleLogin} />;
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <MainLayout onMenuItemClick={setPageValue} handleLogout={handleLogout}>
          {routesPages(page)}
        </MainLayout>
      ) : (
        routesPages(page)
      )}
    </>
  );
}

export default App;
