import React from "react";

import { Button } from "reactstrap";
import { Header, InlineButton } from "../Shared";
import OrdersTable from "./OrdersTable";

function OrdersView({ orders, formState, onClick }) {
  const { file } = formState;

  return (
    <>
      <Header>File: {file.name}</Header>
      <Header>Orders</Header>
      <OrdersTable orders={orders} />
      <InlineButton>
        <Button color="danger" name="initial" onClick={onClick}>
          Cancel
        </Button>
        <Button color="primary" name="continue" onClick={onClick}>
          Continue
        </Button>
      </InlineButton>
    </>
  );
}

export default OrdersView;
