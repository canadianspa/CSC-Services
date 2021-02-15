import React from "react";
import styles from "./BulkShippingPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltV,
  faArrowsAltH,
  faWeightHanging,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";
import { Header, IconHeader, Select, InlineButton, Card } from "../Shared";

function ShipmentView({ quotes, formState, onFormChange, onClick }) {
  const { parcels } = formState;

  return (
    <>
      <Header>Select Service</Header>
      <Select
        name="service"
        options={quotes}
        onChange={onFormChange}
        useObjects
        useEvent
      />
      <IconHeader
        name="openModal"
        icon={faPlus}
        style={{ width: "90px" }}
        onClick={onClick}
      >
        Parcels
      </IconHeader>
      <div className={styles.parcelGrid}>
        {parcels.map((parcel, index) => (
          <Card
            name="deleteParcel"
            key={index}
            index={index}
            header={"Parcel " + (index + 1)}
            onDeleteClick={onClick}
          >
            <span className={styles.parcel}>
              <FontAwesomeIcon icon={faArrowsAltV} />
              <span>{parcel.dimensions.height} cm</span>
              <FontAwesomeIcon icon={faArrowsAltH} />
              <span>{parcel.dimensions.width} cm</span>
              <FontAwesomeIcon
                icon={faArrowsAltH}
                style={{ transform: "rotate(-45deg)" }}
              />
              <span>{parcel.dimensions.length} cm</span>
              <FontAwesomeIcon icon={faWeightHanging} />{" "}
              <span>{parcel.weight_in_grams} g</span>
            </span>
          </Card>
        ))}
      </div>
      <InlineButton>
        <Button color="danger" name="initial" onClick={onClick}>
          Cancel
        </Button>
        <Button color="primary" name="createShipment" onClick={onClick}>
          Ship
        </Button>
      </InlineButton>
    </>
  );
}

export default ShipmentView;
