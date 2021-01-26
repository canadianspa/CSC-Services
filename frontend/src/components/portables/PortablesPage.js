import React, { useState, useEffect } from "react";
import "./PortablesPage.css";

import * as api from "../../api/BackendApi";
import { Spinner, Jumbotron, Header } from "../Shared";

import Customer from "./Customer";
import Note from "./Note";

function PortablesPage() {
  const [customers, setCustomers] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    var params = {
      database: "portables",
      collection: "customers",
    };

    api.dbRead(params).then(setInitialState);
  }

  function setInitialState(customers) {
    setActiveCustomer(customers[0]);
    setCustomers(customers);
  }

  function onCustomerClick(customer) {
    setActiveCustomer(customer);
  }

  return (
    <div className="container">
      <Jumbotron>Portables</Jumbotron>
      {customers.length === 0 ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className="window">
          <div className="customer-list">
            <Header dark>Customer</Header>
            {customers.map((customer, index) => (
              <Customer
                key={index}
                customer={customer}
                isActiveCustomer={customer === activeCustomer}
                onClick={onCustomerClick}
              />
            ))}
          </div>
          <div className="customer-notes">
            <Header dark>{activeCustomer.name}</Header>
            <div>
              {activeCustomer.notes.map((note) => (
                <Note note={note} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortablesPage;
