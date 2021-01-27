import React from "react";
import "./Shared.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";

function IconButton({ name, icon, onClick }) {
  return (
    <Button name={name} onClick={onClick} className="icon-button">
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}

export default IconButton;
