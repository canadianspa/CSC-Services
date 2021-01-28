import React from "react";
import styles from "./Shared.module.css";

function Card({ header, text, description }) {
  return (
    <div className={styles.cardWrapper}>
      <label>{header}</label>
      <span>{text}</span>
      {description && <p>{description}</p>}
    </div>
  );
}

export default Card;
