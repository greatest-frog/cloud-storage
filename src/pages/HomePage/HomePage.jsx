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
          Доступ к вашим файлам в любой точке мира.
        </h1>
        <p className={styles["HomePage-MainParagraph"]}>
          Делитесь данными с друзьями и коллегами, доступ к файлам всегда,
          везде.
        </p>
        <ButtonLink to="register">Начать использовать</ButtonLink>
      </section>
      <ul className={classNames(styles["HomePage-SectionsList"], "list")}>
        <li className={styles["HomePage-Section"]}>
          <ImageSection
            heading="Делитесь файлами"
            text="Делитесь файлами по ссылке"
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
            heading="Не волнуйтесь о файлах"
            text="Ваши файлы не потеряются и будут доступны везде"
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
            heading="Храните множество информации"
            text="Храните столько фотографий, видео и документов, сколько хотите"
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
