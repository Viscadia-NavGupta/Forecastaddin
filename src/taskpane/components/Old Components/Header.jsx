import * as React from "react";
import PropTypes from "prop-types";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  logo: {
    width: "250px",
    height: "80px",
    marginBottom: "10px",
    marginTop :"20px", // Adjust as needed
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
});

const Header = () => {
  const styles = useStyles();

  return (
    <div className={styles.usernameInputContainer}>
      <img src="assets/Screenshot 2024-03-28 171927.png" alt="Viscadia Logo" className={styles.logo} />
      <div className={styles.themeBorder}>
        <div className={styles.whiterec}></div>
        <div className={styles.redrec}></div>
      </div>
    </div>
  );
};

export default Header;
