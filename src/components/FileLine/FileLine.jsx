/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  deleteObject,
} from "firebase/storage";

import getSize from "../../utils/functions/getSize";
import getDate from "../../utils/functions/getDate";
import getTime from "../../utils/functions/getTime";
import styles from "./FileLine.module.css";

import downloadPhoto from "./download.svg";
import deletePhoto from "./delete.svg";
import sharePhoto from "./share.svg";

function FileLine({ file, setSR }) {
  const [userDownloadURL, setUserDownloadURL] = useState();
  const [metadata, setMetadata] = useState();
  useEffect(() => {
    getDownloadURL(ref(getStorage(), file.fullPath)).then((URL) =>
      setUserDownloadURL(URL)
    );
    getMetadata(ref(getStorage(), file.fullPath)).then((meta) => {
      setMetadata(meta);
    });
  }, [file]);

  async function deleteFile() {
    try {
      await deleteObject(ref(getStorage(), file.fullPath));
      setSR(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  return (
    <div className={styles.FileLine}>
      <div className={styles["FileLine-Info"]}>
        <div className={styles["FileLine-Name"]}>{file.name}</div>
        {metadata && (
          <div className={styles["FileLine-Meta"]}>
            <div className={styles["FileLine-Date"]}>
              {getDate(metadata.updated || metadata.timeCreated)}
            </div>
            <div className={styles["FileLine-Time"]}>
              {getTime(metadata.updated || metadata.timeCreated)}
            </div>
            <div className={styles["FileLine-Size"]}>
              {getSize(metadata.size)}
            </div>
          </div>
        )}
      </div>
      <div className={styles["FileLine-Buttons"]}>
        <a
          className={styles["FileLine-Download"]}
          href={userDownloadURL}
          title="Download or open file"
        >
          <img src={downloadPhoto} alt="download or open file" />
        </a>
        <button
          type="button"
          className={styles["FileLine-Delete"]}
          title="Delete file"
          onClick={deleteFile}
        >
          <img src={deletePhoto} alt="delete file" />
        </button>
        <button
          type="button"
          className={styles["FileLine-Share"]}
          title="Share file"
        >
          <img src={sharePhoto} alt="share file" />
        </button>
      </div>
    </div>
  );
}

export default React.memo(FileLine);
