import React, { useState, useRef } from "react";
import { Container, Sidebar, MenuSection, MenuItem, BottomSection } from "./sidebartest2styles";
import Tooltip from "./tooltip";

const Sidebartest2 = ({ onMenuItemClick, handleLogout }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const menuItems = [
    { icon: "/assets/home.svg", text: "Home", onClick: () => onMenuItemClick("Home") },
    { icon: "/assets/Modeldesign.svg", text: "Model Desinger", onClick: () => onMenuItemClick("ModelManagementPage1") },
    {
      icon: "/assets/ForecastManagement.svg",
      text: "Forecast Management",
      onClick: () => onMenuItemClick("ScenarioManager"),
    },
    { icon: "/assets/catelouge.svg", text: "Assumption Catalogue", onClick: () => onMenuItemClick("LoadAssumptions") },
    { icon: "/assets/analytics.svg", text: "Risk & Analytics", onClick: () => onMenuItemClick("RiskManager") },
    {
      icon: "/assets/loadassumptions.svg",
      text: "Assumptions Catalogue",
      onClick: () => onMenuItemClick("LoadAssumptions"),
    },
    { icon: "/assets/reportgenie.svg", text: "Report Genie", onClick: () => onMenuItemClick("ReportGinnie") },
    {
      icon: "/assets/acenavigation.svg",
      text: "ACE Navigation",
      onClick: () => onMenuItemClick("DynamicButtonComponent"),
    },
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
              <img src={item.icon} alt={item.text} style={{ width: "24px", height: "24px" }} />
            </MenuItem>
          ))}
        </MenuSection>
        <BottomSection>
          <MenuItem
            onClick={handleLogout}
            onMouseEnter={(e) => handleMouseEnter("Logout", e.currentTarget)}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/assets/logout.svg" alt="Logout" style={{ width: "24px", height: "24px" }} />
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
