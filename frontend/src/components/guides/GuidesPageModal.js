import React from "react";
import styles from "./GuidesPage.module.css";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

function HelpPageModal({ isOpen, toggle, article }) {
  const { header, content } = article;

  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody className={styles.modalBody}>{content}</ModalBody>
    </Modal>
  );
}

export default HelpPageModal;
