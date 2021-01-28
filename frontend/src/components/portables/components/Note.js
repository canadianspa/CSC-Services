import React from "react";
import styles from "./Note.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Note({ note }) {
  const { content, created_at } = note;

  var date = new Date(created_at).toLocaleString();

  return (
    <div className={styles.note}>
      <FontAwesomeIcon icon={faComment} />
      <div className={styles.noteContent}>
        <div>{content}</div>
        <span>{date}</span>
      </div>
    </div>
  );
}

export default Note;
