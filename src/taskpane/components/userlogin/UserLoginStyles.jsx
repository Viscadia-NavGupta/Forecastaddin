import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const Logo = styled("img")({
  width: "250px",
  height: "65px",
  marginBottom: "10px",
  marginTop: "20px",
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

export const Rec = styled("div")({
  position: "relative",
  height: "auto",
  background: "#FFFFFF",
  boxShadow: "0px 1px 4.6px rgba(0, 0, 0, 0.15)",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  marginTop: "20px",
});

export const ErrorMessage = styled("span")({
  color: "red",
  fontSize: "12px",
  marginTop: "10px",
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "160%",
  color: "#808080", // Updated to grey color
  marginBottom: "20px",
});

export const UserProfileButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "214px",
  height: "38px",
  background: "#BD302B",
  borderRadius: "32px",
  marginBottom: "30px",
});

export const UserProfileButtonInner = styled("button")({
  fontFamily: "'Roboto', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "160%",
  color: "#FFFFFF",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  margin: 0,
});

export const InputContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: "20px",
});

export const InputContainerInput = styled("input")({
  width: "100%",
  border: "1px solid #C1C5C8",
  borderRadius: "4px",
  fontSize: "16px",
  outline: "none",
  padding: "10px",
  marginBottom: "10px",
  boxSizing: "border-box",
});

export const HelperTextContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const InputHelperText = styled("span")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "12px",
  color: "#63666A",
});

export const ContactUsButton = styled("button")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "12px",
  color: "#0081C5",
  background: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
});

export const ButtonfButton = styled("button")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40px",
  background: "#0081C5",
  borderRadius: "4px",
  color: "white",
  fontFamily: "'Roboto', sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "160%",
  border: "none",
  cursor: "pointer",
  marginBottom: "10px",
});

export const Footer = styled("footer")({
  marginTop: "auto",
  fontSize: "12px",
  color: "#63666A",
});

export const LoginContainer = styled("div")({
  width: "250px",
  padding: "20px",
  background: "#FFFFFF",
  boxShadow: "0px 1px 4.6px rgba(0, 0, 0, 0.15)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

export const RememberForgotContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: "10px",
});

export const RememberMeLabel = styled("span")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "14px",
  color: "#63666A",
  marginLeft: "5px",
});

export const ForgotPasswordLink = styled("a")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "12px",
  color: "#0081C5",
  textDecoration: "underline",
  cursor: "pointer",
});

export const ContactUsLink = styled(ForgotPasswordLink)({
  marginTop: "5px", 
  display: "block",
  textAlign: "center",
});
