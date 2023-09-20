import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";

import ButtonLink from "../../UI/ButtonLink/ButtonLink";
import ImageSection from "../../UI/ImageSection/ImageSection";
import styles from "./HomePage.module.css";

function HomePage() {
  const [user] = useAuthState(getAuth());

  if (user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.HomePage}>
      <section className={styles["HomePage-MainArticle"]}>
        <h1 className={styles["HomePage-MainHeading"]}>
          Access to your files from anywhere in the world.
        </h1>
        <p className={styles["HomePage-MainParagraph"]}>
          Share data with friends and colleagues, access files anytime,
          anywhere.
        </p>
        <ButtonLink to="register">Start using now</ButtonLink>
      </section>
      <ul className={classNames(styles["HomePage-SectionsList"], "list")}>
        <li className={styles["HomePage-Section"]}>
          <ImageSection
            heading="Share files"
            text="Share files with a link or create shared folders"
            image={
              <img
                src={`${process.env.PUBLIC_URL}/resources/images/share.svg`}
                alt="File share"
              />
            }
          />
        </li>
        <li className={styles["HomePage-Section"]}>
          <ImageSection
            heading="Don't worry about files"
            text="Your files will not be lost and will always be available"
            image={
              <img
                src={`${process.env.PUBLIC_URL}/resources/images/secure.svg`}
                alt="File security"
              />
            }
          />
        </li>
        <li className={styles["HomePage-Section"]}>
          <ImageSection
            heading="Store a lot of information"
            text="Store as many photos, videos, documents as you want"
            image={
              <img
                src={`${process.env.PUBLIC_URL}/resources/images/server.svg`}
                alt="A lot of information"
              />
            }
          />
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
