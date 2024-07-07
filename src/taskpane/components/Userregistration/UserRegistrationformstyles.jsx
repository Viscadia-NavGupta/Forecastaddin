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
  height: "80px",
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

export const ContainerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "22px",
  lineHeight: "160%",
  color: "#000000",
  marginBottom: "40px",
});

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
});

export const InputContainer = styled("div")({
  marginBottom: "15px",
});

export const Label = styled("label")({
  marginBottom: "5px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "160%",
  color: "#000000",
});

export const Input = styled("input")({
  width: "80%", // Make the input field take 80% width of the container
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "160%",
});

export const Textarea = styled("textarea")({
  width: "80%", // Make the textarea take 80% width of the container
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "160%",
  resize: "vertical",
  height: "100px",
});

export const ButtonContainer = styled("div")({
  width: "90%",
  display: "flex",
  justifyContent: "space-between",
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
