import React, { useEffect, useState } from "react";
import { getStorage, list, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import FileLine from "../../components/FileLine/FileLine";
import styles from "./Workspace.module.css";

function Workspace({ shouldRerender, setSR }) {
  const [user] = useAuthState(getAuth());
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    async function getFiles() {
      if (user) {
        if (shouldRerender) {
          const page = await list(ref(getStorage(), `user/${user?.uid}`), {
            maxResults: 100,
          });
          setUserFiles(page.items);
          setSR(false);
        } else {
          const page = await list(ref(getStorage(), `user/${user?.uid}`), {
            maxResults: 100,
          });
          setUserFiles(page.items);
        }
      }
    }
    getFiles();
  }, [user, shouldRerender, setSR]);

  return (
    <div className={styles.Workspace}>
      <div className={styles["Workspace-Info"]}>
        <h2 className={styles["Workspace-Title"]}>Files</h2>
      </div>
      {!!userFiles.length && (
        <ul className={styles["Workspace-Files"]}>
          {userFiles.map((userFile) => (
            <li className="list" key={userFile.toString()}>
              <FileLine file={userFile} setSR={setSR} />
            </li>
          ))}
        </ul>
      )}
      {!userFiles.length && (
        <div className={styles["Workspace-NoFiles"]}>No files</div>
      )}
    </div>
  );
}

export default React.memo(Workspace);
