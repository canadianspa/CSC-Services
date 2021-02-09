import React from "react";

import { Header, Select } from "../Shared";
import OrdersTable from "./OrdersTable";

function ShipmentForm({ onFormChange, file, orders, quotes }) {
  return (
    <>
      <Header>File: {file.name}</Header>
      <Header>Select Service</Header>
      <Select
        name="service"
        options={quotes}
        onChange={onFormChange}
        useObjects
        useEvent
      />
      <Header>Parcels</Header>
      <Header>Orders</Header>
      <OrdersTable orders={orders} />
    </>
  );
}

export default ShipmentForm;
