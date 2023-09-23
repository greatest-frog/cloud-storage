import React, { useCallback, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import Auth from "../../components/Auth/Auth";
import styles from "./RegisterPage.module.css";

const authConfig = {
  buttonPlaceholder: "Зарегистрироваться",
  question: "Уже есть аккаунт?",
  answer: "Войти",
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
            "Этот email уже используется. Email может использоваться для гугл аккаунта."
          );
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
