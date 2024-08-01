import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const Title = styled("h1")({
  color: "#6D6E71",
  textDecoration: "underline",
  marginBottom: "30px",
  fontSize: "15px",
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  justifyContent: "center", // Center the buttons
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
  fontSize: "12px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "5px",
  textAlign: "center",
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
