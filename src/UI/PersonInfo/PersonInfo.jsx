import React from "react";

import defaultPhoto from "./default.png";
import styles from "./PersonInfo.module.css";

const PersonInfo = ({ photoURL, name }) => {
  return (
    <div className={styles["person-info"]}>
      <img
        src={photoURL || defaultPhoto}
        alt="Avatar"
        className={styles.avatar}
      />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default React.memo(PersonInfo);
