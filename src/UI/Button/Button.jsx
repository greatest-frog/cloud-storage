import React from "react";

import styles from "./Button.module.css";

const Button = ({ callback, children }) => {
  return (
    <button onClick={callback} className={styles.button}>
      {children}
    </button>
  );
};

export default React.memo(Button);
