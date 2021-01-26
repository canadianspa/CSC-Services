import React from "react";
import "./PortablesPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Note({ note }) {
  const { content, created_at } = note;

  return (
    <div className="note">
      <FontAwesomeIcon icon={faComment} size="lg" />
      <div className="note-content">
        <div>{content}</div>
        <span>{new Date(created_at).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Note;
