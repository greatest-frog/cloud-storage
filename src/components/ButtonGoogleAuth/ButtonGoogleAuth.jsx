import React from "react";

import googleSignIn from "../../utils/functions/googleSignIn";
import styles from "./ButtonGoogleAuth.module.css";

function ButtonGoogleAuth() {
  return (
    <button
      type="button"
      className={styles.ButtonGoogleAuth}
      onClick={googleSignIn}
    >
      <div className={styles["ButtonGoogleAuth-Icon"]} role="img" alt="" />
      Войти с помощью Google
    </button>
  );
}

export default ButtonGoogleAuth;
