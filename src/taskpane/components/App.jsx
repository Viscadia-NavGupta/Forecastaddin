import React, { useState, useEffect } from "react";
import UserLogin from "./userlogin/UserLogin";
import Header from "./Old Components/Header";
import ModelManagementPage from "./Old Components/ModelManagment";
import LoadPage from "./LoadPage";
import Sidebar from "./Old Components/sidebar";
import UserRegistrationForm from "./Userregistration/UserRegistrationform";
import Submitpage from "./Submitpage/SubmitPage";
import MainLayout from "./MainLayout";
import Sidebartest2 from "./sidebartest2";
import ModelManagementPage1 from "./ModelManagementPage";
import MMSheetManagment from "./ModelEditor";
import ScenarioManagement from "./ScenarioManagment";
import * as AWSConnections from "./AWS Midleware/AWSConnections"; // import AWSConnections to use in App.js
import LoadingCircle from "./loadingcircle";

function App() {
  const [page, setPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
        return <ModelManagementPage1 setPageValue={setPageValue} />;
      case "UserLogin":
        return <UserLogin setPageValue={setPageValue} />;
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
      case "LoadingCircle":
        return <LoadingCircle />;
      default:
        return <UserLogin setPageValue={setPageValue} handleLogin={handleLogin} />; // Default to UserLogin
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <MainLayout onMenuItemClick={setPageValue}>{routesPages(page)}</MainLayout>
      ) : (
        routesPages(page)
      )}
    </>
  );
}

export default App;
