import { makeStyles } from "@mui/styles";

export const useStyles9 = makeStyles({
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
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "15px",
  },
  heading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "22px",
    lineHeight: "160%",
    color: "#000000",
    marginBottom: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "160%",
    color: "#000000",
  },
  input: {
    width: "80%", // Make the input field take 80% width of the container
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "160%",
  },
  textarea: {
    width: "80%", // Make the textarea take 80% width of the container
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "160%",
    resize: "vertical",
    height: "100px",
  },
  buttonContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",

    // marginTop: "20px", // Adjust as needed
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
