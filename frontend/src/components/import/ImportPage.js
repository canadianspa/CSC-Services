import React, { useState, useReducer } from "react";

import { IMPORT_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";
import { reducer } from "../utils";

import { toast } from "react-toastify";
import { Jumbotron, Spinner, Select, Header, FileUploadArea } from "../Shared";
import OrdersView from "./OrdersView";
import ImportPageModal from "./ImportPageModal";

var intialState = {
  activeOrderIndex: null,
  selectedVendor: IMPORT_VENDORS[0],
};

function ImportPage() {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [showInitialView, setShowInitialView] = useState(true);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [pageVariables, setPageVariables] = useReducer(reducer, intialState);

  const toggle = () => setModalOpen(!modalOpen);

  function handleVendorChange(vendor) {
    setPageVariables({ selectedVendor: vendor });

    if (!vendor.requires_file) {
      getOrders(null, vendor.name);
    }
  }

  function getOrders(file, vendorName) {
    setLoading(true);

    var params = {
      vendor: vendorName,
      file: file,
    };

    api.convertImportFile(params).then((response) => {
      setLoading(false);

      if (response.error) {
        toast.dark(
          "Error getting orders, ensure you are uploading the correct file."
        );
      } else {
        setOrders(response);
        setFile(file);
        setSelectedIndexes(response.map((x, idx) => idx));
        setShowInitialView(false);
      }
    });
  }

  function handleEditAddressClick(event) {
    const { id } = event.target;
    let index = parseInt(id);

    var params = {
      postcode: orders[index].deliver_to_attributes.zip,
    };

    api.getPostcodeAddresses(params).then((json) => {
      setPageVariables({ activeOrderIndex: index });
      setAddresses(json);
      setModalOpen(true);
    });
  }

  function handleUpdateAddress(address) {
    const { premise, street, posttown, county, postcode } = address;

    let tempOrders = orders.map((order, idx) => {
      if (idx === pageVariables.activeOrderIndex) {
        order.deliver_to_attributes.address1 = premise + " " + street;
        order.deliver_to_attributes.city = posttown;
        order.deliver_to_attributes.state = county;
        order.deliver_to_attributes.zip = postcode;
      }
      return order;
    });

    toggle();
    setOrders(tempOrders);
  }

  function handleCheckboxClick(event) {
    const { id, checked } = event.target;

    let index = parseInt(id);

    setSelectedIndexes(
      checked
        ? [...selectedIndexes, index]
        : selectedIndexes.filter((idx) => idx !== index)
    );
  }

  function handleImportClick() {
    toast.dark("Importing...");

    var selectedOrders = orders.filter((order, idx) =>
      selectedIndexes.includes(idx)
    );

    var params = {
      orders: selectedOrders,
    };

    api.importOrders(params).then((json) => {
      toast.dark(`Imported ${json.length} orders`);
      setInitialState();
    });
  }

  function setInitialState() {
    setPageVariables(intialState);
    setOrders([]);
    setShowInitialView(true);
  }

  return (
    <>
      <Jumbotron>Import to Veeqo</Jumbotron>
      {showInitialView ? (
        <>
          <Header>Select data source</Header>
          <Select
            options={IMPORT_VENDORS}
            objectTitleKey="title"
            onChange={handleVendorChange}
            useObjects
          />
          {loading ? (
            <Spinner />
          ) : (
            <FileUploadArea
              name={pageVariables.selectedVendor.name}
              type={pageVariables.selectedVendor.file_type}
              onSubmit={getOrders}
            />
          )}
        </>
      ) : (
        <OrdersView
          orders={orders}
          file={file}
          handleEditAddressClick={handleEditAddressClick}
          handleCheckboxClick={handleCheckboxClick}
          handleImportClick={handleImportClick}
          setInitialState={setInitialState}
        />
      )}
      <ImportPageModal
        isOpen={modalOpen}
        toggle={toggle}
        modalType={"editAddress"}
        addresses={addresses}
        handleUpdateAddress={handleUpdateAddress}
      />
    </>
  );
}

export default ImportPage;
