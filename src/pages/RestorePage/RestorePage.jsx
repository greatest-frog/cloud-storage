import React, { useCallback, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Modal from "../../components/Modal/Modal";
import styles from "./RestorePage.module.css";

function RestorePage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(getAuth(), email);
    } catch (err) {
      if (!err.toString().includes("user-not-found")) {
        setErrorMessage("Server Error. Please try later.");
      }
    } finally {
      setOpen(true);
    }
  };

  const toggleOpen = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className={styles.RestorePage}>
      <h1>Restore your password</h1>
      <form onSubmit={handleSubmit} className={styles["RestorePage-Form"]}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Please fill in the email in format: mail@mailservice.domain"
            required
          />
        </label>
        {errorMessage && (
          <div className={styles["RestorePage-ErrorMessage"]}>
            {errorMessage}
          </div>
        )}
        <button type="submit">Restore</button>
      </form>
      {open && (
        <Modal toggleOpen={toggleOpen}>
          <div className={styles["modal-message"]}>
            Check your mail, if the account is linked to this mail you will
            receive an email with a link to reset your password.
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RestorePage;
