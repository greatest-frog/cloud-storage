import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import ButtonLink from "../../UI/ButtonLink/ButtonLink";
import ImageSection from "../../UI/ImageSection/ImageSection";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [user] = useAuthState(getAuth());

  if (!!user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.home}>
      <section className={styles.world}>
        <h1 className={styles.world_heading}>
          Access to your files from anywhere in the world.
        </h1>
        <p className={styles.world_paragraph}>
          Share data with friends and colleagues, access files anytime,
          anywhere.
        </p>
        <ButtonLink to="register">Start using now</ButtonLink>
      </section>
      <div className={styles.sections}>
        <ImageSection
          heading="Share files"
          text="Share files with a link or create shared folders"
          image={
            <img
              src={process.env.PUBLIC_URL + "/resources/images/share.svg"}
              alt="File share"
            />
          }
        />
        <ImageSection
          heading="Don't worry about files"
          text="Your files will not be lost and will always be available"
          image={
            <img
              src={process.env.PUBLIC_URL + "/resources/images/secure.svg"}
              alt="File security"
            />
          }
        />
        <ImageSection
          heading="Store a lot of information"
          text="Store as many photos, videos, documents as you want"
          image={
            <img
              src={process.env.PUBLIC_URL + "/resources/images/server.svg"}
              alt="A lot of information"
            />
          }
        />
      </div>
    </div>
  );
};

export default HomePage;
