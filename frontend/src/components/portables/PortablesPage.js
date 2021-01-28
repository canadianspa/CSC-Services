import React, { useState, useEffect, useReducer } from "react";
import "./PortablesPage.css";

import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Input } from "reactstrap";
import moment from "moment";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { PRODUCTS } from "../../config";
import { filterArray } from "./Utils";

import { Spinner, Jumbotron, Header, IconButton, IconHeader } from "../Shared";
import PortablesModal from "./PortablesModal";
import Product from "./components/Product";
import Customer from "./components/Customer";
import Note from "./components/Note";

const initialFormState = {
  search: "",
  note: "",
  name: "",
  title: PRODUCTS[0],
  fault: "",
  serial_numbers: [],
  in_warranty: true,
};

function PortablesPage() {
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    var params = {
      database: "portables",
      collection: "customers",
    };

    api.dbRead(params).then((customers) => {
      setActiveCustomer(customers[0]);
      setCustomers(customers);
      setFilteredCustomers(customers);
    });
  }

  function toggleModal(name) {
    if (name) {
      setModalType(name);
    }
    setModalOpen(!modalOpen);
  }

  function onFormChange(event) {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox") {
      setFormState({ [name]: checked });
    } else {
      setFormState({ [name]: value });
    }
  }

  function onCustomerClick(customer) {
    setFormState({ search: "" });
    setActiveCustomer(customer);
  }

  function onSearchChange(event) {
    const { value } = event.target;

    onFormChange(event);

    var keys = [
      "name",
      "product",
      "freshdesk_tickets",
      "purchase_invoices",
      "repair_invoices",
      "serial_numbers",
      "fault",
    ];

    setFilteredCustomers(filterArray(customers, keys, value));
  }

  function onButtonClick(event) {
    const { name } = event.currentTarget;

    if (name === "editProduct") {
      setFormState({ ...initialFormState, ...activeCustomer.product });
    }
    toggleModal(name);
  }

  function onSubmit(event) {
    const { name } = event.target;

    if (name === "createCustomer") {
      createCustomer();
    }
  }

  function createCustomer() {
    var params = {
      name: formState.name,
      product: formState.product,
      fault: formState.fault,
      in_warranty: formState.in_warranty,
      created_at: moment().toISOString(),
    };

    console.log(params);
  }

  return (
    <div className="container">
      <Jumbotron>Portables</Jumbotron>
      {customers.length === 0 ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className="window">
          <div className="left-window">
            <Header dark style={{ padding: "5px" }}>
              Customers
            </Header>
            <div className="search-bar">
              <Input
                name="search"
                placeholder="Search"
                value={formState.search}
                onChange={onSearchChange}
              />
              <IconButton name="addCustomer" icon={faPlus} onClick={onButtonClick} />
            </div>
            {filteredCustomers.map((customer, index) => (
              <Customer
                key={index}
                customer={customer}
                isActiveCustomer={customer === activeCustomer}
                onClick={onCustomerClick}
              />
            ))}
          </div>
          <div className="right-window">
            <Header dark style={{ padding: "5px" }}>
              {activeCustomer.name}
            </Header>
            <div className="customer-grid">
              <div className="notes">
                <Header>Notes</Header>
                <div className="notes-container">
                  {activeCustomer.notes.map((note, index) => (
                    <Note key={index} note={note} />
                  ))}
                </div>
                <Input
                  name="note"
                  placeholder="Enter note"
                  className="rounded-input"
                  value={formState.note}
                  onChange={onFormChange}
                />
              </div>
              <div>
                <IconHeader
                  text="Product"
                  icon={faPencilAlt}
                  name="editProduct"
                  onClick={onButtonClick}
                />
                <Product product={activeCustomer.product} />
              </div>
            </div>
            <div className="links">
              <Header>Links</Header>
              {activeCustomer.freshdesk_tickets.map((url, index) => (
                <a key={index} href={url}>
                  Ticket
                </a>
              ))}
              {activeCustomer.purchase_invoices.map((url, index) => (
                <a key={index} href={url}>
                  Ticket
                </a>
              ))}
              {activeCustomer.repair_invoices.map((url, index) => (
                <a key={index} href={url}>
                  Ticket
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      <PortablesModal
        isOpen={modalOpen}
        toggle={toggleModal}
        modalType={modalType}
        formState={formState}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default PortablesPage;
