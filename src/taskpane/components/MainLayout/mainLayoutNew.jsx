import { styled } from "@mui/system";

export const Layout = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  overflow: "hidden", // Prevents scrolling on the main layout
  backgroundColor: "#F2F2F2", // Neutral background color
});

export const TopRightSection = styled("div")({
  height: "50px",
  background: "#BD302B",
  display: "flex",
  alignItems: "center",
  padding: "0",
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000,
});

export const LogoContainer = styled("div")({
  width: "40px", // Make sure this matches the width of the SidebarContainer
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#BD302B", // This part remains with the red background to match the top bar
});

export const TextContainer = styled("div")({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ProfileImage = styled("img")({
  width: "28px",
  height: "32px",
});

export const TopRightText = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#FFFFFF",
});

export const MainContent = styled("div")({
  display: "flex",
  flexDirection: "row",
  height: "calc(100vh - 50px)", // Ensure it takes up the space under the fixed header
  marginTop: "50px",
  overflowY: "auto",
});

export const SidebarContainer = styled("div")({
  width: "60px", // Match this width with the sidebar itself
  background: "#FFFFFF", // Set the background to white
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: "50px", // Aligns the sidebar below the top right section
  bottom: 0,
  zIndex: 999,
  borderRadius: "0 20px 20px 0",
  overflowX: "visible",
  boxShadow: "none", // Remove the shadow if not needed
});

export const ContentContainer = styled("div")({
  flex: 1,
  padding: "20px",
  marginLeft: "60px", // Make sure this matches the SidebarContainer width
  overflowY: "auto",
  backgroundColor: "#FFFFFF", // Ensure the content background is distinct and clear
});
