import React from "react";
import "./PortablesPage.css";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

import AddCustomerForm from "./forms/AddCustomerForm";

function PortablesModal({ isOpen, toggle, modalType, formState, onFormChange }) {
  let header, body;

  if (modalType === "addCustomer") {
    header = "Add Customer";
    body = <AddCustomerForm formState={formState} onFormChange={onFormChange} />;
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}

export default PortablesModal;
