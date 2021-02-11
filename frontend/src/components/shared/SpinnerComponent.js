import React from "react";
import styles from "./Shared.module.css";

import { Spinner as ReactStrapSpinner } from "reactstrap";

function Spinner({}) {
  return <ReactStrapSpinner color="dark" className={styles.spinner} />;
}

export default Spinner;
