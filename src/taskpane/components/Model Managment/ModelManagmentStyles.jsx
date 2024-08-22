import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const ModelManagementTitle = styled("h1")({
  color: "#7F7F7F",  // A deep grayish-blue color
  fontSize: "18px",  // Slightly larger font size for emphasis
  fontWeight: 300,  // Light font weight for Roboto Light
  fontFamily: "Roboto, sans-serif",  // Ensure Roboto font is applied
  marginBottom: "30px",
  textAlign: "center",  // Center the text
  textDecoration: "underline",  // Underline the title
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: "10px", // Reduced gap between buttons
  flexWrap: "wrap",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const Button = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "85px",  // Match width to home page
  height: "85px",  // Match height to home page
  backgroundColor: "#ededed",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "transform 0.2s",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const Icon = styled("img")({
  width: "30px",  // Match icon size to home page
  height: "30px",  // Match icon size to home page
  marginTop: "5px",
  marginBottom: "10px",
});

export const Label = styled("span")({
  fontSize: "10px",  // Match label text size to home page
  fontWeight: "bold",  // Maintain bold for label emphasis
  color: "#333",
  marginBottom: "5px",
  lineHeight: "10px",  // Reduce space between words
  textAlign: "center",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const FreshLabel = styled(Label)({
  color: "#595959",
});

export const LoadLabel = styled(Label)({
  color: "#595959",
});
