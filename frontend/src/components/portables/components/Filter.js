import React, { useReducer } from "react";
import styles from "./Filter.module.css";

import { Input } from "reactstrap";

import { PRODUCTS } from "../../../config";
import { reducer } from "../../utils";

const statuses = ["All", "On Going", "Archived"];
const products = ["All", ...PRODUCTS];
const warranties = ["All", "Yes", "No"];

const initialFormState = {
  search: "",
  status: statuses[0],
  product: products[0],
  warranty: warranties[0],
};

function Filter({ customers, setFilteredCustomers, children }) {
  const [formState, setFormState] = useReducer(reducer, initialFormState);

  function onFormChange(event) {
    const { name, value } = event.target;

    var updatedFormState = {
      ...formState,
      [name]: value,
    };

    var tempCustomers = filterCustomers(updatedFormState);
    var search = updatedFormState.search.toUpperCase();

    setFilteredCustomers(
      tempCustomers.filter((customer) => {
        var customerName = customer.name.toUpperCase();
        var customerAddress = customer.address.toUpperCase();
        var customerPhone = customer.phone.toUpperCase();

        if (search !== "") {
          return (
            customerName.includes(search) ||
            customerAddress.includes(search) ||
            customerPhone.includes(search)
          );
        } else {
          return true;
        }
      })
    );

    setFormState({ [name]: value });
  }

  function filterCustomers(updatedFormState) {
    const { status, product, warranty } = updatedFormState;

    return customers
      .filter((customer) => {
        if (status === "On Going") {
          return customer.status === "ongoing";
        } else if (status === "Archived") {
          return customer.status === "archived";
        } else {
          return true;
        }
      })
      .filter((customer) => {
        if (product !== "All") {
          return customer.product.title === product;
        } else {
          return true;
        }
      })
      .filter((customer) => {
        if (warranty === "Yes") {
          return customer.product.warranty === true;
        } else if (warranty === "No") {
          return customer.product.warranty === false;
        } else {
          return true;
        }
      });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.children}>{children}</div>
      <div className={styles.filter}>
        <div>
          <span>Status</span>
          <Input
            type="select"
            name="status"
            className={styles.status}
            value={formState.status}
            onChange={onFormChange}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Input>
        </div>
        <div>
          <span>Warranty</span>
          <Input
            type="select"
            name="warranty"
            className={styles.warranty}
            value={formState.warranty}
            onChange={onFormChange}
          >
            {warranties.map((warranty, index) => (
              <option key={index} value={warranty}>
                {warranty}
              </option>
            ))}
          </Input>
        </div>
        <div>
          <span>Product</span>
          <Input
            type="select"
            name="product"
            className={styles.product}
            value={formState.product}
            onChange={onFormChange}
          >
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </Input>
        </div>
      </div>
      <Input
        name="search"
        placeholder="Search"
        value={formState.search}
        onChange={onFormChange}
      />
    </div>
  );
}

export default Filter;
