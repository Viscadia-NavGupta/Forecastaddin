import React, { useState } from "react";
import { useStyles9 } from "./UserRegistrationformstyles";

const UserRegistrationForm = ({ setPageValue }) => {
  const styles = useStyles9();

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
    setPageValue("Submitpage");
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
        <h2 className={styles.heading}>Inquiry Form</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="firstName">
              First name
            </label>
            <input className={styles.input} type="text" name="firstName" placeholder="First name" required />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="lastName">
              Last name
            </label>
            <input className={styles.input} type="text" name="lastName" placeholder="Last name" required />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">
              Email id
            </label>
            <input className={styles.input} type="email" name="email" placeholder="Email id" required />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="company">
              Company associated with
            </label>
            <input className={styles.input} type="text" name="company" placeholder="Company associated with" required />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="majorAreaOfWork">
              Major area of work
            </label>
            <input
              className={styles.input}
              type="text"
              name="majorAreaOfWork"
              placeholder="Major area of work"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="message">
              Leave a message
            </label>
            <textarea className={styles.textarea} name="message" placeholder="Leave a message" required />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Submit
            </button>
            <button className={styles.button} type="button" onClick={() => setPageValue("UserLogin")}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
