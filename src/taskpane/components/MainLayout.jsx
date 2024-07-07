import React from "react";
import { useStyles20 } from "./mainLayoutNew";
import Sidebartest2 from "./sidebartest2";

const MainLayout = ({ children, onMenuItemClick }) => {
  const classes = useStyles20();

  return (
    <div className={classes.layout}>
      <div className={classes.topRightSection}>
        <div className={classes.topSection}>
          <img src="/../assets/Viscadia_V_Logo.png" className={classes.profileImage} alt="Profile" />
        </div>
        <span className={classes.topRightText}>Viscadia Forecast Platform</span>
      </div>
      <div className={classes.mainContent}>
        <Sidebartest2 onMenuItemClick={onMenuItemClick} />
        <div className={classes.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
