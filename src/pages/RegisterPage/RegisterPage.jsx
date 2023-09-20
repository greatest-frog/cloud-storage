import React, { useCallback, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./RegisterPage.module.css";

const authConfig = {
  buttonPlaceholder: "Sign up",
  question: "Already have an account?",
  answer: "Sign in",
  answerLink: "/login",
  restore: false,
};

function RegisterPage() {
  const [user] = useAuthState(getAuth());
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e, email, password) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
      } catch (err) {
        if (err.toString().includes("email-already-in-use")) {
          setErrorMessage(
            "This email is already in use. Email can be used for Google account."
          );
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
    <div className={styles.RegisterPage}>
      <Auth
        buttonPlaceholder={authConfig.buttonPlaceholder}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        question={authConfig.question}
        answer={authConfig.answer}
        answerLink={authConfig.answerLink}
      />
    </div>
  );
}

export default RegisterPage;
