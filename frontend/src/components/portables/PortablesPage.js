import React, { useState, useEffect, useReducer } from "react";
import styles from "./PortablesPage.module.css";

import { toast } from "react-toastify";
import { Input } from "reactstrap";
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import * as api from "../../api/BackendApi";
import * as dbHelper from "./DatabaseHelper";
import { reducer } from "../utils";
import { PRODUCTS } from "../../config";
import { filterArray, sortByDate } from "./Utils";

import { Spinner, Jumbotron, Header, IconButton, IconHeader } from "../Shared";
import PortablesModal from "./PortablesModal";
import Product from "./components/Product";
import Customer from "./components/Customer";
import Note from "./components/Note";
import LinkMultiSelect from "./components/LinkMultiSelect";

const initialFormState = {
  search: "",
  note: "",
  name: "",
  title: PRODUCTS[0],
  fault: "",
  serial_numbers: [],
  in_warranty: true,
  url: "",
  urlTitle: "",
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
    var sortedCustomers = sortByDate(customers, "created_at");

    setActiveCustomer(sortedCustomers[0]);
    setCustomers(sortedCustomers);
    setFilteredCustomers(sortedCustomers);
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
    setFormState(initialFormState);
    setActiveCustomer(customer);
  }

  function onSearchChange(event) {
    const { value } = event.target;

    onFormChange(event);

    var keys = ["name"];

    setFilteredCustomers(filterArray(customers, keys, value));
  }

  function onClick(event) {
    const { name } = event.currentTarget;

    setFormState(initialFormState);

    if (name === "editProduct") {
      setFormState({ ...initialFormState, ...activeCustomer.product });
    }

    toggleModal(name);
  }

  function onSubmit(event) {
    const { key } = event;
    const { name, value } = event.currentTarget;

    if (name === "createCustomer") {
      dbHelper.createCustomer(customers, formState, onSuccess, onError);
    } else if (name === "editProduct") {
      dbHelper.editProduct(activeCustomer, formState, onSuccess, onError);
    } else if (name === "note" && key === "Enter") {
      dbHelper.addNote(activeCustomer, formState, onSuccess, onError);
    } else if (name === "addLink") {
      dbHelper.addLink(activeCustomer, formState, onSuccess, onError);
    } else if (name === "removeLink") {
      dbHelper.deleteLink(value, activeCustomer, formState, onSuccess, onError);
    }
  }

  function onSuccess({
    updatedCustomer,
    updatedCustomers,
    toggleModal,
    successMsg,
  }) {
    if (updatedCustomers) {
      loadCustomers(updatedCustomers);
    } else {
      updatedCustomers = [...customers];
      var index = updatedCustomers.indexOf(activeCustomer);
      updatedCustomers[index] = updatedCustomer;

      setFormState(initialFormState);
      loadCustomers(updatedCustomers);
      setActiveCustomer(updatedCustomer);
    }

    toggleModal && toggleModal();
    successMsg && toast.dark(successMsg);
  }

  function onError(errorMsg) {
    toast.error(errorMsg);
  }

  return (
    <>
      <Jumbotron>Portables</Jumbotron>
      {customers.length === 0 ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className={styles.window}>
          <div>
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
          <div>
            <Header dark padded>
              {activeCustomer.name}
            </Header>
            <div className={styles.detailsWindow}>
              <div className={styles.notes}>
                <Header>Notes</Header>
                {activeCustomer.notes.map((note, index) => (
                  <Note key={index} note={note} />
                ))}
                <Input
                  name="note"
                  placeholder="Enter note"
                  className={styles.roundedInput}
                  value={formState.note}
                  onChange={onFormChange}
                  onKeyPress={onSubmit}
                />
              </div>
              <div>
                <div>
                  <IconHeader
                    icon={faPencilAlt}
                    name="editProduct"
                    onClick={onClick}
                  >
                    Product
                  </IconHeader>
                  <Product product={activeCustomer.product} />
                </div>
                <div>
                  <IconHeader name="addLink" icon={faPlus} onClick={onClick}>
                    Links
                  </IconHeader>
                  <LinkMultiSelect
                    name="removeLink"
                    links={activeCustomer.links}
                    onDelete={onSubmit}
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
