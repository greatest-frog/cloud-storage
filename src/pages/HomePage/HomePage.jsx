import React from "react";
import { Navigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [user] = useAuthState(getAuth());

  if (!!user) {
    return <Navigate to="/storage" />;
  }

  return (
    <div className={styles.home}>
      
    </div>
  );
};

export default HomePage;


