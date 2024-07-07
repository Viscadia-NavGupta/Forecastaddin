import { makeStyles } from "@mui/styles";

export const useStyles17 = makeStyles({
  container: {
    display: "flex",
    height: "auto",
    width:"15%",
  },
  sidebar: {
    width: "100%",
    background: "#BD302B",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topSection: {
    textAlign: "center",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "10px",
  },
  profileImage: {
    width: "80%",
    height: "80%",
    borderRadius: "0",
  },
  menuSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuItem: {
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
  },
  tooltip: {
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
  },
  bottomSection: {
    paddingBottom: "5px",
    paddingRight: "15px",
    paddingLeft: "5px",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "85%",
  },
  topRightSection: {
    height: "8%",
    background: "#898A8D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topRightText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    background: "#fff",
  },
});
