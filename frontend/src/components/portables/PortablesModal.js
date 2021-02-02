import React from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

import AddCustomerForm from "./forms/AddCustomerForm";
import EditProductForm from "./forms/EditProductForm";
import AddLinkForm from "./forms/AddLinkForm";
import ConfirmArchiveForm from "./forms/ConfirmArchiveForm";

function PortablesModal({
  isOpen,
  toggle,
  modalType,
  formState,
  onFormChange,
  onSubmit,
}) {
  let header, body;

  if (modalType === "addCustomer") {
    header = "Add Customer";
    body = (
      <AddCustomerForm
        formState={formState}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
      />
    );
  } else if (modalType === "editProduct") {
    header = "Edit Product";
    body = (
      <EditProductForm
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
    header = "Archive Customer";
    body = <ConfirmArchiveForm toggle={toggle} onSubmit={onSubmit} />;
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}

export default PortablesModal;
