import React from "react";
import "boxicons/css/boxicons.min.css";
import { useStyles17 } from "./sidebartest2styles";

const Sidebartest2 = ({onMenuItemClick}) => {
  const classes = useStyles17();

  const handleDashboardClick = () => {
    console.log("Dashboard clicked");
  };

  const handleCategoryClick = () => {
    console.log("Category clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
  };

  const menuItems = [
    { icon: "bx bx-grid-alt", text: "Model Management", onClick: () => onMenuItemClick("ModelManagementPage1") },
    { icon: "bx bx-collection", text: "Model Editor", onClick: () => onMenuItemClick("Model Editor") },
    { icon: "bx bx-cog", text: "Scenario management ", onClick: () => onMenuItemClick("Scenario management") },
    { icon: "bx bx-user", text: "Risk Analytics", onClick: () => onMenuItemClick("Risk Analytics") },
    { icon: "bx bx-calendar", text: "Load Scenario", onClick: () => onMenuItemClick("LoadPage") },
    { icon: "bx bx-message", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-bell", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-book", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-photo-album", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-help-circle", text: "Help", onClick: () => onMenuItemClick("ModelManagementPage") },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {/* <div className={classes.topSection}>
          <img src="/../assets/Viscadia_Logo_white.png" className={classes.profileImage} alt="Profile" />
        </div> */}
        <div className={classes.menuSection}>
          {menuItems.map((item, index) => (
            <button key={index} className={classes.menuItem} onClick={item.onClick}>
              <i className={item.icon}></i>
              <span className={classes.tooltip}>{item.text}</span>
            </button>
          ))}
        </div>
        <div className={classes.bottomSection}>
          <button className={classes.menuItem} onClick={handleLogoutClick}>
            <i className="bx bx-log-out"></i>
            <span className={classes.tooltip}>Logout</span>
          </button>
        </div>
      </div>
      <div className={classes.contentArea}>
        {/* <div className={classes.topRightSection}>
          <span className={classes.topRightText}>Viscadia Forecast Platform</span>
        </div> */}
        <div className={classes.mainContent}>
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebartest2;
