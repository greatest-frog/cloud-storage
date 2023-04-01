import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";

import styles from "./Auth.module.css";

const Auth = ({ settings }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
    } catch (err) {
      console.log(err);
      return redirect("/");
    }
    return redirect("/storage");
  };

  return (
    <div className={styles.auth}>
      <form
        onSubmit={() => settings.handleSubmit(email, password)}
        className={styles.form}
      >
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Please fill in the email in format: mail@mailservice.domain"
            required
          />
        </label>

        {settings.errorMessage && (
          <div className={styles.error}>{settings.errorMessage}</div>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {settings.restore && (
          <div className={styles.restore}>
            Forgot your password? <Link to="/restore">Restore it</Link>.
          </div>
        )}
        <button type="submit">{settings.buttonPlaceholder}</button>
      </form>
      <span>
        {settings.question}{" "}
        {<Link to={settings.answerLink}>{settings.answer}</Link>}.
      </span>
      <div className={styles["service-wrapper"]}>
        <button onClick={googleSignIn} className={styles.service}>
          <div className={styles.google}></div>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default React.memo(Auth);
