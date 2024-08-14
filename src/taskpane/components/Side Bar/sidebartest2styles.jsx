import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

export const Sidebar = styled("div")({
  width: "50px",
  background: "#BD302B",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowY: "auto",
  overflowX: "hidden",
  position: "relative",
  zIndex: 2,
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
  whiteSpace: "nowrap",
  padding: "0",  // Remove padding for better alignment with image
  "& img": {
    width: "24px",  // Set the width of the icon image
    height: "24px",  // Set the height of the icon image
  },
});

export const BottomSection = styled("div")({
  paddingBottom: "5px",
  paddingRight: "0px",
  paddingLeft:"8px",
});
