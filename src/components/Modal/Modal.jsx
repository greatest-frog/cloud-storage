/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from "react";

import styles from "./Modal.module.css";

function Modal({ children, toggleOpen }) {
  const modalRef = useRef();
  const closeRef = useRef();
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === modalRef.current || e.target === closeRef.current) {
      toggleOpen(e.target);
    }
  };

  return (
    <div
      onClick={handleClose}
      ref={modalRef}
      className={styles.Modal}
      style={{
        height: Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ),
      }}
    >
      <div className={styles["Modal-Window"]}>
        <div className={styles["Modal-CloseButtonWrapper"]}>
          <button
            onClick={handleClose}
            type="button"
            ref={closeRef}
            className={styles["Modal-CloseButton"]}
            aria-label="Close modal"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
