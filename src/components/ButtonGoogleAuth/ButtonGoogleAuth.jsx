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
      Sign in with Google
    </button>
  );
}

export default ButtonGoogleAuth;
