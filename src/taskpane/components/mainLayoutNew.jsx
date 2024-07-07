import { styled } from "@mui/system";

export const Layout = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
});

export const TopRightSection = styled("div")({
  height: "8vh",
  background: "#898A8D",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000,
});

export const TopRightText = styled("span")({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
});

export const MainContent = styled("div")({
  display: "flex",
  flexDirection: "row",
  height: "92vh", // Remaining height after the top section
  marginTop: "8vh", // To ensure content starts after the fixed header
});

export const Sidebar = styled("div")({
  width: "15%",
  background: "#BD302B",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: "8vh", // Aligns the sidebar below the top right section
  bottom: 0,
  zIndex: 999,
  borderRadius: "0 20px 20px 0", 
});

export const ContentContainer = styled("div")({
  flex: 1,
  padding: "20px",
  overflowY: "auto",
});

export const TopSection = styled("div")({
  textAlign: "center",
  paddingLeft: "5px",
  paddingRight: "5px",
  paddingTop: "10px",
});

export const ProfileImage = styled("img")({
  width: "30px",
  height: "30px",
  borderRadius: "0",
  padding: "5px",
});
