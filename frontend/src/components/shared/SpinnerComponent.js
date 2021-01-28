import React from "react";
import styles from "./Shared.module.css";

import { Spinner as ReactStrapSpinner } from "reactstrap";

function Spinner({ style }) {
  return <ReactStrapSpinner color="dark" className={styles.spinner} style={style} />;
}

export default Spinner;
