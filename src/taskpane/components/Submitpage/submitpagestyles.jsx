import { styled } from "@mui/system";

export const Logo = styled("img")({
  width: "250px",
  height: "80px",
  marginBottom: "10px",
  marginTop: "20px", // Adjust as needed
});

export const UsernameInputContainer = styled("div")({
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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

export const Container = styled("div")({
  position: "relative",
  width: "85%",
  minHeight: "100vh",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "40px",
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "160%",
  color: "#000000",
  marginBottom: "40px",
  alignItems: "center",
});

export const Button = styled("button")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "113px",
  height: "31px",
  background: "#0081C5",
  borderRadius: "32px",
  color: "white",
  fontFamily: "'Roboto', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "160%",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0f2c4b",
  },
  marginRight: "25px", // Added space between buttons
  marginLeft: "15px",
});
