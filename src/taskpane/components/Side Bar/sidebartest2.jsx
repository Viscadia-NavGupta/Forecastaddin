import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Sidebar,
  MenuSection,
  MenuItem,
  BottomSection,
} from "./sidebartest2styles";
import Tooltip from "./tooltip";

// Importing all the icons as React components
import HomeIcon from "../Icons/HomeIcon";
import ModelDesignIcon from "../Icons/ModelDesignIcon";
import ForecastManagementIcon from "../Icons/ForecastManagementIcon";
import CatalogueIcon from "../Icons/CatalogueIcon";
import PowerBiIcon from "../Icons/powerbiicon";
import ReportGenieIcon from "../Icons/ReportGenieIcon";
import RiskIcon from "../Icons/Riskicons"; // Corrected component name

const Sidebartest2 = ({ onMenuItemClick, handleLogout, activePage }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(""); // Track the active menu item
  const tooltipRef = useRef(null);

  const menuItems = [
    { icon: <HomeIcon />, text: "Home", key: "Home" },
    { icon: <ModelDesignIcon />, text: "Model Management", key: "ModelManagementPage1" },
    { icon: <ForecastManagementIcon />, text: "Forecast Management", key: "ScenarioManager" },
    { icon: <CatalogueIcon />, text: "Assumptions Catalogue", key: "LoadAssumptions" },
    { icon: <RiskIcon />, text: "Risk & Analytics", key: "RiskManager" }, // Corrected component name
    { icon: <PowerBiIcon />, text: "Power BI Report", key: "PowerBI" },
    { icon: <ReportGenieIcon />, text: "Report Genie", key: "ImportReportGenie" },
  ];

  // Effect to update activeItem when activePage changes
  useEffect(() => {
    if (activePage) {
      const matchedItem = menuItems.find(item => item.key === activePage);
      if (matchedItem) {
        setActiveItem(activePage); // Update the active item
      }
    }
  }, [activePage]);

  const handleMenuItemClick = (key, index) => {
    if (key === "PowerBI") {
      OpenPowerbi(); // Call OpenPowerbi function directly when PowerBI is clicked
    } else {
      setActiveItem(key); // Set the active menu item based on click
      onMenuItemClick(key);

      // Scroll the active item into view
      const menuItem = document.getElementById(`menu-item-${index}`);
      if (menuItem) {
        menuItem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
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

  const OpenPowerbi = () => {
    window.open(
      "https://app.powerbi.com/links/Z_tEFHu8vr?ctid=c05372cf-28bd-4caf-83dd-e8b65c066ce9&pbi_source=linkShare",
      "_blank"
    );
  };

  return (
    <Container>
      <Sidebar>
        <MenuSection>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              id={`menu-item-${index}`}
              onClick={() => handleMenuItemClick(item.key, index)}
              onMouseEnter={(e) => handleMouseEnter(item.text, e.currentTarget)}
              onMouseLeave={handleMouseLeave}
              isActive={activeItem === item.key} // Correctly highlight active item
            >
              {React.isValidElement(item.icon) ? (
                React.cloneElement(item.icon, { fill: activeItem === item.key ? "#BD302B" : "#FFFFFF" })
              ) : (
                <img src={item.icon} alt={item.text} />
              )}
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
