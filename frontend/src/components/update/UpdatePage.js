import React, { useState } from "react";

import { UPDATE_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";

import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";
import { Button, Input } from "reactstrap";
import { toast } from "react-toastify";

const vendors = UPDATE_VENDORS;
const initialVendor = vendors[0];

function UpdatePage() {
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(initialVendor);

  function handleUpdateClick() {
    setLoading(true);

    var params = {
      vendor: selectedVendor.name,
    };

    api.updateSpreadsheet(params).then((orders) => {
      if (orders.length > 0) {
        toast.dark(`Added ${orders.length} order(s)`);
      } else {
        toast.dark("No orders added");
      }

      setLoading(false);
      setSelectedVendor(initialVendor);
    });
  }

  function handleVendorChange(event) {
    const { value } = event.target;

    var vendor = vendors.find((_vendor) => _vendor.title === value);
    setSelectedVendor(vendor);
  }

  return (
    <div className="container">
      <Jumbotron>
        <span>Update Google Spreadsheet</span>
      </Jumbotron>
      {loading ? (
        <Spinner style={{ width: "70px", height: "70px", marginTop: "50px" }} />
      ) : (
        <>
          <h5>Select Spreadsheet</h5>
          <Input type="select" className="select" onChange={handleVendorChange}>
            {vendors.map((vendor, index) => (
              <option key={index}>{vendor.title}</option>
            ))}
          </Input>
          <Button color="primary" onClick={handleUpdateClick}>
            Update
          </Button>
        </>
      )}
    </div>
  );
}

export default UpdatePage;
