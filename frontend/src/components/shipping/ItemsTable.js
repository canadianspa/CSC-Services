import React from "react";
import "./ShippingPage.css";

import { Button, Table } from "reactstrap";

function ItemsTable({ items, handleDeleteItem }) {
  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Item</th>
          <th>
            Volume (cm<sup>3</sup>)
          </th>
          <th>Weight (kg)</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.width * item.height}</td>
            <td>{item.weight}</td>
            <td>{item.quantity}</td>
            <td>
              <Button
                color="secondary"
                size="sm"
                id={index}
                onClick={handleDeleteItem}
              >
                x
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ItemsTable;
