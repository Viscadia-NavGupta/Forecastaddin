import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const ModelManagementTitle = styled("h1")({
  color: "#6D6E71",
  textDecoration: "underline",
  fontSize: "20px",
  // marginBottom: "30px",
});

export const ButtonsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
  gap: "20px", // Adjust the gap as needed
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

export const MessageBox = styled("div")({
  marginTop: "10px",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "#ffffff",
  color: "#333",
  fontSize: "14px",
  textAlign: "center",
  width: "80%",
  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});
