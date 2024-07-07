// UserRegistrationForm.jsx
import React from "react";
import { useStyles10 } from "./submitpagestyles";

const Submitpage = ({ setPageValue }) => {
  const styles = useStyles10();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      majorAreaOfWork: formData.get("majorAreaOfWork"),
      message: formData.get("message"),
    };
    console.log(data); // Send this data to your backend
  };

  return (
    <div>
      <div className={styles.usernameInputContainer}>
        <img src="/../assets/viscadialogo.png" alt="Viscadia Logo" className={styles.logo} />
        <div className={styles.themeBorder}>
          <div className={styles.whiterec}></div>
          <div className={styles.redrec}></div>
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.heading}>
          Thank you for submitting your request! Our team is reviewing it and will get back to you shortly. We
          appreciate your patience.
        </h2>
        <div>
          <button className={styles.button} type="button" onClick={() => setPageValue("UserLogin")}>
            Login Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submitpage;
