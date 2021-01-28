import React from "react";
import styles from "./Customer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Customer({ customer, isActiveCustomer, onClick }) {
  const { name, created_at, product } = customer;

  function onCustomerClick() {
    onClick(customer);
  }

  var date = new Date(created_at).toLocaleDateString();

  return (
    <div
      className={
        isActiveCustomer ? styles.customer + " " + styles.selected : styles.customer
      }
      onClick={onCustomerClick}
    >
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.content}>{product.fault}</div>
      <div className={styles.footer}>{product.title}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
}

export default Customer;
