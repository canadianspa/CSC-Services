import React from "react";
import styles from "./Shared.module.css";

function Header({ children, style, dark, padded }) {
  var className = styles.header;

  if (dark) {
    className += " " + styles.dark;
  }

  if (padded) {
    className += " " + styles.padded;
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export default Header;
