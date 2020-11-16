import React, { useState, useEffect, Fragment } from "react";
import "./OrderWell.css";

import * as api from "../../api/BackendApi";
import OrderWellTable from "./OrderWellTable";
import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";
import { Button } from "reactstrap";

function OrderWell() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    api.getOrderWell().then((orders) => {
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
          <OrderWellTable orders={orders} />
        </>
      )}
    </div>
  );
}

export default OrderWell;
