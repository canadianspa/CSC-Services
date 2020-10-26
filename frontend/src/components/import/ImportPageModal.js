import React from "react";
import "./ImportPage.css";

import { Modal, ModalHeader, ModalBody, Input, Button, Form } from "reactstrap";

function ImportPageModal({
	isOpen,
	toggle,
	modalType,
	addresses,
	handleAddressSelection,
}) {
	let header, body;
	if (modalType === "editAddress") {
		header = "Select address";
		body = (
			<Form onSubmit={handleAddressSelection}>
				<Input name="address" type="select">
					{addresses.map((address, index) => (
						<option key={index}>{address.summaryline}</option>
					))}
				</Input>
				<div className="button-parent">
					<Button color="danger" onClick={toggle}>
						Cancel
					</Button>
					<Button color="primary" type="submit">
						Update
					</Button>
				</div>
			</Form>
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
