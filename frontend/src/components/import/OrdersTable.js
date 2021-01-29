import React from "react";
import styles from "./ImportPage.module.css";

import { Table, Button, Input } from "reactstrap";

function OrdersTable({ orders, handleEditClick, handleCheckboxClick }) {
  return (
    <Table bordered striped responsive size="sm">
      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address 1</th>
          <th>City</th>
          <th>County</th>
          <th>Postcode</th>
          <th>Country</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          let customer = order.deliver_to_attributes;
          return (
            <tr key={index} className={styles.row}>
              <td>
                <Input
                  type="checkbox"
                  className={styles.checkbox}
                  id={index}
                  defaultChecked="true"
                  onChange={handleCheckboxClick}
                />
              </td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address1}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.zip}</td>
              <td>{customer.country}</td>
              <th>
                <Button
                  color="secondary"
                  size="sm"
                  id={index}
                  onClick={handleEditClick}
                >
                  Edit Address
                </Button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default OrdersTable;
