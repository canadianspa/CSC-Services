import React from "react";
import styles from "./Shared.module.css";

function Header({ children, dark, style }) {
  return (
    <div
      className={dark ? styles.header + " " + styles.dark : styles.header}
      style={style}
    >
      {children}
    </div>
  );
}

export default Header;
