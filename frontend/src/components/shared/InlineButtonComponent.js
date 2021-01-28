import React from "react";
import styles from "./Shared.module.css";

function InlineButtonComponent({ children, style }) {
  return (
    <div
      className={children.length > 1 ? styles.inlineButton : styles.centeredButton}
      style={style}
    >
      {children}
    </div>
  );
}

export default InlineButtonComponent;
