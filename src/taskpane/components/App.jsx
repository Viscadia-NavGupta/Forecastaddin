import React, { useState, useEffect } from "react";
import UserLogin from "./userlogin/UserLogin";
import { makeStyles } from "@fluentui/react-components";
import Header from "./Old Components/Header";
import ModelManagementPage from "./Old Components/ModelManagment";
import LoadPage from "./LoadPage";
import Sidebar from "./Old Components/sidebar";
import UserRegistrationForm from "./Userregistration/UserRegistrationform";
import Submitpage from "./Submitpage/SubmitPage";
import MainLayout from "./MainLayout";
// import Sidebarnew from "./SidebarNew";
// import Sidebartest from "./sidebartest";
import Sidebartest2 from "./sidebartest2";
import ModelManagementPage1 from "./ModelManagementPage";
import MMSheetManagment from "./ModelEditor";
import ScenarioManagement from "./ScenarioManagment";
import * as AWSConnections from "./AWS Midleware/AWSConnections"; // import AWSConnections to use in App.js
import LoadingCircle from "./loadingcircle";



const useStyles = makeStyles({});

function App() {
  const [page, setPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) {
        const result = await AWSConnections.getCognitoAccessToken(storedUsername, "overarching");
        if (result.success) {
          setIsLoggedIn(true);
          setPage("ModelManagementPage1");
        } else {
          sessionStorage.removeItem("username");
        }
      }
    };

    checkUserSession();
  }, []);

  const setPageValue = (value) => {
    setPage(value);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login status to true
    setPage("ModelManagementPage1"); // Navigate to the desired page
  };

  const routesPages = (page) => {
    switch (page) {
      case "ModelManagementPage1":
        return <ModelManagementPage1 setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "UserLogin":
        return <UserLogin setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "Model Editor":
        return <MMSheetManagment setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "Scenario management":
        return <ScenarioManagement setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "LoadPage":
        return <LoadPage setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "Submitpage":
        return <Submitpage setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "ContactUs":
        return <UserRegistrationForm setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      case "LoadingCircle":
        return <LoadingCircle setPageValue={setPageValue} onBack={() => setPageValue("input")} />;
      default:
        return <UserLogin setPageValue={setPageValue} handleLogin={handleLogin} />; // change to userlogin after testing
    }
  };

  return (
    <>{isLoggedIn ? <MainLayout onMenuItemClick={setPageValue}>{routesPages(page)}</MainLayout> : routesPages(page)}</>
  );
}

export default App;
