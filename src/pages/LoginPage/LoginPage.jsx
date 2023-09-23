import React, { useCallback, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./LoginPage.module.css";

const authConfig = {
  buttonPlaceholder: "Войти",
  question: "Нет аккаунта?",
  answer: "Зарегистрироваться",
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
          setErrorMessage("Неверная почта или пароль");
        } else {
          setErrorMessage("Ошибка, попробуйте позже.");
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
