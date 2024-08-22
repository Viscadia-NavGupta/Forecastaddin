import React, { useState, useRef } from "react";
import { Container, Sidebar, MenuSection, MenuItem, BottomSection } from "./sidebartest2styles";
import Tooltip from "./tooltip";

const Sidebartest2 = ({ onMenuItemClick, handleLogout }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("Home"); // Track the active menu item
  const tooltipRef = useRef(null);

  const menuItems = [
    { icon: "/assets/home.svg", text: "Home", key: "Home" },
    { icon: "/assets/Modeldesign.svg", text: "Model Designer", key: "ModelManagementPage1" },
    { icon: "/assets/ForecastManagement.svg", text: "Forecast Management", key: "ScenarioManager" },
    { icon: "/assets/catelouge.svg", text: "Assumption Catalogue", key: "LoadAssumptions" },
    { icon: "/assets/analytics.svg", text: "Risk & Analytics", key: "RiskManager" },
    { icon: "/assets/loadassumptions.svg", text: "Load Forecast", key: "LoadPage" },
    { icon: "/assets/reportgenie.svg", text: "Report Genie", key: "ImportReportGenie" },
    { icon: "/assets/acenavigation.svg", text: "ACE Navigation", key: "DynamicButtonComponent" },
  ];

  const handleMenuItemClick = (key) => {
    setActiveItem(key); // Set the active menu item based on key
    onMenuItemClick(key);
  };

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
              onClick={() => handleMenuItemClick(item.key)}
              onMouseEnter={(e) => handleMouseEnter(item.text, e.currentTarget)}
              onMouseLeave={handleMouseLeave}
              isActive={activeItem === item.key} // Highlight active item
            >
              <img src={item.icon} alt={item.text} />
            </MenuItem>
          ))}
        </MenuSection>
        <BottomSection>
          <MenuItem
            onClick={handleLogout}
            onMouseEnter={(e) => handleMouseEnter("Logout", e.currentTarget)}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/assets/logout.svg" alt="Logout" />
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
