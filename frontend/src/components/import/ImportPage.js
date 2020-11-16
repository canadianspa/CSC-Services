import React, { useState } from "react";
import "./ImportPage.css";

import { Button } from "reactstrap";
import { toast } from "react-toastify";

import { IMPORT_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";

import OrdersView from "./OrdersView";
import FileUploadArea from "./FileUploadArea";
import Spinner from "../shared/Spinner";
import Jumbotron from "../shared/Jumbotron";

function ImportPage() {
  const [selectedVendor, setSelectedVendor] = useState(IMPORT_VENDORS[0]);
  const [orders, setOrders] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInitialView, setShowInitialView] = useState(true);

  function handleVendorClick(vendor) {
    setSelectedVendor(vendor);

    if (!vendor.requires_file) {
      getOrders(vendor.name);
    }
  }

  function getOrders(vendorName, file) {
    setLoading(true);
    api.convertFile(vendorName, file).then((json) => {
      setLoading(false);

      if (json.error) {
        toast.dark(
          "Error getting orders, ensure you are uploading the correct file."
        );
      } else {
        setOrders(json);
        setFile(file);
        setShowInitialView(false);
      }
    });
  }

  function updateAddress(index, address) {
    const { premise, street, posttown, county, postcode } = address;

    let tempOrders = orders.map((order, idx) => {
      if (idx === index) {
        order.deliver_to_attributes.address1 = premise + " " + street;
        order.deliver_to_attributes.city = posttown;
        order.deliver_to_attributes.state = county;
        order.deliver_to_attributes.zip = postcode;
      }
      return order;
    });
    setOrders(tempOrders);
  }

  function handleImport(orders) {
    toast.dark("Importing...");

    api.importOrders(orders).then((json) => {
      toast.dark(`Imported ${json.length} orders`);
      setInitialState();
    });
  }

  function setInitialState() {
    setSelectedVendor(IMPORT_VENDORS[0]);
    setOrders([]);
    setShowInitialView(true);
  }

  const VendorMenu = () => {
    return IMPORT_VENDORS.map((vendor, index) => (
      <Button
        key={index}
        className="vendor-button"
        color={selectedVendor === vendor ? "primary" : "secondary"}
        onClick={() => handleVendorClick(vendor)}
      >
        {vendor.title}
      </Button>
    ));
  };

  return (
    <div className="container">
      <Jumbotron>
        <span>Import to Veeqo</span>
      </Jumbotron>
      {showInitialView ? (
        <>
          <h4>Choose data source</h4>
          <div>
            <VendorMenu />
          </div>
          {loading ? (
            <Spinner style={{ marginTop: "120px" }} />
          ) : (
            <FileUploadArea
              selectedVendor={selectedVendor}
              handleFileSubmit={getOrders}
            />
          )}
        </>
      ) : (
        <OrdersView
          orders={orders}
          file={file}
          updateAddress={updateAddress}
          handleImport={handleImport}
          setInitialState={setInitialState}
        />
      )}
    </div>
  );
}

export default ImportPage;
