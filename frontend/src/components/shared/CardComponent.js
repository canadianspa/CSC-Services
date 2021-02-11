import React from "react";
import styles from "./Shared.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Card({ name, header, text, description, children, index, onDeleteClick }) {
  return (
    <div className={styles.card}>
      {onDeleteClick ? (
        <div>
          <label>{header}</label>
          <button
            id={index}
            name={name}
            onClick={onDeleteClick}
            className={styles.iconButton}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ) : (
        <label>{header}</label>
      )}
      {text && <span className={styles.text}>{text}</span>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

export default Card;
