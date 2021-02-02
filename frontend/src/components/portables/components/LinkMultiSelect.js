import React from "react";
import styles from "./LinkMultiSelect.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LinkMultiSelect({ name, links, onDelete }) {
  return (
    <div>
      {links.map((link, index) => (
        <div key={index} className={styles.linkWrapper}>
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.title}
          </a>
          <button name={name} id={index} onClick={onDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinkMultiSelect;
