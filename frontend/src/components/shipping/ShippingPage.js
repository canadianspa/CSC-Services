import React, { useState, useReducer, useEffect } from "react";
import "./ShippingPage.css";

import * as api from "../../api/BackendApi";

import Spinner from "../shared/Spinner";
import Jumbotron from "../shared/Jumbotron";
import ShippingPageModal from "./ShippingPageModal";
import ItemsTable from "./ItemsTable";

import { Button, Input } from "reactstrap";

const intialFormState = {
  name: "",
  height: "",
  width: "",
  weight: "",
};

function reducer(state, { name, value, newState }) {
  if (newState) {
    return newState;
  } else {
    return {
      ...state,
      [name]: value,
    };
  }
}

function ShippingPage() {
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState([]);
  const [items, setItems] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formState, setFormState] = useReducer(reducer, intialFormState);
  const [shipmentState, setShipmentState] = useReducer(reducer, {});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await api.getItems().then((data) => {
      var items = JSON.parse(data);
      setItems(items);
    });
    await api.getCarriers().then((carriers) => {
      setCarriers(carriers);
      setShipmentState({ name: "carrier", value: carriers[0] });
      setShipmentState({ name: "accounts", value: carriers[0].accounts });
    });

    setLoading(false);
  }

  const toggle = () => setModalOpen(!modalOpen);

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ name: name, value: value });
  }

  function handleNewItem() {
    toggle();
  }

  function handleEditItem() {
    console.log("edit");
    toggle();
  }

  function handleCarrierChange(event) {
    const { value } = event.target;
    console.log(value);

    var carrier = carriers.find((_carrier) => _carrier.title === value);
    setShipmentState({ name: "carrier", value: carrier });
    setShipmentState({ name: "accounts", value: carrier.accounts });
  }

  function onButtonClick(event) {
    const { name } = event.target;

    setModalType(name);

    if (name === "newItem") {
      setFormState({ newState: intialFormState });
    } else if (name === "editItem") {
      // TODO USE CLICKED ITEM
      setFormState({
        newState: {
          name: "test1",
          height: "12",
          width: "12",
          weight: "12",
        },
      });
    }

    toggle();
  }

  return (
    <div className="container">
      <Jumbotron>
        <span>Create Shipment</span>
      </Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <div className="container">
          <h5>Select Carrier</h5>
          <Input
            type="select"
            className="select"
            name="carrier"
            onChange={handleCarrierChange}
          >
            {carriers.map((carrier, index) => (
              <option key={index}>{carrier.title}</option>
            ))}
          </Input>
          {shipmentState.accounts && (
            <>
              <h5>Select Account</h5>
              <Input
                type="select"
                className="select"
                name="account"
                onChange={handleCarrierChange}
              >
                {shipmentState.accounts.map((account, index) => (
                  <option key={index}>{account.number}</option>
                ))}
              </Input>
            </>
          )}
          <h5>Items</h5>
          <ItemsTable items={items} />
          <Button color="primary" name="newItem" onClick={onButtonClick}>
            New item
          </Button>
          <Button name="editItem" onClick={onButtonClick}>
            Edit item
          </Button>
        </div>
      )}
      <ShippingPageModal
        isOpen={modalOpen}
        toggle={toggle}
        modalType={modalType}
        formState={formState}
        onFormChange={onFormChange}
        handleNewItem={handleNewItem}
        handleEditItem={handleEditItem}
      />
    </div>
  );
}

export default ShippingPage;
