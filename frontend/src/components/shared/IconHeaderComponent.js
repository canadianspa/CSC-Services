import React from "react";
import styles from "./Shared.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./HeaderComponent";

function IconHeaderComponent({ children, icon, name, onClick, style }) {
  return (
    <div className={styles.iconHeader} style={style}>
      <Header>{children}</Header>
      <button name={name} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}

export default IconHeaderComponent;
