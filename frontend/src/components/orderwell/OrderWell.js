import React, { useState, useEffect, Fragment } from "react";
import "./OrderWell.css";

import { getOrderWell } from "../../api/BackendApi";
import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";
import { Button, Table } from "reactstrap";

function OrderWell() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    getOrderWell().then((orders) => {
      setOrders(orders);
      setLoading(false);
    });
  }, []);

  function handleCopyClick() {
    var el = document.getElementById("orderwell-table");

    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
    document.execCommand("Copy");
  }

  return (
    <div className="container">
      <Jumbotron>
        <span>{"Order Well for B&Q"}</span>
      </Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <>
          <Button onClick={handleCopyClick}>Copy</Button>
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
                    <a
                      target="_blank"
                      href={order.url}
                      rel="noopener noreferrer"
                    >
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
        </>
      )}
    </div>
  );
}

export default OrderWell;
