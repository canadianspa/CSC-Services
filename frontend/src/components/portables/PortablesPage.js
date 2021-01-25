import React, { useState, useEffect } from "react";
import "./PortablesPage.css";

import * as api from "../../api/BackendApi";
import { Jumbotron } from "../Shared";

import { Table } from "reactstrap";
import CustomerRow from "./CustomerRow";

function PortablesPage() {
  const [customers, setCustomers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    var params = {
      database: "portables",
      collection: "customers",
    };

    api.dbRead(params).then(setCustomers);
  }

  function onCustomerRowClick(event) {
    const { id } = event.currentTarget;
    var index = parseInt(id);

    setOpenIndex(index === openIndex ? null : index);
  }

  return (
    <div className="container">
      <Jumbotron>Portables</Jumbotron>
      <Table striped>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Product</th>
            <th>In Warranty</th>
            <th>Fault</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <CustomerRow
              key={index}
              customer={customer}
              index={index}
              isOpen={openIndex === index}
              onClick={onCustomerRowClick}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PortablesPage;
