import { styled } from "@mui/system";

export const Container = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  color: "#808080",  // Grey color
  fontSize: "18px",  // Font size set to 14px
  fontWeight: "normal",  // Normal font weight
  backgroundColor: "transparent",  // Remove the background color
  border: "none",  // No border
  padding: "0",  // Remove padding
  cursor: "default",  // Remove pointer cursor
  marginBottom: "20px",
  textDecoration: "underline",
  
});

export const DropdownContainer = styled("div")({
  width: "80%",
  background: "#FFFFFF",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "20px",
});

export const ImportButton = styled("button")({
  padding: "10px 20px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  color: "#FFFFFF",
  backgroundColor: "#0081C5",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005f99",
  },
});
