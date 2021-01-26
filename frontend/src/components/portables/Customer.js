import React from "react";
import "./PortablesPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Customer({ customer, isActiveCustomer, onClick }) {
  const {
    name,
    status,
    product,
    in_warranty,
    fault,
    notes,
    freshdesk_tickets,
  } = customer;

  const _onClick = () => onClick(customer);

  return (
    <div className="customer" onClick={_onClick}>
      <FontAwesomeIcon icon={faUser} size="lg" />
      <span>{name}</span>
    </div>
  );
}

export default Customer;
