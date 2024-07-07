import React, { useState } from "react";
import { useStyles1 } from "./OncologyForecast";

function OncologyForecast({ setPageValue }) {
  const [username, setUsername] = useState("");
  const styles = useStyles1();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Oncology Forecast</h2>
      <div className={styles.buttonsContainer}>
        <div>
          <button className={styles.button} onClick={() => setPageValue("UserLogin")}>
            <div className={styles.icon}>
              <img src="assets/MM Logo.png" alt="Model Management" />
              <span className={styles.fontText}>Model Management</span>
            </div>
          </button>
        </div>
        <div>
          <button className={styles.button} onClick={() => setPageValue("ModelManagementPage")}>
            <img src="assets/ACE.png" alt="ACE Management" className={styles.icon} />
            <span className={styles.fontText}>ACE Management</span>
          </button>
        </div>
        <div>
          <button className={styles.button} onClick={() => setPageValue("UserLogin")}>
            <img src="assets/Frame 10.png" alt="Outputs" className={styles.icon} />
            <span className={styles.fontText}>Outputs</span>
          </button>
        </div>
        <div>
          <button className={styles.button} onClick={() => setPageValue("UserLogin")}>
            <div className={styles.icon}>
              <img src="assets/Risk.png" alt="Risk Analytics" />
              <span className={styles.fontText}>Risk Analytics</span>
            </div>
          </button>
        </div>
      </div>
      <div>
        <button className={styles.backButton} onClick={() => setPageValue("UserLogin")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default OncologyForecast;
