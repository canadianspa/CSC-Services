import React from "react";

import { Button, Table } from "reactstrap";
import { Header, InlineButton } from "../Shared";

function ShipmentDetailsView({ details, onClick }) {
  const { shipped, failed } = details;

  return (
    <>
      <Header>Shipped</Header>
      {shipped.length ? (
        <Table bordered striped>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Tracking Number</th>
            </tr>
          </thead>
          <tbody>
            {shipped.map((shipment, index) => (
              <tr key={index}>
                <td>{shipment.order.number}</td>
                <td>{shipment.shipment.tracking_number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No successful shipments</div>
      )}
      <InlineButton>
        <Button color="primary" name="viewLabel" onClick={onClick}>
          View Labels
        </Button>
      </InlineButton>
      <Header>Failed</Header>
      {failed.length ? (
        <Table bordered striped>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {failed.map((shipment, index) => (
              <tr key={index}>
                <td>{shipment.number}</td>
                <td>{shipment.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No failed shipments</div>
      )}
      <InlineButton>
        <Button color="primary" name="initial" onClick={onClick}>
          Ok
        </Button>
      </InlineButton>
    </>
  );
}

export default ShipmentDetailsView;
