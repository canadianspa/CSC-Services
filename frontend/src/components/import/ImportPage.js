import React, { useState, useReducer } from "react";
import "./ImportPage.css";

import { IMPORT_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";

import { toast } from "react-toastify";
import Spinner from "../shared/Spinner";
import Jumbotron from "../shared/Jumbotron";
import Select from "../shared/Select";
import OrdersView from "./OrdersView";
import FileUploadArea from "./FileUploadArea";
import ImportPageModal from "./ImportPageModal";

var intialState = {
  activeOrderIndex: null,
  selectedVendor: IMPORT_VENDORS[0],
  selectedIndexes: null,
};

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function ImportPage() {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [showInitialView, setShowInitialView] = useState(true);
  const [pageVariables, setPageVariables] = useReducer(reducer, intialState);

  const toggle = () => setModalOpen(!modalOpen);

  function handleVendorChange(vendor) {
    setPageVariables({ selectedVendor: vendor });

    if (!vendor.requires_file) {
      getOrders(vendor.name);
    }
  }

  function getOrders(vendorName, file) {
    setLoading(true);

    var params = {
      vendor: vendorName,
      file: file,
    };

    api.convertFile(params).then((json) => {
      setLoading(false);

      if (json.error) {
        toast.dark(
          "Error getting orders, ensure you are uploading the correct file."
        );
      } else {
        setOrders(json);
        setFile(file);
        setPageVariables({ selectedIndexes: json.map((x, idx) => idx) });
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

  function handleUpdateAddress(event) {
    event.preventDefault();
    toggle();

    const { value } = event.target.elements.address;

    const { premise, street, posttown, county, postcode } = addresses.find(
      (address) => address.summaryline === value
    );

    let tempOrders = orders.map((order, idx) => {
      if (idx === pageVariables.activeOrderIndex) {
        order.deliver_to_attributes.address1 = premise + " " + street;
        order.deliver_to_attributes.city = posttown;
        order.deliver_to_attributes.state = county;
        order.deliver_to_attributes.zip = postcode;
      }
      return order;
    });

    setOrders(tempOrders);
  }

  function handleCheckboxClick(event) {
    const { id, checked } = event.target;

    let index = parseInt(id);
    var indexes = pageVariables.selectedIndexes;

    setPageVariables({
      selectedIndexes: checked
        ? [...indexes, index]
        : indexes.filter((idx) => idx !== index),
    });
  }

  function handleImportClick() {
    toast.dark("Importing...");

    var selectedOrders = orders.filter((order, idx) =>
      pageVariables.selectedIndexes.includes(idx)
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
    <div className="container">
      <Jumbotron>
        <span>Import to Veeqo</span>
      </Jumbotron>
      {showInitialView ? (
        <>
          <h5>Select data source</h5>
          <Select
            options={IMPORT_VENDORS}
            objectTitleKey="title"
            onChange={handleVendorChange}
            useObjects={true}
          />
          {loading ? (
            <Spinner style={{ marginTop: "60px" }} />
          ) : (
            <FileUploadArea
              selectedVendor={pageVariables.selectedVendor}
              handleFileSubmit={getOrders}
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
    </div>
  );
}

export default ImportPage;
