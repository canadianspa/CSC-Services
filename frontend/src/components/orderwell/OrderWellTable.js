import React, { Fragment } from "react";
import "./OrderWell.css";

import { Table } from "reactstrap";

function OrderWellTable({ orders }) {
  return (
    <Table bordered striped id="orderwell-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Order Number</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td>{order.date}</td>
            <td>
              <a target="_blank" href={order.url} rel="noopener noreferrer">
                {order.id}
              </a>
            </td>
            <td>
              {order.items.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && <br />}
                  {item}
                </Fragment>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrderWellTable;
