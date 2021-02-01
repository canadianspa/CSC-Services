import React from "react";
import styles from "./Note.module.css";

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Note({ note }) {
  const { content, created_at } = note;

  var date = moment(created_at).format("MM:HH A, DD/MM/YYYY");

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
