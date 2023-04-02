import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import ButtonLink from "../../UI/ButtonLink/ButtonLink";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [user] = useAuthState(getAuth());

  if (!!user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.home}>
      <section className={styles.world}>
        <h1 className={styles.world_heading}>Access to your files from anywhere in the world.</h1>
        <p className={styles.world_paragraph}>
          Share data with friends and colleagues, access files anytime,
          anywhere.
        </p>
        <ButtonLink to="register">Start using now</ButtonLink>
      </section>
      {/* TODO Project advantages sections */}
    </div>
  );
};

export default HomePage;
