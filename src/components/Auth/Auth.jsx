import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";
import ButtonGoogleAuth from "../ButtonGoogleAuth/ButtonGoogleAuth";
import styles from "./Auth.module.css";

function Auth({
  handleSubmit,
  errorMessage,
  isRestoreMessage,
  buttonPlaceholder,
  question,
  answer,
  answerLink,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.Auth}>
      <form
        onSubmit={(e) => handleSubmit(e, email, password)}
        className={styles["Auth-Form"]}
      >
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
          <div className={styles["Auth-ErrorMessage"]}>{errorMessage}</div>
        )}
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {isRestoreMessage && (
          <div className={styles["Auth-RestoreMessage"]}>
            Forgot your password? <Link to="/restore">Restore it</Link>.
          </div>
        )}
        <Button>{buttonPlaceholder}</Button>
      </form>
      {question && (
        <div className={styles["Auth-Question"]}>
          {question} <Link to={answerLink}>{answer}</Link>.
        </div>
      )}
      <div className={styles["Auth-ServiceWrapper"]}>
        <ButtonGoogleAuth />
      </div>
    </div>
  );
}

export default React.memo(Auth);

Auth.defaultProps = {
  errorMessage: "",
  isRestoreMessage: false,
  question: "",
  answerLink: "",
  answer: "",
};

Auth.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isRestoreMessage: PropTypes.bool,
  buttonPlaceholder: PropTypes.string.isRequired,
  question: PropTypes.string,
  answerLink: PropTypes.string,
  answer: PropTypes.string,
};
