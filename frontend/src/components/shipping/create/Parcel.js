import React from "react";
import "./ParcelsSelect.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Parcel({ parcel, index, onClick }) {
  return (
    <span className="parcel-box">
      <span>
        {parcel.quantity} x {parcel.name}
      </span>
      <button className="icon-button" name="delete" id={index} onClick={onClick}>
        <FontAwesomeIcon icon="times" />
      </button>
    </span>
  );
}

export default Parcel;
