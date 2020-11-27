import React, { useState, useEffect } from "react";
import "./OrderWell.css";

import * as api from "../../../api/BackendApi";

import { Button } from "reactstrap";
import { Jumbotron, Spinner } from "../../Shared";
import OrderWellTable from "./OrderWellTable";

function OrderWell() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await api.getOrderWell().then((orders) => {
      setOrders(orders);
      setLoading(false);
    });
  }

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
      <Jumbotron>Order Well</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <>
          <Button onClick={handleCopyClick}>Copy</Button>
          <OrderWellTable orders={orders} />
        </>
      )}
    </div>
  );
}

export default OrderWell;
