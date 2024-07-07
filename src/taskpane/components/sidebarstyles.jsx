import { makeStyles } from "@mui/styles";

export const useStyles5 = makeStyles({
  pageContainer: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },
  sidebar: {
    height: "100%",
    width: 0,
    position: "fixed",
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: "#cd1c1c",
    overflowX: "hidden",
    transition: "0.5s",
    paddingTop: "0px",
  },
  sidebarHeading: {
    padding: "0px 0px",
    color: "#f1f1f1",
    textAlign: "center",
    marginBlockStart: "0.3em",
    marginBlockEnd: "0.3em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",

  },
  sidebarLink: {
    padding: "8px 8px 8px 32px",
    textDecoration: "none",
    fontSize: "18px",
    color: "#f1f1f1",
    display: "block",
    transition: "0.3s",
    "&:hover": {
      color: "#030deb",
    },
  },
  closebtn: {
    position: "absolute",
    top: 0,
    right: "25px",
    fontSize: "36px",
    marginLeft: "50px",
  },
  openbtn: {
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#cd1c1c",
    color: "white",
    padding: "15px 15px",
    border: "none",
    "&:hover": {
      backgroundColor: "#444",
    },
  },
  main: {
    marginLeft: 0,
    transition: "margin-left .5s",
    padding: "0px",
    width: "100%",
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "10%",
    padding: "0 0px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
  },
  mainHeading: {
    fontFamily: "Arial, sans-serif",
    fontSize: "24px",
    color: "#333",
    textAlign:"center",
  },
  content: {
    height: "90%",
    padding: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});