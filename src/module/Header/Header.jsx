import React from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import PersonInfo from "../../UI/PersonInfo/PersonInfo";
import styles from "./Header.module.css";

const Header = () => {
  const [user] = useAuthState(getAuth());

  const signOutUser = async () => {
    signOut(getAuth());
    return <Navigate to="/" />;
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.naming}>
        Frog Cloud
      </Link>
      <div className={styles.info}>
        {!!user ? (
          <>
            <PersonInfo
              photoURL={user.photoURL}
              name={user.displayName || user.email.split("@")[0]}
            />
            <button onClick={signOutUser} className={styles["log-out"]}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className={styles["to-login"]}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
