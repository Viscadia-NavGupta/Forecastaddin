import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

export const Sidebar = styled("div")({
  width: "45px", // Sidebar width
  background: "#707477", // Sidebar background color
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden",
  position: "relative",
  zIndex: 2,
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#BD302B",
    borderRadius: "4px",
  },
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
  margin: "5px 0 5px 5px", // Reduce the space between menu items (top and bottom margins reduced)
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(100% - 5px)", // Adjust width to accommodate the increased margin
  height: "40px", // Height of the menu item
  transition: "background 0.3s, color 0.3s", // Smooth hover transition
  "& img": {
    width: "24px",
    height: "24px",
    transition: "fill 0.3s", // Smooth transition for icon color
  },
  "&:hover": {
    background: "#FFFFFF", // Hover effect for better visibility
    color: "#BD302B",
    borderRadius: "30px 0 0 30px", // Maintain the left curve on hover
    "& svg": {
      fill: "#BD302B", // Change icon color on hover
    },
  },
}));

export const BottomSection = styled("div")({
  paddingBottom: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
