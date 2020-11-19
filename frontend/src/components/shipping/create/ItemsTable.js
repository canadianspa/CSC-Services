import React from "react";
import "./ShippingCreatePage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "reactstrap";

function ItemsTable({ items, handleDeleteItem }) {
  return (
    <Table striped size="sm">
      <thead>
        <tr>
          <th>Item</th>
          <th>Height (cm)</th>
          <th>Width (cm)</th>
          <th>Length (cm)</th>
          <th>Weight (kg)</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.height}</td>
            <td>{item.width}</td>
            <td>{item.length}</td>
            <td>{item.weight}</td>
            <td>{item.quantity}</td>
            <td>
              <Button
                size="sm"
                color="secondary"
                className="times-button"
                onClick={() => handleDeleteItem(index)}
              >
                <FontAwesomeIcon icon="times" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ItemsTable;
