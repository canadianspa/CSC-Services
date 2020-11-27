import React from "react";
import "./ImportPage.css";

import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { SelectForm } from "../Shared";

function ImportPageModal({
  isOpen,
  toggle,
  modalType,
  addresses,
  handleUpdateAddress,
}) {
  let header, body;
  if (modalType === "editAddress") {
    header = "Select address";
    body = (
      <SelectForm
        options={addresses}
        onSubmit={handleUpdateAddress}
        useObjects={true}
        optionKey="summaryline"
        children={
          <div className="button-parent">
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </div>
        }
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

export default ImportPageModal;
