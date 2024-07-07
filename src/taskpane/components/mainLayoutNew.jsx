import { makeStyles } from "@mui/styles";

export const useStyles20 = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  },
  topRightSection: {
    height: "8vh",
    background: "#898A8D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
  },
  topRightText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    height: "92vh", // Remaining height after the top section
    marginTop: "8vh", // To ensure content starts after the fixed header
  },
  sidebar: {
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
  },
  contentContainer: {
    flex: 1,
    // marginLeft: "15%",
    padding: "20px",
    overflowY: "auto",
    // backgroundColor: "#f5f5f5",
  },
  topSection: {
    textAlign: "center",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "10px",
  },
  profileImage: {
    width: "30px",
    height: "30px",
    borderRadius: "0",
    padding: "5px",
  },
});
