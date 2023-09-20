import React from "react";
import PropTypes from "prop-types";

import defaultPhoto from "./default.png";
import styles from "./UserBanner.module.css";

function UserBanner({ photoURL, name }) {
  return (
    <figure className={styles.UserBanner}>
      <div className={styles["UserBanner-AvatarWrapper"]}>
        <img
          src={photoURL || defaultPhoto}
          alt="Avatar"
          className={styles["UserBanner-Avatar"]}
        />
      </div>
      <figcaption className={styles["UserBanner-Name"]}>{name}</figcaption>
    </figure>
  );
}

export default React.memo(UserBanner);

UserBanner.defaultProps = {
  photoURL: "",
};

UserBanner.propTypes = {
  photoURL: PropTypes.string,
  name: PropTypes.string.isRequired,
};
