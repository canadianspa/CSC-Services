import React from "react";
import styles from "./Shared.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton({ name, icon, onClick }) {
  return (
    <button name={name} onClick={onClick} className={styles.iconButton}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default IconButton;
