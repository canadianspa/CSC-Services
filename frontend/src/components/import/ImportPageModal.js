import React from "react";

import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { SelectForm, InlineButton } from "../Shared";

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
          <InlineButton style={{ marginTop: "20px" }}>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </InlineButton>
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
