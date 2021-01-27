import React, { useState, useEffect, useReducer } from "react";
import "./PortablesPage.css";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { Input } from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Jumbotron, Header, IconButton } from "../Shared";

import { filterArray } from "./Utils";
import PortablesModal from "./PortablesModal";
import Customer from "./Customer";
import Note from "./Note";

const initialFormState = {
  search: "",
  note: "",
  name: "",
  product: "",
  fault: "",
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
  }, []);

  function fetchData() {
    var params = {
      database: "portables",
      collection: "customers",
    };

    api.dbRead(params).then(setInitialState);
  }

  function toggleModal(name) {
    if (name) {
      setModalType(name);
    }
    setModalOpen(!modalOpen);
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function setInitialState(customers) {
    setActiveCustomer(customers[0]);
    setCustomers(customers);
    setFilteredCustomers(customers);
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
    toggleModal(name);
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
                className="rounded-input"
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
              <div className="product">
                <Header>Product</Header>
                <div>{activeCustomer.product}</div>
                <div>{activeCustomer.fault}</div>
                {activeCustomer.serial_numbers.map((serialNumber, index) => (
                  <div key={index}>{serialNumber}</div>
                ))}
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
      />
    </div>
  );
}

export default PortablesPage;
