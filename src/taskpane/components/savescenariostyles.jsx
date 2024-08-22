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
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight for consistency
});

export const Heading = styled("h2")({
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight for Roboto Light
  color: "#808080",  // Simple and modern deep grayish-blue color
  fontSize: "18px",  // Match the size with the second page
  margin: "20px 0",  // Similar spacing around the title
  textAlign: "center",  // Center-align the heading
  textDecoration: "underline",  // Underline to match the second page's title style
});

export const MessageBox = styled("div")({
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 400,  // Normal font weight
  fontSize: "14px",  // Font size
  color: "#FF0000",  // Red color for the text
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#FFE0E0",
  textAlign: "center",
  marginTop: "20px",
});

export const DropdownContainer = styled("div")({
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "16px",
  padding: "20px",
});

export const ComboBoxContainer = styled("div")({
  position: "relative",
  width: "100%",
});

export const ComboBoxInput = styled("input")({
  width: "100%",
  padding: "10px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 400,  // Normal font weight
  fontSize: "12px",  // Font size
  lineHeight: "160%",
  color: "#000000",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  boxSizing: "border-box",
});

export const ComboBoxList = styled("div")({
  position: "absolute",
  width: "100%",
  maxHeight: "150px",
  overflowY: "auto",
  background: "#FFF",
  boxShadow: "0px 1px 4.6px rgba(0, 0, 0, 0.15)",
  borderRadius: "8px",
  marginTop: "5px",
  zIndex: 1,
});

export const ComboBoxItem = styled("div")({
  padding: "10px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 400,  // Normal font weight
  fontSize: "12px",  // Font size
  lineHeight: "160%",
  color: "#63666A",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export const Input = styled("input")({
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 400,  // Normal font weight
  fontSize: "12px",
  lineHeight: "160%",
  color: "#000000",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  boxSizing: "border-box",
});

export const SaveButton = styled("button")({
  padding: "10px 20px",
  marginTop: "20px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 400,  // Normal font weight
  fontSize: "12px",
  color: "#FFFFFF",
  backgroundColor: "#0081C5",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005f99",
  },
});
