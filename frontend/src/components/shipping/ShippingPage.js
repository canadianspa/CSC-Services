import React, { useState, useReducer, useEffect } from "react";
import "./ShippingPage.css";

import * as api from "../../api/BackendApi";

import { Button, Input } from "reactstrap";
import Spinner from "../shared/Spinner";
import Jumbotron from "../shared/Jumbotron";
import Select from "../shared/Select";
import ShippingPageModal from "./ShippingPageModal";
import ItemsTable from "./ItemsTable";

const intialFormState = {
  name: "",
  height: "",
  width: "",
  weight: "",
  orderUrl: "",
  carrier: null,
  account: null,
  items: [],
};

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

function ShippingPage() {
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState([]);
  const [items, setItems] = useState([]);
  const [formState, setFormState] = useReducer(reducer, intialFormState);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const toggle = () => setModalOpen(!modalOpen);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await api.getItems().then((items) => {
      setItems(items);
    });

    await api.getCarriers().then((carriers) => {
      setCarriers(carriers);
      updateFormState(carriers[0], "carrier");
    });

    setLoading(false);
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function updateFormState(data, name) {
    if (name === "carrier") {
      setFormState({
        carrier: data,
        account: data.accounts ? data.accounts[0] : null,
      });
    }
  }

  function handleNewItem() {
    console.log("new");
    toggle();
  }

  function handleEditItem() {
    console.log("edit");
    toggle();
  }

  function handleDeleteItem(event) {
    const { id } = event.target;
    var index = parseInt(id);

    var updatedItems = formState.items.filter((item, idx) => idx !== index);
    setFormState({ items: updatedItems });
  }

  function onButtonClick(event) {
    const { name } = event.target;

    setModalType(name);

    if (name === "newItem") {
      setFormState({ intialFormState });
    } else if (name === "editItem") {
      // TODO USE CLICKED ITEM
      setFormState({
        name: "test1",
        height: "12",
        width: "14",
        weight: "12",
      });
    }

    toggle();
  }

  function handleCreateShipment() {
    var params = {
      shipment: {
        orderUrl: formState.orderUrl,
        carrier: formState.carrier.name,
        account: formState.account,
        items: formState.items,
      },
    };

    api.createShipment(params).then((json) => {
      console.log(json);
    });
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
          <h5>Enter Veeqo order URL</h5>
          <Input
            type="text"
            name="orderUrl"
            style={{ width: "400px" }}
            value={formState.orderUrl}
            onChange={onFormChange}
          />
          <h5>Select Carrier</h5>
          <Select
            name="carrier"
            useObjects={true}
            options={carriers}
            objectTitleKey="title"
            onChange={updateFormState}
          />
          {formState.carrier.accounts && (
            <>
              <h5>Select Account</h5>
              <Select
                name="account"
                options={formState.carrier.accounts}
                onChange={onFormChange}
              />
            </>
          )}
          <h5>Items</h5>
          <ItemsTable items={formState.items} handleDeleteItem={handleDeleteItem} />
          <Button color="primary" name="newItem" onClick={onButtonClick}>
            New item
          </Button>
          <Button name="editItem" onClick={onButtonClick}>
            Edit item
          </Button>
          <Button name="createShipment" onClick={handleCreateShipment}>
            Create Shipment
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
