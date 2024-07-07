// UserRegistrationFormStyles.jsx
import { makeStyles } from "@mui/styles";

export const useStyles10 = makeStyles({
  logo: {
    width: "250px",
    height: "80px",
    marginBottom: "10px",
    marginTop: "20px", // Adjust as needed
  },

  usernameInputContainer: {
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  themeBorder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "6px",
  },
  redrec: {
    // position: "absolute",
    width: "50%",
    height: "100%",
    // left: "221px",
    background: "#C1C5C8",
  },
  whiterec: {
    width: "50%",
    height: "100%",
    background: "#BD302B",
  },
  rec: {
    position: "absolute",
    width: "344px",
    height: "189px",
    left: "calc(50% - 344px/2 + 0.5px)",
    top: "277px",
    background: "#FFFFFF",
    boxShadow: "0px 1px 4.6px rgba(0, 0, 0, 0.15)",
    borderRadius: "20px",
  },
  container: {
    position: "relative",
    width: "85%",
    minHeight: "100vh",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "40px",
  },
  heading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "22px",
    lineHeight: "160%",
    color: "#000000",
    marginBottom: "40px",
    alignItems: "center",
  },

  inputContainer: {
    marginBottom: "15px",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "113px",
    height: "31px",
    background: "#0081C5",
    borderRadius: "32px",
    color: "white",
    fontFamily: "'Roboto', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "160%",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0f2c4b",
    },
    marginRight: "25px", // Added space between buttons
    marginLeft:"15px",
  },
  });
