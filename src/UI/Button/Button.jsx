/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={styles.Button}>
      {children}
    </button>
  );
}

export default React.memo(Button);

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
