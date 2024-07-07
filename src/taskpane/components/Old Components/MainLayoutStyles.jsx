import { makeStyles } from "@mui/styles";

export const useStyles11 = makeStyles({
  layout: {
    display: "flex",
    height: "100%",
  },
  sidebar: {
    width: "15%",
    background: "#BD302B",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "85%",
  },
  topRightSection: {
    height: "8vh",
    background: "#898A8D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topRightText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
  },
  mainContent: {
    // flex: 1,
    background: "#fff",
    overflowY: "auto",
    padding: "20px",
  },
});
