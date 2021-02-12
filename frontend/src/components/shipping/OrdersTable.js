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
            <td>{order.number}</td>
            <td>
              {order.deliver_to.first_name} {order.deliver_to.last_name}
            </td>
            <td>{order.deliver_to.address1}</td>
            <td>{order.deliver_to.city}</td>
            <td>{order.deliver_to.zip}</td>
            <td>
              {order.line_items.map((item, index) => (
                <div key={index} className={styles.product}>
                  {item.sellable.product_title}
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
