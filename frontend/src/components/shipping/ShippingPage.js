import React, { useState, useEffect } from "react";
import "./ShippingPage.css";

import * as api from "../../api/BackendApi";

import Spinner from "../shared/Spinner";
import Jumbotron from "../shared/Jumbotron";
import ShippingPageModal from "./ShippingPageModal";

import { Button } from "reactstrap";

function ShippingPage() {
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState([]);
  const [items, setItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    async function fetchData() {
      await api.getCarriers().then((carriers) => setCarriers(carriers));
      await api.getItems().then((items) => setItems(JSON.parse(items)));
      setLoading(false);
    }

    fetchData();
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  function handleAddItem(event) {
    event.preventDefault();

    const { value } = event.target.elements.item;

    var item = items.find((item) => item.name === value);
    console.log(item);
    toggle();
  }

  function handleNewItem(event) {
    const { name, height, width, weight } = event.target.elements;
    console.log(name, height, width, weight);
    event.preventDefault();
    toggle();
  }

  function handleEditItem(event) {
    const { name, height, width, weight } = event.target.elements;
    console.log(name.value, height.value, width.value, weight.value);
    event.preventDefault();
    toggle();
  }

  function onButtonClick(event) {
    const { name } = event.target;
    setModalType(name);
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
        <>
          <h4>Choose carrier</h4>
          <h4>Items</h4>
          <Button name="addItem" onClick={onButtonClick}>
            Add item
          </Button>
          <Button name="newItem" onClick={onButtonClick}>
            New item
          </Button>
          <Button name="editItem" onClick={onButtonClick}>
            Edit item
          </Button>
        </>
      )}
      <ShippingPageModal
        isOpen={isOpen}
        toggle={toggle}
        modalType={modalType}
        items={items}
        handleNewItem={handleNewItem}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
      />
    </div>
  );
}

export default ShippingPage;
