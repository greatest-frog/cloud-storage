/* eslint-disable react/prop-types */
import React from "react";
import classNames from "classnames";

import styles from "./UploadMenu.module.css";

function UploadMenu({
  percent,
  status,
  pauseUploading,
  resumeUploading,
  cancelUploading,
}) {
  return (
    <div className={styles.UploadMenu}>
      <div className={styles["UploadMenu-Info"]}>
        <ul className={classNames(styles["UploadMenu-Functions"], "list")}>
          {status === "running" && (
            <li className={styles["UploadMenu-Function"]}>
              <button
                type="button"
                aria-label="pause uploading"
                className={classNames(
                  styles["UploadMenu-FunctionButton"],
                  styles["UploadMenu-FunctionButton_function_pause"]
                )}
                title="Поставить загрузку на паузу"
                onClick={pauseUploading}
              />
            </li>
          )}
          {status === "paused" && (
            <li className={styles["UploadMenu-Function"]}>
              <button
                type="button"
                aria-label="resume uploading"
                className={classNames(
                  styles["UploadMenu-FunctionButton"],
                  styles["UploadMenu-FunctionButton_function_resume"]
                )}
                title="Возобновить загрузку"
                onClick={resumeUploading}
              />
            </li>
          )}
          <li className={styles["UploadMenu-Function"]}>
            <button
              type="button"
              aria-label="cancel uploading"
              className={classNames(
                styles["UploadMenu-FunctionButton"],
                styles["UploadMenu-FunctionButton_function_cancel"]
              )}
              title="Прекратить загрузку"
              onClick={() => {
                resumeUploading();
                cancelUploading();
              }}
            />
          </li>
        </ul>
        <div className={styles["UploadMenu-Percent"]}>{percent || 0}%</div>
      </div>

      <progress
        className={styles["UploadMenu-Progress"]}
        value={percent || 0}
        max="100"
      />
    </div>
  );
}

export default React.memo(UploadMenu);
