import React, { useState, useRef } from "react";
import "./ParcelsSelect.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutsideClick } from "../../utils";
import Parcel from "./Parcel";

function ParcelsSelect({ items, parcels, updateFormState }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const empty = () => updateFormState([], "parcels");

  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, toggle);

  function onClick(event) {
    const { id, name } = event.currentTarget;

    var newItem = { ...items[id] };
    var updatedParcels = [...parcels];

    if (name === "add") {
      var index = updatedParcels.findIndex((item) => item._id === newItem._id);

      updateFormState(addParcel(updatedParcels, index, newItem), "parcels");
    } else if (name === "delete") {
      updateFormState(deleteParcel(updatedParcels, id), "parcels");
    }
  }

  function addParcel(updatedParcels, index, newItem) {
    if (index > -1) {
      updatedParcels[index].quantity += 1;
    } else {
      updatedParcels.push({ ...newItem, quantity: 1 });
    }
    return updatedParcels;
  }

  function deleteParcel(updatedParcels, index) {
    if (updatedParcels[index].quantity > 1) {
      updatedParcels[index].quantity -= 1;
    } else {
      updatedParcels.splice(index, 1);
    }
    return updatedParcels;
  }

  return (
    <div className="items-select">
      <div className={isOpen ? "items-bar open" : "items-bar"}>
        <div className="items-container">
          {parcels.map((parcel, index) => (
            <Parcel key={index} index={index} parcel={parcel} onClick={onClick} />
          ))}
        </div>
        <div className="filler" />
        <button className="icon-button" onClick={empty}>
          <FontAwesomeIcon icon="times" />
        </button>
        <button className="icon-button" onClick={toggle}>
          <FontAwesomeIcon icon="chevron-down" />
        </button>
      </div>
      {isOpen && (
        <div className="items-dropdown" ref={dropdownRef}>
          {items.map((item, index) => (
            <button key={index} name="add" id={index} onClick={onClick}>
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParcelsSelect;
