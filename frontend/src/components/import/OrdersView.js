import React from "react";
import "./ImportPage.css";

import { Button } from "reactstrap";
import OrdersTable from "./OrdersTable";

function OrdersView({
  orders,
  file,
  handleEditAddressClick,
  handleCheckboxClick,
  handleImportClick,
  setInitialState,
}) {
  return orders.length === 0 ? (
    <>
      <h5>No orders found.</h5>
      <Button color="danger" onClick={setInitialState}>
        Back
      </Button>
    </>
  ) : (
    <>
      {file && <h5>File: {file.name}</h5>}
      <OrdersTable
        orders={orders}
        handleCheckboxClick={handleCheckboxClick}
        handleEditClick={handleEditAddressClick}
      />
      <div className="centered-parent">
        <Button color="danger" onClick={setInitialState}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleImportClick}>
          Import
        </Button>
      </div>
    </>
  );
}

export default OrdersView;
