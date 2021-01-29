import React, { useState, useEffect, useReducer } from "react";
import styles from "./PortablesPage.module.css";

import moment from "moment";
import { Input } from "reactstrap";
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { PRODUCTS } from "../../config";
import { filterArray } from "./Utils";

import {
  Spinner,
  Jumbotron,
  Header,
  SubHeader,
  IconButton,
  IconHeader,
} from "../Shared";
import PortablesModal from "./PortablesModal";
import Product from "./components/Product";
import Customer from "./components/Customer";
import Note from "./components/Note";
import LinkMultiSelect from "./components/LinkMultiSelect";

const urlTypes = ["Freshdesk Ticket", "Purchase Invoice", "Repair Invoice"];

const initialFormState = {
  search: "",
  note: "",
  name: "",
  title: PRODUCTS[0],
  fault: "",
  serial_numbers: [],
  in_warranty: true,
  purchase_invoices: [],
  repair_invoices: [],
  freshdesk_tickets: [],
  url: "",
  urlType: urlTypes[0],
  urlTypes: urlTypes,
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

    api.dbRead(params).then(loadCustomers);
  }

  function loadCustomers(customers) {
    setActiveCustomer(customers[0]);
    setCustomers(customers);
    setFilteredCustomers(customers);
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

  function onClick(event) {
    const { name } = event.currentTarget;

    if (name === "createCustomer") {
      setFormState(initialFormState);
    } else if (name === "editProduct") {
      setFormState({ ...initialFormState, ...activeCustomer.product });
    }

    toggleModal(name);
  }

  function onSubmit(event) {
    const { name } = event.currentTarget;

    if (name === "createCustomer") {
      createCustomer();
    } else if (name === "editProduct") {
      editProduct();
    }
  }

  function createCustomer() {
    var params = {
      name: formState.name,
      created_at: moment().toISOString(),
      product: {
        title: formState.title,
        fault: formState.fault,
        serial_numbers: [],
        in_warranty: formState.in_warranty,
      },
    };

    console.log(params);
  }

  function editProduct() {
    var params = {
      product: {
        title: formState.title,
        fault: formState.fault,
        serial_numbers: formState.serial_numbers,
        in_warranty: formState.in_warranty,
      },
    };

    console.log(params);
  }

  return (
    <>
      <Jumbotron>Portables</Jumbotron>
      {customers.length === 0 ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className={styles.window}>
          <div className={styles.leftWindow}>
            <Header dark padded>
              Customers
            </Header>
            <div className={styles.searchBar}>
              <Input
                name="search"
                placeholder="Search"
                value={formState.search}
                onChange={onSearchChange}
              />
              <IconButton name="addCustomer" icon={faPlus} onClick={onClick} />
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
          <div className={styles.rightWindow}>
            <Header dark padded>
              {activeCustomer.name}
            </Header>
            <div className={styles.customerGrid}>
              <div className={styles.notes}>
                <Header>Notes</Header>
                <div className={styles.notesContainer}>
                  {activeCustomer.notes.map((note, index) => (
                    <Note key={index} note={note} />
                  ))}
                </div>
                <Input
                  name="note"
                  placeholder="Enter note"
                  className={styles.roundedInput}
                  value={formState.note}
                  onChange={onFormChange}
                />
              </div>
              <div>
                <IconHeader icon={faPencilAlt} name="editProduct" onClick={onClick}>
                  Product
                </IconHeader>
                <Product product={activeCustomer.product} />
              </div>
            </div>
            <div className={styles.links}>
              <IconHeader
                name="addLink"
                icon={faPlus}
                onClick={onClick}
                style={{ width: "70px" }}
              >
                Links
              </IconHeader>
              <div className={styles.linksGrid}>
                <div>
                  <SubHeader>Freshdesk Tickets</SubHeader>
                  <LinkMultiSelect
                    prefix="Ticket #"
                    name="deleteFreshdeskLink"
                    links={activeCustomer.freshdesk_tickets}
                    onDelete={onFormChange}
                  />
                </div>
                <div>
                  <SubHeader>Purchase Invoices</SubHeader>
                  <LinkMultiSelect
                    prefix="Order "
                    name="deletePurchaseLink"
                    links={activeCustomer.purchase_invoices}
                    onDelete={onFormChange}
                  />
                </div>
                <div>
                  <SubHeader>Repair Invoices</SubHeader>
                  <LinkMultiSelect
                    prefix="Order "
                    name="deleteRepairLink"
                    links={activeCustomer.repair_invoices}
                    onDelete={onFormChange}
                  />
                </div>
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
        onSubmit={onSubmit}
      />
    </>
  );
}

export default PortablesPage;
