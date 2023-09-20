import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className="Footer-Text">Project by greatest-frog</div>
      <a
        href="https://github.com/greatest-frog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.PUBLIC_URL}/resources/images/github-mark.svg`}
          alt="GitHub"
          className={styles["Footer-Logo"]}
        />
      </a>
    </footer>
  );
}

export default Footer;
