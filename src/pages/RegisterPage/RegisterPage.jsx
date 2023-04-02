import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [user] = useAuthState(getAuth());

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (err) {
      if (err.toString().includes("email-already-in-use")) {
        setSettings({
          ...settings,
          errorMessage:
            "This email is already in use. Email can be used for Google account.",
        });
      } else {
        setSettings({ ...settings, errorMessage: "Error. Please try later." });
      }
    }
  };

  const [settings, setSettings] = useState({
    buttonPlaceholder: "Sign up",
    handleSubmit,
    question: "Already have an account?",
    answer: "Sign in",
    answerLink: "/login",
    restore: false,
  });

  if (!!user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.register}>
      <Auth settings={settings} />
    </div>
  );
};

export default RegisterPage;
