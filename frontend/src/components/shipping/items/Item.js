import React from "react";
import "./ShippingItemsPage.css";

function Item({ item, onClick, formState }) {
  const { name, _id } = item;

  return (
    <span
      className={item._id === formState._id ? "item-selected item" : "item"}
      id={_id}
      onClick={() => onClick(item)}
    >
      {name}
    </span>
  );
}

export default Item;
