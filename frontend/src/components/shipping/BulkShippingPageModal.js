import React from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ParcelForm from "./forms/ParcelForm";

function BulkShippingPageModal({
  isOpen,
  toggle,
  formState,
  onFormChange,
  onClick,
}) {
  let header, content;

  header = "New Parcel";
  content = (
    <ParcelForm
      formState={formState}
      onFormChange={onFormChange}
      onClick={onClick}
    />
  );

  return (
    <Modal size="sm" isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{content}</ModalBody>
    </Modal>
  );
}

export default BulkShippingPageModal;
