import React from "react";
import styles from "./Shared.module.css";

function Jumbotron({ children }) {
  return <div className={styles.jumbotron}>{children}</div>;
}

export default Jumbotron;
