import React, { useRef } from "react";

import styles from "./Modal.module.css";

const Modal = ({ open, children, toggleOpen }) => {
  const modalRef = useRef();
  const closeRef = useRef();
  const handleClose = (e) => {
    if (e.target === modalRef.current || e.target === closeRef.current) {
      toggleOpen();
    }
  };

  return (
    open && (
      <div onClick={handleClose} ref={modalRef} className={styles.modal}>
        <div className={styles.window}>
          <div className={styles["close-wrapper"]}>
            <button
              onClick={handleClose}
              ref={closeRef}
              className={styles.close}
            ></button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
