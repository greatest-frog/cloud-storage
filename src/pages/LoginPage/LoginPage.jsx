import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [user] = useAuthState(getAuth());

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log("ok");
    } catch (err) {
      const errorString = err.toString();
      if (
        errorString.includes("wrong-password") ||
        errorString.includes("user-not-found")
      ) {
        setSettings({ ...settings, errorMessage: "Invalid email or password" });
      } else {
        setSettings({ ...settings, errorMessage: "Error. Please try later." });
      }
    }
  };

  const [settings, setSettings] = useState({
    buttonPlaceholder: "Sign in",
    handleSubmit,
    question: "Don't have an account?",
    answer: "Sign up",
    answerLink: "/register",
    restore: true,
  });

  if (!!user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.login}>
      <Auth settings={settings} />
    </div>
  );
};

export default LoginPage;
