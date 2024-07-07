// LoadingCircle.jsx
import React from "react";
import { useStylesloading } from "./LoadingCirclestyles";

const LoadingCircle = () => {
  const styles = useStylesloading();

  return (
    <div className={styles.overlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingCircle}></div>
        <p className={styles.loadingMessage}>Running calculations...</p>
      </div>
    </div>
  );
};

export default LoadingCircle;
