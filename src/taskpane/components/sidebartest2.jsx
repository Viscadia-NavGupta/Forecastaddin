import React, { useState, useRef } from "react";
import "boxicons/css/boxicons.min.css";
import { Container, Sidebar, MenuSection, MenuItem, BottomSection } from "./sidebartest2styles";
import Tooltip from "./tooltip";

const Sidebartest2 = ({ onMenuItemClick, handleLogout }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const menuItems = [
    { icon: "bx bx-home", text: "Home", onClick: () => onMenuItemClick("Home") },
    { icon: "bx bxs-component", text: "Model Manager", onClick: () => onMenuItemClick("ModelManagementPage1") },
    { icon: "bx bx-cog", text: "Scenario Manager", onClick: () => onMenuItemClick("ScenarioManager") },
    { icon: "bx bx-user", text: "Outputs", onClick: () => onMenuItemClick("OutputManager") },
    { icon: "bx bx-calendar", text: "Risk & Analytics", onClick: () => onMenuItemClick("RiskManager") },
    { icon: "bx bx-calendar", text: "Assumptions Catelouge", onClick: () => onMenuItemClick("LoadPage") },
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
