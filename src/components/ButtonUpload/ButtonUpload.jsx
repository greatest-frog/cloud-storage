import React from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import uploadSVG from "./upload.svg";
import styles from "./ButtonUpload.module.css";

function ButtonUpload({ changeUploadTask }) {
  const [user] = useAuthState(getAuth());
  const handleFileListChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = `user/${user?.uid}/${file.name}`;
      const uploadRef = ref(getStorage(), filePath);
      changeUploadTask(uploadBytesResumable(uploadRef, file), file.name);
    }
  };

  return (
    <label
      htmlFor="upload"
      title="Upload files"
      className={styles.ButtonUpload}
    >
      <img src={uploadSVG} alt="" className={styles["ButtonUpload-Icon"]} />
      <span className={styles["ButtonUpload-Title"]}>Upload</span>
      <input
        type="file"
        id="upload"
        data-testid="FileInput"
        onChange={(event) => handleFileListChange(event)}
        className={styles["ButtonUpload-FileInput"]}
      />
    </label>
  );
}

export default ButtonUpload;
