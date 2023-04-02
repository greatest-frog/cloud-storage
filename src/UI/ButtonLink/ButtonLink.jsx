import React from "react";
import { Link } from "react-router-dom";

import styles from "./ButtonLink.module.css";

const ButtonLink = ({ to, children }) => {
  return (
    <div className={styles["link-wrapper"]}>
      <Link to={to} className={styles.link}>{children}</Link>
    </div>
  );
};

export default React.memo(ButtonLink);
