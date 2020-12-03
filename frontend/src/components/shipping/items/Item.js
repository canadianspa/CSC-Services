import React from "react";
import "./ShippingItemsPage.css";

function Item({ item, onClick, formState }) {
  const { name, _id } = item;

  return (
    <span
      className={_id === formState._id ? "item-selected item" : "item"}
      onClick={() => onClick(item)}
    >
      {name}
    </span>
  );
}

export default Item;
