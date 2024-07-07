import { makeStyles } from "@fluentui/react-components";

export const useStyles1 = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
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
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BD302B",
    borderRadius: "25px",
    width: "150px",
    height: "150px", // Adjust the height as needed
    padding: "8%",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "160%",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    border: "none",
    "&:hover": {
      backgroundColor: "#9B241E",
    },
  },
  icon: {
    // marginBottom: "15px", // Increase the margin between the icon and text
    // width: "46px", // Increase the icon size by 15%
    // height: "46px",
    backgroundColor: "transparent", // Ensure icon background is transparent
  },
  fontText: {
    marginTop: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "140%",
    color: "#FFFFFF",
    whiteSpace: "nowrap", // Ensure the text stays on one line
  },
  backButton: {
    padding: "12px 50px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    color: "#FFFFFF",
    backgroundColor: "#0081C5",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#005f99",
    },
  },
});
