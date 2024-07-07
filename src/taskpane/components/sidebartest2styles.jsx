import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "auto",
  width: "15%",
});

export const Sidebar = styled("div")({
  width: "100%",
  background: "#BD302B",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const TopSection = styled("div")({
  textAlign: "center",
  paddingLeft: "5px",
  paddingRight: "5px",
  paddingTop: "10px",
});

export const ProfileImage = styled("img")({
  width: "80%",
  height: "80%",
  borderRadius: "0",
});

export const MenuSection = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const MenuItem = styled("button")({
  background: "none",
  border: "none",
  color: "#fff",
  margin: "10px 0",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  position: "relative",
  "&:hover $tooltip": {
    display: "block",
  },
  "& i": {
    fontSize: "24px",
  },
});

export const Tooltip = styled("span")({
  display: "none",
  position: "absolute",
  left: "100%",
  marginLeft: "10px",
  background: "#898A8D",
  color: "#000",
  padding: "5px",
  borderRadius: "5px",
  whiteSpace: "nowrap",
  zIndex: 1,
});

export const BottomSection = styled("div")({
  paddingBottom: "5px",
  paddingRight: "15px",
  paddingLeft: "5px",
});

export const ContentArea = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "85%",
});

export const TopRightSection = styled("div")({
  height: "8%",
  background: "#898A8D",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const TopRightText = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
});

export const MainContent = styled("div")({
  flex: 1,
  background: "#fff",
});
