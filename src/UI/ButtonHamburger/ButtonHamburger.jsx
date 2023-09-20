import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./ButtonHamburger.module.css";

function ButtonHamburger({ toggleOpen, open }) {
  return (
    <button
      onClick={toggleOpen}
      type="button"
      className={styles.ButtonHamburger}
    >
      <div
        className={classNames(
          styles["ButtonHamburger-Line"],
          styles["ButtonHamburger-Line_position_first"],
          open
            ? styles["ButtonHamburger-Line_status_open"]
            : styles["ButtonHamburger-Line_status_closed"]
        )}
        data-testid="burger-line"
      />
      <div
        className={classNames(
          styles["ButtonHamburger-Line"],
          styles["ButtonHamburger-Line_position_second"],
          open
            ? styles["ButtonHamburger-Line_status_open"]
            : styles["ButtonHamburger-Line_status_closed"]
        )}
        data-testid="burger-line"
      />
      <div
        className={classNames(
          styles["ButtonHamburger-Line"],
          styles["ButtonHamburger-Line_position_third"],
          open
            ? styles["ButtonHamburger-Line_status_open"]
            : styles["ButtonHamburger-Line_status_closed"]
        )}
        data-testid="burger-line"
      />
      <div
        className={classNames(
          styles["ButtonHamburger-Line"],
          styles["ButtonHamburger-Line_position_fourth"],
          open
            ? styles["ButtonHamburger-Line_status_open"]
            : styles["ButtonHamburger-Line_status_closed"]
        )}
        data-testid="burger-line"
      />
    </button>
  );
}

export default ButtonHamburger;

ButtonHamburger.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
