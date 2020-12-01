import React from "react";
import "./ShippingItemsPage.css";

function Item({ item, onClick, formState }) {
  const { name } = item;

  return (
    <span
      className={item._id === formState._id ? "item-selected item" : "item"}
      onClick={() => onClick(item)}
    >
      {name}
    </span>
  );
}

export default Item;
