import React from "react";
import styles from "./BulkShippingPage.module.css";

import { Table } from "reactstrap";

function OrdersTable({ orders }) {
  return (
    <Table bordered striped responsive size="sm">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Name</th>
          <th>Address 1</th>
          <th>City</th>
          <th>Postcode</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className={styles.row}>
            <td>{order.reference}</td>
            <td>
              {order.destination_address.first_name}{" "}
              {order.destination_address.last_name}
            </td>
            <td>{order.destination_address.line_1}</td>
            <td>{order.destination_address.city}</td>
            <td>{order.destination_address.zip}</td>
            <td>
              {order.products.map((product, index) => (
                <div key={index} className={styles.product}>
                  {product}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrdersTable;
