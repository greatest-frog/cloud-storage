import React from "react";
import PropTypes from "prop-types";

import styles from "./ImageSection.module.css";

function ImageSection({ heading, text, image }) {
  return (
    <section className={styles.ImageSection}>
      <div className={styles["ImageSection-ImageWrapper"]}>{image}</div>
      <div className={styles["ImageSection-Content"]}>
        <h2 className={styles["ImageSection-Heading"]}>{heading}</h2>
        <p className={styles["ImageSection-Paragraph"]}>{text}</p>
      </div>
    </section>
  );
}

export default React.memo(ImageSection);

ImageSection.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.element.isRequired,
};
