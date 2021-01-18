import React from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

function HelpPageModal({ isOpen, toggle, article }) {
  const { header, content } = article;

  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{content}</ModalBody>
    </Modal>
  );
}

export default HelpPageModal;
