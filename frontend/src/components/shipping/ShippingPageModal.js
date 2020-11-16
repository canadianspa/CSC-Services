import React from "react";
import "./ShippingPage.css";

import { Modal, ModalHeader, ModalBody, Button, Form } from "reactstrap";
import ItemForm from "./ItemForm";

function ShippingPageModal({
  isOpen,
  toggle,
  modalType,
  handleNewItem,
  handleEditItem,
  formState,
  onFormChange,
}) {
  let header, body;
  if (modalType === "newItem") {
    header = "Create Item";
    body = (
      <Form>
        <ItemForm formState={formState} onFormChange={onFormChange} />
        <div className="centered-parent">
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleNewItem}>
            Create
          </Button>
        </div>
      </Form>
    );
  } else if (modalType === "editItem") {
    header = "Edit Item";
    body = (
      <Form>
        <ItemForm formState={formState} onFormChange={onFormChange} />
        <div className="centered-parent">
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleEditItem}>
            Update
          </Button>
        </div>
      </Form>
    );
  } else {
    header = "Error";
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}

export default ShippingPageModal;
