import React from "react";

function Card({ header, text, description }) {
  return (
    <div className="card-wrapper">
      <label>{header}</label>
      <span>{text}</span>
      {description && <p>{description}</p>}
    </div>
  );
}

export default Card;
