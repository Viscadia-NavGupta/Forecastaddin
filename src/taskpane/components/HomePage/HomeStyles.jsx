import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const Title = styled("div")({
  color: "#6D6E71",
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: 300,  // Light font weight for Roboto Light
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  "& span": {
    color: "#BD302B",
    fontSize: "24px",
    fontWeight: "bold",  // Bold for emphasis on the span
    fontFamily: "Roboto, sans-serif",  // Ensure Roboto is applied to the span as well
  }
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: "10px", // Reduced gap between buttons
  flexWrap: "wrap",
  justifyContent: "flex-start",
  paddingLeft: "20px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300, // Light font weight
});

export const Button = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "85px",  // Reduced width
  height: "85px",  // Reduced height
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
  width: "30px",  // Reduced icon size
  height: "30px",  // Reduced icon size
  marginTop: "5px",
  marginBottom: "10px",
});

export const Label = styled("span")({
  fontSize: "10px",  // Reduced label text size
  fontWeight: "bold",  // Maintain bold for label emphasis
  color: "#333",
  marginBottom: "5px",
  lineHeight:"10px",
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

export const AssumptionsLabel = styled(Label)({
  color: "#595959",
});

export const NewFeatureLabel = styled(Label)({
  color: "#595959",
});

export const OpenGoogleLabel = styled(Label)({
  color: "#595959",
});
