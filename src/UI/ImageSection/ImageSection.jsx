import React from "react";

import styles from "./ImageSection.module.css";

const ImageSection = ({ heading, text, image }) => {
  return (
    <section className={styles["image-section"]}>
      {
        <div role="img" className={styles.image}>
          {image}
        </div>
      }
      <div className={styles["image-section_content"]}>
        <h2 className={styles["image-section_heading"]}>{heading}</h2>
        <p className={styles["image-section_paragraph"]}>{text}</p>
      </div>
    </section>
  );
};

export default React.memo(ImageSection);
