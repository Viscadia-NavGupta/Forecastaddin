import React from "react";
import "boxicons/css/boxicons.min.css";
import {
  Container,
  Sidebar,
  MenuSection,
  MenuItem,
  Tooltip,
  BottomSection,
  ContentArea,
  MainContent,
} from "./sidebartest2styles";

const Sidebartest2 = ({ onMenuItemClick }) => {
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
    <Container>
      <Sidebar>
        <MenuSection>
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={item.onClick}>
              <i className={item.icon}></i>
              <Tooltip>{item.text}</Tooltip>
            </MenuItem>
          ))}
        </MenuSection>
        <BottomSection>
          <MenuItem onClick={handleLogoutClick}>
            <i className="bx bx-log-out"></i>
            <Tooltip>Logout</Tooltip>
          </MenuItem>
        </BottomSection>
      </Sidebar>
      <ContentArea>
        <MainContent>
          {/* Main content goes here */}
        </MainContent>
      </ContentArea>
    </Container>
  );
};

export default Sidebartest2;
