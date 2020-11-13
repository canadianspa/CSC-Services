import React, { useState } from "react";
import "./UpdatePage.css";

import { UPDATE_VENDORS } from "../../config";
import { updateSpreadsheet } from "../../api/BackendApi";
import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { toast } from "react-toastify";

function UpdatePage() {
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function handleUpdateClick() {
    setLoading(true);
    updateSpreadsheet(selectedVendor.name).then((orders) => {
      if (orders.length > 0) {
        toast.dark(`Added ${orders.length} order(s)`);
      } else {
        toast.dark("No orders added");
      }
      setLoading(false);
    });
  }

  function getDropDownText() {
    if (selectedVendor) {
      return selectedVendor.title;
    } else {
      return "Select vendor";
    }
  }

  return (
    <div className="container">
      <Jumbotron>
        <span>Update Google Spreadsheet</span>
      </Jumbotron>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret className="vendor-dropdown">
          {getDropDownText()}
        </DropdownToggle>
        <DropdownMenu>
          {UPDATE_VENDORS.map((vendor, index) => (
            <DropdownItem key={index} onClick={() => setSelectedVendor(vendor)}>
              {vendor.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {loading ? (
        <Spinner style={{ width: "70px", height: "70px", marginTop: "5px" }} />
      ) : (
        <Button
          color="primary"
          disabled={selectedVendor ? false : true}
          onClick={handleUpdateClick}
        >
          Update
        </Button>
      )}
    </div>
  );
}

export default UpdatePage;
