import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

export const Sidebar = styled("div")({
  width: "60px", // Sidebar width
  background: "#707477", // Red color
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowY: "hidden",
  overflowX: "hidden",
  position: "relative",
  zIndex: 2,
});

export const MenuSection = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px", // Adjust spacing at the top for better alignment
});

export const MenuItem = styled("button")(({ isActive }) => ({
  background: isActive ? "#FFFFFF" : "none", // White background for active item
  borderRadius: isActive ? "30px 0 0 30px" : "0", // Curve on the left side
  border: "none",
  color: isActive ? "#BD302B" : "#FFFFFF", // Red text for active item
  margin: "10px 0 10px 5px", // Increase the left margin to create the gap
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(100% - 5px)", // Adjust width to accommodate the increased margin
  height: "40px", // Height of the menu item
  "& img": {
    width: "24px",
    height: "24px",
  },
  "&:hover": {
    background: "#FFFFFF", // Hover effect for better visibility
    color: "#BD302B",
    borderRadius: "30px 0 0 30px", // Maintain the left curve on hover
  },
}));

export const BottomSection = styled("div")({
  paddingBottom: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
