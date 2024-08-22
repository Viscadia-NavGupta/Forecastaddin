import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const Title = styled("h1")({
  color: "#808080",  // Updated to a deep grayish-blue color for consistency
  textDecoration: "underline",  // Underline the title
  marginBottom: "30px",
  fontSize: "18px",  // Slightly larger font size for emphasis
  fontWeight: 300,  // Light font weight for Roboto Light
  textAlign: "center",  // Center-align the title
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: "10px",  // Reduced gap to match the home page
  flexWrap: "wrap",
  justifyContent: "center",  // Center-align buttons similar to other pages
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
  fontWeight: "bold",
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

export const AnotherLabel1 = styled(Label)({
  color: "#595959",
});

export const AnotherLabel2 = styled(Label)({
  color: "#595959",
});
