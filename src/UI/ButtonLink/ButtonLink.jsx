import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./ButtonLink.module.css";

function ButtonLink({ to, children }) {
  return (
    <div className={styles.ButtonLink}>
      <Link to={to} className={styles["ButtonLink-Link"]}>
        {children}
      </Link>
    </div>
  );
}

export default React.memo(ButtonLink);

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
