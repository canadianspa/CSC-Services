import React from "react";
import "./Customer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Customer({ customer, isActiveCustomer, onClick }) {
  const { name, created_at, product, fault } = customer;

  function onCustomerClick() {
    onClick(customer);
  }

  var date = new Date(created_at).toLocaleDateString();

  return (
    <div
      className={isActiveCustomer ? "customer selected" : "customer"}
      onClick={onCustomerClick}
    >
      <div className="icon">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="title">{name}</div>
      <div className="content">{fault}</div>
      <div className="footer">{product}</div>
      <div className="date">{date}</div>
    </div>
  );
}

export default Customer;
