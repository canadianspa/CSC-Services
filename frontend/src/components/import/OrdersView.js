import React, { useState, useEffect } from "react";
import "./ImportPage.css";

import { Button } from "reactstrap";

import * as api from "../../api/BackendApi";
import OrdersTable from "./OrdersTable";
import ImportPageModal from "./ImportPageModal";

function OrdersView({ orders, file, updateAddress, handleImport, setInitialState }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [activeOrderIndex, setActiveOrderIndex] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    setSelectedIndexes(orders.map((x, idx) => idx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => setModalOpen(!modalOpen);

  function handleCheckboxClick(event) {
    const { id, checked } = event.target;
    let index = parseInt(id);

    if (checked) {
      setSelectedIndexes([...selectedIndexes, index]);
    } else {
      setSelectedIndexes(selectedIndexes.filter((idx) => idx !== index));
    }
  }

  function handleAddressSelection(event) {
    event.preventDefault();

    const { value } = event.target.elements.address;

    setModalOpen(false);

    // Find selected address from dropdown
    var address = addresses.find((address) => address.summaryline === value);
    updateAddress(activeOrderIndex, address);
  }

  function handleEditAddressClick(event) {
    const { id } = event.target;
    let index = parseInt(id);

    setActiveOrderIndex(index);

    var params = {
      postcode: orders[index].deliver_to_attributes.zip,
    };

    api.getPostcodeAddresses(params).then((json) => {
      setAddresses(json);
      setModalOpen(true);
    });
  }

  function handleImportClick() {
    let selectedOrders = orders.filter((orders, idx) =>
      selectedIndexes.includes(idx)
    );

    handleImport(selectedOrders);
  }

  return orders.length === 0 ? (
    <>
      <h5>No orders found.</h5>
      <Button color="danger" onClick={setInitialState}>
        Cancel
      </Button>
    </>
  ) : (
    <>
      {file && <h5>File: {file.name}</h5>}
      <OrdersTable
        orders={orders}
        handleCheckboxClick={handleCheckboxClick}
        handleEditClick={handleEditAddressClick}
      />
      <div className="centered-parent">
        <Button color="danger" onClick={setInitialState}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleImportClick}>
          Import
        </Button>
      </div>
      <ImportPageModal
        isOpen={modalOpen}
        toggle={toggle}
        modalType={"editAddress"}
        addresses={addresses}
        handleAddressSelection={handleAddressSelection}
      />
    </>
  );
}

export default OrdersView;
