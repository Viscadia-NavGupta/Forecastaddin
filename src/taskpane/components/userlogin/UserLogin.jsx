import React, { useState } from "react";
import { useStyles } from "./UserLoginStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";

function UserLogin({ handleLogin, setPageValue }) {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const styles = useStyles();

  const handleProceedClick = async () => {
    if (!username.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const result = await AWSConnections.getCognitoAccessToken(username, "overarching");

    if (result.success) {
      setErrorMessage("");
      sessionStorage.setItem("username", username);
      handleLogin(); // Call handleLogin from props
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className={styles.usernameInputContainer}>
      <img src="/../assets/viscadialogo.png" alt="Viscadia Logo" className={styles.logo} />
      <div className={styles.themeBorder}>
        <div className={styles.whiterec}></div>
        <div className={styles.redrec}></div>
      </div>
      <h2 className={styles.heading}>Viscadia Forecasting Platform</h2>
      <div className={styles.userProfileButton}>
        <button className={styles.userProfileButtonInner}>User Profile Information</button>
      </div>
      <div className={styles.rec}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            className={styles.inputContainerInput}
          />
          <div className={styles.helperTextContainer}>
            <span className={styles.inputHelperText}>Display username in Excel*</span>
            <button className={styles.contactUsButton} onClick={() => setPageValue("ContactUs")}>Contact Us</button>
          </div>
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
        <div>
          <button className={styles.buttonfButton} onClick={handleProceedClick}>
            Proceed →
          </button>
        </div>
      </div>
      <footer className={styles.footer}>© 2024 Viscadia. All rights reserved.</footer>
    </div>
  );
}

export default UserLogin;
