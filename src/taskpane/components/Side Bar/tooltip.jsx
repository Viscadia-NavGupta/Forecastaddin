import React from "react";
import ReactDOM from "react-dom";
import styled from "@mui/system/styled";

const TooltipContainer = styled("div")({
  position: "absolute",
  left: "100%", // Position the tooltip outside the sidebar
  top: "50%",
  transform: "translateY(-50%)",
  marginLeft: "10px",
  background: "#898A8D",
  color: "#fff",
  padding: "5px",
  borderRadius: "5px",
  whiteSpace: "nowrap",
  zIndex: 1000, // Ensure tooltip is above other elements
  display: "none", // Initially hide the tooltip
  fontFamily: "Roboto, sans-serif", // Set font to Roboto
  fontSize: "10px", // Set font size to 10px
});

const Tooltip = ({ children, targetRef, visible }) => {
  if (!targetRef.current) return null;

  const { top, left, height } = targetRef.current.getBoundingClientRect();

  return ReactDOM.createPortal(
    <TooltipContainer
      style={{
        top: `${top + height / 2}px`,
        left: `${left + targetRef.current.offsetWidth}px`,
        display: visible ? "block" : "none",
      }}
    >
      {children}
    </TooltipContainer>,
    document.body
  );
};

export default Tooltip;
