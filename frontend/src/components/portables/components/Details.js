import React from "react";

import { getBackgroundColor } from "../Utils";
import InfoBox from "./InfoBox";

function Details({ customer }) {
  const { address, phone, product } = customer;
  const { title, fault, serial_numbers, warranty } = product;

  return (
    <div>
      <InfoBox header="Address" content={address ? address : "Not given"} />
      <InfoBox header="Phone" content={phone ? phone : "Not given"} />
      <InfoBox
        header="Product"
        content={title}
        backgroundColor={getBackgroundColor(title)}
      />
      <InfoBox
        header="In Warranty"
        content={warranty ? "Yes" : "No"}
        backgroundColor={warranty ? "#85ea85" : "#f57979"}
      />
      {serial_numbers.length > 0 ? (
        <InfoBox
          header="Serial Number(s)"
          content={serial_numbers}
          backgroundColor="#bad6ec"
        />
      ) : (
        <InfoBox
          header="Serial Number(s)"
          content="Not given"
          backgroundColor="transparent"
        />
      )}
      <InfoBox
        header="Fault Description"
        content={fault === "" ? "Not given" : fault}
      />
    </div>
  );
}

export default Details;
