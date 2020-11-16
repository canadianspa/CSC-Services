import React from "react";
import "./ShippingPage.css";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

function ShippingPageModal({
  isOpen,
  toggle,
  modalType,
  items,
  handleNewItem,
  handleAddItem,
  handleEditItem,
}) {
  let header, body;
  console.log("x ", modalType, " x");
  if (modalType === "addItem") {
    header = "Add Item";
    body = (
      <Form onSubmit={handleAddItem}>
        <Input name="item" type="select" multiple className="select">
          {items.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </Input>
        <div className="button-parent">
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add
          </Button>
        </div>
      </Form>
    );
  } else if (modalType === "newItem") {
    header = "Create Item";
    body = (
      <Form onSubmit={handleNewItem}>
        <FormGroup>
          <Label for="itemName">Name</Label>
          <Input type="text" name="name" id="itemName" />
        </FormGroup>
        <FormGroup>
          <Label for="itemHeight">Height (cm)</Label>
          <Input type="text" name="height" id="itemHeight" pattern="[0-9]*" />
        </FormGroup>
        <FormGroup>
          <Label for="itemWidth">Width (cm)</Label>
          <Input type="text" name="width" id="itemWidth" pattern="[0-9]*" />
        </FormGroup>
        <FormGroup>
          <Label for="itemWeight">Weight (kg)</Label>
          <Input type="text" name="weight" id="itemWeight" pattern="[0-9]*" />
        </FormGroup>
        <div className="button-parent">
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add
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
