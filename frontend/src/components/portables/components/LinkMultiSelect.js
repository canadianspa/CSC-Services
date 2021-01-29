import React, { useState } from "react";
import styles from "./LinkMultiSelect.module.css";

import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LinkMultiSelect({ name, links, onDelete, prefix }) {
  const onDeleteClick = (event) => {
    const { id } = event.currentTarget;

    handleChange(
      links.filter((link, index) => {
        return index !== parseInt(id);
      })
    );
  };

  function handleChange(value) {
    var event = {
      target: {
        name: name,
        value: value,
      },
    };
    onDelete(event);
  }

  return (
    <div>
      {links.map((link, index) => {
        var path = link.split("/");
        var id = path[path.length - 1];

        return (
          <div key={index} className={styles.linkWrapper}>
            <a href={link}>
              {prefix}
              {id}
            </a>
            <button id={index} onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default LinkMultiSelect;
