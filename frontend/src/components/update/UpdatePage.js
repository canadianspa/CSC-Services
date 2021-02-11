import React, { useState } from "react";

import { UPDATE_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";

import { Button } from "reactstrap";
import { toast } from "react-toastify";
import { Jumbotron, Spinner, Select, Header } from "../Shared";

function UpdatePage() {
  const initialVendor = UPDATE_VENDORS[0];

  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(initialVendor);

  function onFormChange(event) {
    const { value } = event.target;
    setSelectedVendor(value);
  }

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

  return (
    <>
      <Jumbotron>Update Google Spreadsheet</Jumbotron>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header>Select Spreadsheet</Header>
          <Select
            options={UPDATE_VENDORS}
            objectTitleKey="title"
            onChange={onFormChange}
            useObjects
            useEvent
          />
          <Button onClick={handleUpdateClick}>Update</Button>
        </>
      )}
    </>
  );
}

export default UpdatePage;
