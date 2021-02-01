import React from "react";
import styles from "./LinkMultiSelect.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LinkMultiSelect({ name, links, onDelete }) {
  const onDeleteClick = (event) => {
    const { id } = event.currentTarget;

    var value = links.filter((link, index) => {
      return index !== parseInt(id);
    });

    handleChange(value);
  };

  function handleChange(value) {
    var event = {
      target: {
        name: name,
        value: value,
      },
      currentTarget: {
        name: name,
        value: value,
      },
    };
    onDelete(event);
  }

  return (
    <div>
      {links.map((link, index) => (
        <div key={index} className={styles.linkWrapper}>
          <a href={link.url}>{link.title}</a>
          <button id={index} onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinkMultiSelect;
