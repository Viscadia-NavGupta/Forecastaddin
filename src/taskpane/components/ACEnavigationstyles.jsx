import { styled } from "@mui/system";

export const Container = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "0px",
});

export const LinkButton = styled("button")({
  padding: "5px 0",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: "#0081C5",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  marginBottom: "5px",
  width: "100%",
  display: "block",  // Ensure buttons are block elements
  "&:hover": {
    color: "#005f99",
  },
});

export const LinkText = styled("span")({
  textDecoration: "underline",
});

export const BoldText = styled("span")({
  fontWeight: "bold",
  color: "#6d6e71",
});

export const Index = styled("span")({
  marginRight: "10px",
  fontWeight: "bold",
  color: "#6d6e71",
});

export const MessageBox = styled("div")({
  marginTop: "20px",
  padding: "10px 20px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#333",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  textAlign: "center",
  width: "100%",
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  color: "#6d6e71",
  marginBottom: "5px",
});
