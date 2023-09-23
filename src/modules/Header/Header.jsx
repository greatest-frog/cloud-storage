import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";
import PropTypes from "prop-types";

import UserBanner from "../../UI/UserBanner/UserBanner";
import ButtonLink from "../../UI/ButtonLink/ButtonLink";
import Button from "../../UI/Button/Button";
import styles from "./Header.module.css";

function Header({ positionStatic }) {
  const [user] = useAuthState(getAuth());
  const [isScrolled, setIsScrolled] = useState(!!window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", () => setIsScrolled(!!window.scrollY));
    return () => {
      window.removeEventListener("scroll", () =>
        setIsScrolled(!!window.scrollY)
      );
    };
  });

  const signOutUser = useCallback(() => {
    signOut(getAuth());
  }, []);

  const userName = user?.displayName || user?.email?.split("@")[0];

  return (
    <header
      className={classNames(
        styles.Header,
        isScrolled && styles.bottomBorder,
        positionStatic && styles.static
      )}
    >
      <Link to="/" className={styles["Header-Name"]}>
        Frog Cloud
      </Link>
      <div className={styles["Header-Info"]}>
        {user ? (
          <>
            <div className={styles["Header-UserBannerWrapper"]}>
              <UserBanner photoURL={user.photoURL} name={userName} />
            </div>
            <Button onClick={signOutUser}>Выйти</Button>
          </>
        ) : (
          <ButtonLink to="/login">Войти</ButtonLink>
        )}
      </div>
    </header>
  );
}

export default React.memo(Header);

Header.defaultProps = {
  positionStatic: false,
};

Header.propTypes = {
  positionStatic: PropTypes.bool,
};
