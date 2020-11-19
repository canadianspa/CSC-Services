import React, { useState } from "react";

import { UPDATE_VENDORS } from "../../config";
import * as api from "../../api/BackendApi";

import { Button } from "reactstrap";
import { toast } from "react-toastify";
import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";
import Select from "../shared/Select";

function UpdatePage() {
  const initialVendor = UPDATE_VENDORS[0];

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
          <Select
            options={UPDATE_VENDORS}
            objectTitleKey="title"
            onChange={setSelectedVendor}
            useObjects={true}
          />
          <Button onClick={handleUpdateClick}>Update</Button>
        </>
      )}
    </div>
  );
}

export default UpdatePage;
