import React from "react";
import "./ShippingPage.css";

import { Table } from "reactstrap";

function ItemsTable({ items, onEditClick, onDelete }) {
  return (
    <Table bordered striped id="orderwell-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Volume</th>
          <th>Weight</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.width * item.height} CM^3</td>
            <td>{item.weight}</td>
            <td>x</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ItemsTable;
