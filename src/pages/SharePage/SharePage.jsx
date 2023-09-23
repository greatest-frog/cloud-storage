import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, getMetadata, getStorage, ref } from "firebase/storage";

import getDate from "../../utils/functions/getDate";
import getTime from "../../utils/functions/getTime";
import getSize from "../../utils/functions/getSize";
import styles from "./SharePage.module.css";

import filePhoto from "./file.svg";

function SharePage() {
  const { userId, fileName } = useParams();
  const [userDownloadURL, setUserDownloadURL] = useState();
  const [metadata, setMetadata] = useState();
  const [no, setNo] = useState();

  let isImage;
  if (fileName.split(".").length > 1) {
    const format = fileName.split(".")[fileName.split(".").length - 1];
    isImage = new Set(["gif", "ico", "jpg", "jpeg", "png", "svg"]).has(format);
  } else {
    isImage = false;
  }

  useEffect(() => {
    if (userId && fileName) {
      getDownloadURL(ref(getStorage(), `user/${userId}/${fileName}`))
        .then((URL) => setUserDownloadURL(URL))
        .catch(() => setNo(true));
      getMetadata(ref(getStorage(), `user/${userId}/${fileName}`))
        .then((meta) => {
          setMetadata(meta);
        })
        .catch();
    }
  }, [fileName, userId]);

  return (
    <div className={styles.SharePage}>
      <div className={styles["SharePage-Info"]}>
        <div className={styles["SharePage-Name"]}>{fileName}</div>
        <div className={styles["SharePage-Meta"]}>
          {metadata && (
            <>
              <div className={styles["SharePage-Date"]}>
                {getDate(metadata.updated || metadata.timeCreated)}
              </div>
              <div className={styles["SharePage-Time"]}>
                {getTime(metadata.updated || metadata.timeCreated)}
              </div>
              <div className={styles["SharePage-Size"]}>
                {getSize(metadata.size)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles["SharePage-Photo"]}>
        {isImage ? (
          <img
            src={userDownloadURL || filePhoto}
            alt=""
            className={styles["SharePage-Pic"]}
          />
        ) : (
          <img src={filePhoto} alt="" className={styles["SharePage-Icon"]} />
        )}
      </div>
      {no ? (
        "No permission"
      ) : (
        <a
          className={styles["SharePage-Download"]}
          href={userDownloadURL}
          title="Download or open file"
        >
          Download
        </a>
      )}
    </div>
  );
}

export default SharePage;
