import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import StorageBar from "../../modules/StorageBar/StorageBar";
import Workspace from "../../modules/Workspace/Workspace";
import Modal from "../../components/Modal/Modal";
import styles from "./StoragePage.module.css";

function StoragePage() {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(getAuth());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, navigate, isLoading]);

  const toggleOpen = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className={styles.Storage}>
      <StorageBar />
      <Workspace />
      {open && <Modal toggleOpen={toggleOpen} />}
    </div>
  );
}

export default StoragePage;
