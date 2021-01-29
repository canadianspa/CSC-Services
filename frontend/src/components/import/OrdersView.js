import React from "react";

import { Button } from "reactstrap";
import { Header, InlineButton } from "../Shared";
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
      <Header>No orders found</Header>
      <Button color="danger" onClick={setInitialState}>
        Back
      </Button>
    </>
  ) : (
    <>
      {file && <Header>File: {file.name}</Header>}
      <OrdersTable
        orders={orders}
        handleCheckboxClick={handleCheckboxClick}
        handleEditClick={handleEditAddressClick}
      />
      <InlineButton>
        <Button color="danger" onClick={setInitialState}>
          Cancel
        </Button>
        <Button onClick={handleImportClick}>Import</Button>
      </InlineButton>
    </>
  );
}

export default OrdersView;
