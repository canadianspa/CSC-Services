import React from "react";
import styles from "./Shared.module.css";

function SubHeader({ children, dark, style }) {
  return (
    <div
      className={dark ? styles.subHeader + " " + styles.dark : styles.subHeader}
      style={style}
    >
      {children}
    </div>
  );
}

export default SubHeader;
