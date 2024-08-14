import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

// export const ModelManagementButton = styled("button")({
//   backgroundColor: "#00a19B",
//   color: "#fff",
//   border: "none",
//   borderRadius: "20px",
//   padding: "10px 20px",
//   fontSize: "12px",
//   fontWeight: "bold",
//   marginBottom: "30px",
//   cursor: "pointer",
// });
export const ModelManagementButton = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  color: "#6D6E71",  // Grey color
  fontSize: "16px",  // Font size set to 14px
  fontWeight: "normal",  // Normal font weight
  backgroundColor: "transparent",  // Remove the background color
  border: "none",  // No border
  padding: "0",  // Remove padding
  cursor: "default",  // Remove pointer cursor
  textDecoration: "underline",
});

export const ButtonsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
  gap: "25px", // Adjust the gap as needed
  justifyItems: "center",
  alignItems: "center",
});

export const Button = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100px",
  height: "100px",
  backgroundColor: "#ededed",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const Icon = styled("img")({
  width: "40px",
  height: "40px",
  marginBottom: "5px",
  marginTop: "5px",
});

export const Label = styled("span")({
  fontSize: "10px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "5px",
});
