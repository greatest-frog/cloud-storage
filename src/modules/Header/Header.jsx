import React from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";

import PersonInfo from "../../UI/PersonInfo/PersonInfo";
import styles from "./Header.module.css";
import ButtonLink from "../../UI/ButtonLink/ButtonLink";
import Button from "../../UI/Button/Button";

const Header = ({ border }) => {
  const [user] = useAuthState(getAuth());

  const signOutUser = async () => {
    signOut(getAuth());
    return <Navigate to="/" />;
  };

  return (
    <header
      className={classNames(
        styles.header,
        border ? styles.border : styles["no-border"]
      )}
    >
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
            <Button callback={signOutUser}>Log out</Button>
          </>
        ) : (
          <ButtonLink to="/login">Login</ButtonLink>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
