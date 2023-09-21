import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import ButtonUpload from "../../components/ButtonUpload/ButtonUpload";
import ButtonHamburger from "../../UI/ButtonHamburger/ButtonHamburger";
import UploadMenu from "../../components/UploadMenu/UploadMenu";
import styles from "./StorageBar.module.css";
import Modal from "../../components/Modal/Modal";

function StorageBar({ setSR }) {
  const [sideOpen, setSideOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [uploadTask, setUploadTask] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  const [uploadStatus, setUploadStatus] = useState("not started");

  useEffect(() => {
    if (uploadTask?.on) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);
          if (progress !== uploadProgress) {
            setUploadProgress(progress);
          }
          switch (snapshot.state) {
            case "paused":
              setUploadStatus("paused");
              break;
            case "running":
              setUploadStatus("running");
              break;
            default:
              break;
          }
        },
        () => {
          setUploadStatus("not started");
          setUploadTask();
          setModalOpen(true);
        },
        () => {
          setUploadStatus("not started");
          setUploadTask();
          setUploadProgress(0);
          setSR(true);
        }
      );
    }
  }, [uploadTask, uploadProgress, setSR]);

  const changeUploadTask = useCallback((upload) => {
    setUploadTask(upload);
  }, []);

  const pauseUploading = useCallback(() => uploadTask.pause(), [uploadTask]);
  const resumeUploading = useCallback(() => uploadTask.resume(), [uploadTask]);
  const cancelUploading = useCallback(() => uploadTask.cancel(), [uploadTask]);

  const sideRef = useRef();
  sideRef.current = sideOpen;

  const toggleOpen = useCallback(
    () => setSideOpen(!sideRef.current),
    [setSideOpen]
  );

  const modalRef = useRef();
  modalRef.current = modalOpen;

  const toggleModalOpen = useCallback(
    () => setModalOpen(!modalRef.current),
    [setModalOpen]
  );

  return (
    <aside
      className={classNames(
        styles.StorageMenu,
        sideOpen && styles.StorageMenu_position_over
      )}
    >
      <div className={styles["StorageMenu-ButtonWrapper"]}>
        <ButtonHamburger open={sideOpen} toggleOpen={toggleOpen} />
      </div>
      <ul className={classNames(styles["StorageMenu-Options"], "list")}>
        <li className={styles["StorageMenu-Option"]}>
          {uploadStatus === "not started" && (
            <ButtonUpload changeUploadTask={changeUploadTask} />
          )}
        </li>
        <li className={styles["StorageMenu-Option"]}>
          {uploadStatus !== "not started" && (
            <UploadMenu
              status={uploadStatus}
              percent={uploadProgress}
              pauseUploading={pauseUploading}
              resumeUploading={resumeUploading}
              cancelUploading={cancelUploading}
            />
          )}
        </li>
        {modalOpen &&
          createPortal(
            <Modal toggleOpen={toggleModalOpen}>Error, please try later</Modal>,
            document.body
          )}
      </ul>
    </aside>
  );
}

export default StorageBar;
