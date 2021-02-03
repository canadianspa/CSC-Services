import React from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

import CustomerForm from "./forms/CustomerForm";
import AddLinkForm from "./forms/AddLinkForm";
import ConfirmArchiveForm from "./forms/ConfirmArchiveForm";

function PortablesModal({
  isOpen,
  toggle,
  modalType,
  formState,
  onFormChange,
  onSubmit,
  activeCustomer,
}) {
  let header, body;

  if (modalType === "addCustomer" || modalType === "editCustomer") {
    header = modalType === "addCustomer" ? "Add Customer" : "Edit Customer";
    body = (
      <CustomerForm
        modalType={modalType}
        formState={formState}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
      />
    );
  } else if (modalType === "addLink") {
    header = "Add Link";
    body = (
      <AddLinkForm
        formState={formState}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
      />
    );
  } else if (modalType === "archive") {
    header = "Archive Customer '" + activeCustomer.name + "'";
    body = (
      <ConfirmArchiveForm
        toggle={toggle}
        onSubmit={onSubmit}
        activeCustomer={activeCustomer}
      />
    );
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}

export default PortablesModal;
