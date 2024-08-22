import { styled } from "@mui/system";

export const Layout = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  overflow: "hidden", // Prevents scrolling on the main layout
});

export const TopRightSection = styled("div")({
  height: "50px", // Adjusted height to match the design
  background: "#BD302B", // Red background color
  display: "flex",
  alignItems: "center",
  padding: "0", // Remove padding so that containers align correctly
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000,
});

export const LogoContainer = styled("div")({
  width: "45px", // Width matches the sidebar
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the logo in the container
  backgroundColor: "#BD302B", // Match the background color
});

export const TextContainer = styled("div")({
  flex: 1, // Take up the remaining space
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the text horizontally
});

export const ProfileImage = styled("img")({
  width: "30px", // Logo size
  height: "30px",
});

export const TopRightText = styled("span")({
  fontSize: "20px", // Font size for the title
  fontWeight: "bold",
  color: "#FFFFFF", // White text color
});

export const MainContent = styled("div")({
  display: "flex",
  flexDirection: "row",
  height: "92vh", // Adjust height to account for the fixed header
  marginTop: "50px", // Ensure content starts after the fixed header
  overflowY: "auto", // Enables scrolling only for the main content area
});

export const SidebarContainer = styled("div")({
  width: "45px", // Adjust the width to be consistent with the sidebar component
  background: "#3E4B5B", // The grey color as shown in the updated layout
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  top: "50px", // Aligns the sidebar below the top right section
  bottom: 0,
  zIndex: 999,
  borderRadius: "0 20px 20px 0",
  overflowX: "visible", // Allow horizontal overflow for tooltips
});

export const ContentContainer = styled("div")({
  flex: 1,
  padding: "20px",
  marginLeft: "60px", // Offset the content by the width of the sidebar
  overflowY: "auto", // Enables scrolling for the content container
});
