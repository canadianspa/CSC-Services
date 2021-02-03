import React, { useState, useEffect, useReducer } from "react";
import styles from "./PortablesPage.module.css";

import { toast } from "react-toastify";
import { Input } from "reactstrap";
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import * as api from "../../api/BackendApi";
import * as dbHelper from "./DatabaseHelper";
import { reducer } from "../utils";
import { PRODUCTS } from "../../config";
import { sortByDate } from "./Utils";

import { Spinner, Jumbotron, Header, IconHeader } from "../Shared";
import PortablesModal from "./PortablesModal";
import Customer from "./components/Customer";
import Note from "./components/Note";
import Filter from "./components/Filter";
import LinkMultiSelect from "./components/LinkMultiSelect";
import Details from "./components/Details";

const initialFormState = {
  note: "",
  name: "",
  address: "",
  phone: "",
  title: PRODUCTS[0],
  fault: "",
  serial_numbers: [],
  warranty: true,
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

  function onClick(event) {
    const { name } = event.currentTarget;

    if (name === "editCustomer") {
      setFormState({
        ...initialFormState,
        ...activeCustomer,
        ...activeCustomer.product,
      });
    } else {
      setFormState(initialFormState);
    }

    toggleModal(name);
  }

  function onSubmit(event) {
    const { key } = event;
    const { name, id } = event.currentTarget;

    if (name === "addCustomer") {
      dbHelper.addCustomer(customers, formState, onSuccess, onError);
    } else if (name === "editCustomer") {
      dbHelper.editCustomer(activeCustomer, formState, onSuccess, onError);
    } else if (name === "note" && key === "Enter") {
      dbHelper.addNote(activeCustomer, formState, onSuccess, onError);
    } else if (name === "addLink") {
      dbHelper.addLink(activeCustomer, formState, onSuccess, onError);
    } else if (name === "removeLink") {
      dbHelper.deleteLink(id, activeCustomer, formState, onSuccess, onError);
    } else if (name === "archive") {
      dbHelper.archiveCustomer(activeCustomer, onSuccess, onError);
    }
  }

  function onSuccess({
    updatedCustomer,
    updatedCustomers,
    callToggleModal,
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

    callToggleModal && toggleModal();
    successMsg && toast.dark(successMsg);
  }

  function onError() {
    toast.error("Error completing action");
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
            <Filter
              customers={customers}
              filteredCustomers={filteredCustomers}
              setFilteredCustomers={setFilteredCustomers}
            >
              <button name="addCustomer" onClick={onClick}>
                New Customer
              </button>
              <button
                name="archive"
                onClick={onClick}
                disabled={activeCustomer.status === "archived"}
              >
                Archive Current
              </button>
            </Filter>
            <div className={styles.customerContainer}>
              {filteredCustomers.map((customer, index) => (
                <Customer
                  key={index}
                  customer={customer}
                  isActiveCustomer={customer === activeCustomer}
                  onClick={onCustomerClick}
                />
              ))}
            </div>
          </div>
          <div>
            <Header dark padded>
              {activeCustomer.name}
              {activeCustomer.status === "archived" && " (Archived)"}
            </Header>
            <div className={styles.detailsWindow}>
              <div className={styles.notes}>
                <Header>Notes</Header>
                <div className={styles.notesContainer}>
                  {activeCustomer.notes.length > 0 ? (
                    activeCustomer.notes.map((note, index) => (
                      <Note key={index} note={note} />
                    ))
                  ) : (
                    <div>No previous notes</div>
                  )}
                </div>
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
                <IconHeader icon={faPencilAlt} name="editCustomer" onClick={onClick}>
                  Details
                </IconHeader>
                <Details customer={activeCustomer} />
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
      )}
      <PortablesModal
        isOpen={modalOpen}
        toggle={toggleModal}
        modalType={modalType}
        formState={formState}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
        activeCustomer={activeCustomer}
      />
    </>
  );
}

export default PortablesPage;
