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
        setErrorMessage("Ошибка сервера, попробуйте позже.");
      }
    } finally {
      setOpen(true);
    }
  };

  const toggleOpen = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className={styles.RestorePage}>
      <h1 className={styles["RestorePage-Heading"]}>Восстановление пароля</h1>
      <form onSubmit={handleSubmit} className={styles["RestorePage-Form"]}>
        <label htmlFor="email">
          Почта
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Заполните в формате: mail@mailservice.domain"
            required
          />
        </label>
        {errorMessage && (
          <div className={styles["RestorePage-ErrorMessage"]}>
            {errorMessage}
          </div>
        )}
        <button type="submit">Восстановить</button>
      </form>
      {open && (
        <Modal toggleOpen={toggleOpen}>
          <div className={styles["modal-message"]}>
            Проверьте свою почту, если аккаунт привязан к этой почте, то вы
            получите письмо с ссылкой для сброса пароля.
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RestorePage;
