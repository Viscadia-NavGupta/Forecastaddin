import React, { useState, useRef } from "react";
import "boxicons/css/boxicons.min.css";
import { Container, Sidebar, MenuSection, MenuItem, BottomSection } from "./sidebartest2styles";
import Tooltip from "./tooltip";

const Sidebartest2 = ({ onMenuItemClick, handleLogout }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const menuItems = [
    { icon: "bx bx-grid-alt", text: "Model Management", onClick: () => onMenuItemClick("ModelManagementPage1") },
    { icon: "bx bx-collection", text: "Model Editor", onClick: () => onMenuItemClick("Model Editor") },
    { icon: "bx bx-cog", text: "Scenario management", onClick: () => onMenuItemClick("Scenario management") },
    { icon: "bx bx-user", text: "Risk Analytics", onClick: () => onMenuItemClick("Risk Analytics") },
    { icon: "bx bx-calendar", text: "Load Scenario", onClick: () => onMenuItemClick("LoadPage") },
    { icon: "bx bx-message", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-bell", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-book", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-photo-album", text: "TBD", onClick: () => onMenuItemClick("ModelManagementPage") },
    { icon: "bx bx-help-circle", text: "Help", onClick: () => onMenuItemClick("ModelManagementPage") },
  ];

  const handleMouseEnter = (text, ref) => {
    setTooltipText(text);
    setTooltipVisible(true);
    tooltipRef.current = ref;
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
    tooltipRef.current = null;
  };

  return (
    <Container>
      <Sidebar>
        <MenuSection>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.onClick}
              onMouseEnter={(e) => handleMouseEnter(item.text, e.currentTarget)}
              onMouseLeave={handleMouseLeave}
            >
              <i className={item.icon}></i>
            </MenuItem>
          ))}
        </MenuSection>
        <BottomSection>
          <MenuItem
            onClick={handleLogout}
            onMouseEnter={(e) => handleMouseEnter("Logout", e.currentTarget)}
            onMouseLeave={handleMouseLeave}
          >
            <i className="bx bx-log-out"></i>
          </MenuItem>
        </BottomSection>
      </Sidebar>
      <Tooltip targetRef={tooltipRef} visible={tooltipVisible}>
        {tooltipText}
      </Tooltip>
    </Container>
  );
};

export default Sidebartest2;
