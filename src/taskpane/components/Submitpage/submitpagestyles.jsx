import { styled } from "@mui/system";

export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  // padding: "20px",
  boxSizing: "border-box",
});

export const LogoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  flex: "0 1 auto", // Allow the logo container to grow and shrink
});

export const Logo = styled("img")({
  width: "250px",
  height: "80px",
  marginBottom: "10px",
  // marginTop: "10px", // Reduced the top margin
});

export const ThemeBorder = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "6px",
});

export const RedRec = styled("div")({
  width: "50%",
  height: "100%",
  background: "#C1C5C8",
});

export const WhiteRec = styled("div")({
  width: "50%",
  height: "100%",
  background: "#BD302B",
});

export const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  width: "100%",
  textAlign: "center", // Center-align the text
  flex: "1 1 auto", // Allow the content container to grow and shrink
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "20px", // Adjusted font size
  lineHeight: "1.5", // Adjusted line height
  color: "#000000",
  marginBottom: "20px",
  padding: "0 20px", // Added padding for better text layout
});

export const Button = styled("button")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "150px", // Adjusted button width
  height: "40px", // Adjusted button height
  background: "#0081C5",
  borderRadius: "20px", // Adjusted border radius
  color: "white",
  fontFamily: "'Roboto', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "1.5",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0f2c4b",
  },
});
