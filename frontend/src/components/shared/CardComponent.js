import React from "react";

function Card({ header, text }) {
  return (
    <div className="card">
      <label>{header}</label>
      <span>{text}</span>
    </div>
  );
}

export default Card;
