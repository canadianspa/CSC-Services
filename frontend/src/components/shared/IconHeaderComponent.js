import React from "react";
import styles from "./Shared.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./HeaderComponent";

function IconHeaderComponent({ text, icon, name, onClick }) {
  return (
    <div className={styles.iconHeader}>
      <Header>{text}</Header>
      <button name={name} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}

export default IconHeaderComponent;
