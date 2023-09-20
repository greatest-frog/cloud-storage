import React, { useCallback, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./LoginPage.module.css";

const authConfig = {
  buttonPlaceholder: "Sign in",
  question: "Don't have an account?",
  answer: "Sign up",
  answerLink: "/register",
  restore: true,
};

function LoginPage() {
  const [user] = useAuthState(getAuth());
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e, email, password) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (err) {
        const errorString = err.toString();
        if (
          errorString.includes("wrong-password") ||
          errorString.includes("user-not-found")
        ) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("Error. Please try later.");
        }
      }
    },
    [setErrorMessage]
  );

  if (user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.LoginPage}>
      <Auth
        buttonPlaceholder={authConfig.buttonPlaceholder}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        question={authConfig.question}
        answer={authConfig.answer}
        answerLink={authConfig.answerLink}
        isRestoreMessage
      />
    </div>
  );
}

export default LoginPage;
