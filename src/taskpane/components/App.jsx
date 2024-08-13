import React, { useState, useEffect } from "react";
import UserLogin from "./userlogin/UserLogin";
import ModelManagementPage1 from "./Model Managment/Model Desinger";
import LoadPage from "./Import Models/LoadPage";
import UserRegistrationForm from "./Userregistration/UserRegistrationform";
import Submitpage from "./Submitpage/SubmitPage";
import MainLayout from "./MainLayout";
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

function App() {
  const [page, setPage] = useState("UserLogin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uuid, setUuid] = useState(""); // New state to hold the UUID

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

  const setPageValue = (value, uuid = "") => {
    setPage(value);
    setUuid(uuid); // Set the UUID when the page is changed
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
        return <LoadPage setPageValue={setPageValue} />;
      case "Submitpage":
        return <Submitpage setPageValue={setPageValue} />;
      case "ContactUs":
        return <UserRegistrationForm setPageValue={setPageValue} />;
      case "DynamicButtonComponent":
        return <DynamicButtonComponent setPageValue={setPageValue} />;
      case "LoadingCircle":
        return <LoadingCircle />;
      case "Overirdeconfirmation":
        return <Overirdeconfirmation setPageValue={setPageValue} UUID={uuid} />; // Pass the UUID prop
      case "savescenario":
        return <Savesscenario setPageValue={setPageValue} />; // Pass the UUID prop
      case "LockScenario":
        return <Lockscenario setPageValue={setPageValue} />; // Pass the UUID prop
      case "ScenarioManager":
        return <ScenarioManeger setPageValue={setPageValue} />; // Pass the UUID prop
      case "OutputManager":
        return <Outputsmaneger setPageValue={setPageValue} />; // Pass the UUID prop
      case "RiskManager":
        return <Riskmanager setPageValue={setPageValue} />; // Pass the UUID prop
      case "LoadAssumptions":
        return <LoadAssumptions setPageValue={setPageValue} />; // Pass the UUID prop
      case "ReportGinnie":
        return <ReportGinnie setPageValue={setPageValue} />; // Pass the UUID prop
      case "SaveForecastPage":
        return <SaveForecastPage setPageValue={setPageValue} />; // Pass the UUID prop
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
