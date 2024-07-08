import React, { useState, useEffect } from "react";
import UserLogin from "./userlogin/UserLogin";
import ModelManagementPage1 from "./ModelManagementPage";
import LoadPage from "./LoadPage";
import UserRegistrationForm from "./Userregistration/UserRegistrationform";
import Submitpage from "./Submitpage/SubmitPage";
import MainLayout from "./MainLayout";
import MMSheetManagment from "./ModelEditor";
import ScenarioManagement from "./ScenarioManagment";
import * as AWSConnections from "./AWS Midleware/AWSConnections"; // import AWSConnections to use in App.js
import LoadingCircle from "./loadingcircle";

function App() {
  const [page, setPage] = useState("UserLogin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const setPageValue = (value) => {
    setPage(value);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("ModelManagementPage1");
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
      case "LoadingCircle":
        return <LoadingCircle />;
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
