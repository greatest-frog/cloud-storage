/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import classNames from "classnames";

import getSize from "../../utils/functions/getSize";
import getDate from "../../utils/functions/getDate";
import getTime from "../../utils/functions/getTime";
import styles from "./FileLine.module.css";

import downloadPhoto from "./download.svg";
import deletePhoto from "./delete.svg";
import sharePhoto from "./share.svg";
import stopSharePhoto from "./share-off.svg";
import filePhoto from "./file.svg";

function FileLine({ file, setSR }) {
  const [user] = useAuthState(getAuth());
  const [userDownloadURL, setUserDownloadURL] = useState();
  const [metadata, setMetadata] = useState();
  const [shared, setShared] = useState();

  let isImage;
  if (file.name.split(".").length > 1) {
    const format = file.name.split(".")[file.name.split(".").length - 1];
    isImage = new Set(["gif", "ico", "jpg", "jpeg", "png", "svg"]).has(format);
  } else {
    isImage = false;
  }

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
      await deleteDoc(
        doc(collection(getFirestore(), "users", user.uid, "files"), file.name)
      );
      setSR(true);
    } catch (e) {
      console.log("delete", e);
    }
  }

  async function shareFile() {
    try {
      await updateDoc(
        doc(collection(getFirestore(), "users", user.uid, "files"), file.name),
        {
          open: true,
        }
      );
      setShared(true);
      window.open(
        `/cloud-storage/#/storage/users/${user.uid}/files/${file.name}`,
        "_blank"
      );
    } catch (e) {
      console.log("share", e);
    }
  }

  async function stopShareFile() {
    try {
      await updateDoc(
        doc(collection(getFirestore(), "users", user.uid, "files"), file.name),
        {
          open: false,
        }
      );
      setShared(false);
    } catch (e) {
      console.log("stop", e);
    }
  }

  useEffect(() => {
    async function a() {
      try {
        const data = await getDoc(
          doc(collection(getFirestore(), "users", user.uid, "files"), file.name)
        );

        if (data.exists()) {
          setShared(data.data().open);
        }
      } catch (e) {
        console.log("effect", e);
      }
    }
    if (user) {
      a();
    }
  }, [user, file.name]);

  return (
    <div className={styles.FileLine}>
      <div className={styles["FileLine-Info"]}>
        <div className={styles["FileLine-Preview"]}>
          <div className={styles["FileLine-Photo"]}>
            {isImage ? (
              <img
                src={userDownloadURL || filePhoto}
                alt=""
                className={styles["FileLine-Pic"]}
              />
            ) : (
              <img src={filePhoto} alt="" className={styles["FileLine-Icon"]} />
            )}
          </div>
          <div className={styles["FileLine-Name"]}>
            {file.name.length > 10 ? `${file.name.slice(0, 11)}...` : file.name}{" "}
          </div>
        </div>
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
          title="Скачать или открыть файл"
        >
          <img
            src={downloadPhoto}
            alt="Скачать или открыть файл"
            className={styles["FileLine-Icon"]}
          />
        </a>
        <button
          type="button"
          className={classNames(
            styles["FileLine-Delete"],
            styles["FileLine-Button"]
          )}
          title="Удалить файл"
          onClick={deleteFile}
        >
          <img
            src={deletePhoto}
            alt="Удалить файл"
            className={styles["FileLine-Icon"]}
          />
        </button>
        <button
          type="button"
          className={classNames(
            styles["FileLine-Share"],
            styles["FileLine-Button"]
          )}
          title="Поделиться файлом"
          onClick={shareFile}
        >
          <img
            src={sharePhoto}
            alt="Поделиться файлом"
            className={styles["FileLine-Icon"]}
          />
        </button>
        {shared && (
          <button
            type="button"
            className={classNames(
              styles["FileLine-StopShare"],
              styles["FileLine-Button"]
            )}
            title="Не делиться файлом"
            onClick={stopShareFile}
          >
            <img
              src={stopSharePhoto}
              alt="Не делиться файлом"
              className={styles["FileLine-Icon"]}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(FileLine);
