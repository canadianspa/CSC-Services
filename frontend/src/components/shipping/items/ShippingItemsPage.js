import React, { useState, useReducer, useEffect } from "react";
import "./ShippingItemsPage.css";

import * as api from "../../../api/BackendApi";
import { reducer } from "../../utils";

import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Jumbotron, Spinner, Header } from "../../Shared";
import Item from "./Item";
import ItemForm from "./ItemForm";

const intialFormState = {
  _id: null,
  name: "",
  height: "",
  width: "",
  length: "",
  weight: "",
};

function ShippingItemsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  const [formState, setFormState] = useReducer(reducer, intialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    api.getItems().then((items) => {
      setItems(items);
      setLoading(false);
    });
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function onCreateClick() {
    setFormState(intialFormState);
  }

  function onButtonClick(event) {
    const { name } = event.target;

    var params = {
      id: formState._id ? formState._id.$oid : null,
      item: {
        name: formState.name,
        height: formState.height,
        width: formState.width,
        length: formState.length,
        weight: formState.weight,
      },
    };

    var valid = validateForm();

    if (valid) {
      if (name === "delete") {
        api.deleteItem(params).then((response) => {
          if (response.error) {
            toast.dark(response.message);
          } else {
            updateItems(response);
          }
        });
      } else {
        api.updateItem(params).then((response) => {
          if (response.error) {
            toast.dark(response.message);
          } else {
            updateItems(response);
          }
        });
      }
    }
  }

  function updateItems(response) {
    var updatedItems = [...items];

    if (response.status === "created") {
      setFormState(response.item);
      updatedItems.push(response.item);
    } else if (response.status === "updated") {
      var index = items.findIndex(
        (item) => item._id.$oid === response.item._id.$oid
      );
      updatedItems[index] = response.item;
    } else if (response.status === "deleted") {
      updatedItems = items.filter((item) => item._id.$oid !== response._id);
      setFormState(intialFormState);
    }
    setItems(updatedItems);
  }

  function validateForm() {
    const { name, height, width, length, weight } = formState;

    if (
      name === "" ||
      height === "" ||
      width === "" ||
      weight === "" ||
      length === ""
    ) {
      toast.dark("Form elements cannot be empty.");
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="container">
      <Jumbotron>Edit Items</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <>
          <Button color="primary" size="sm" onClick={onCreateClick}>
            Create Item
          </Button>
          <div className="items-menu-container">
            <div className="items-menu">
              <Header>Items</Header>
              {items.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  onClick={setFormState}
                  formState={formState}
                />
              ))}
            </div>
            <div className="items-form">
              {formState._id ? (
                <>
                  <Header>Edit Item</Header>
                  <ItemForm formState={formState} onFormChange={onFormChange} />
                  <div className="centered-parent">
                    <Button name="delete" color="danger" onClick={onButtonClick}>
                      Delete
                    </Button>
                    <Button name="update" onClick={onButtonClick}>
                      Update
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Header>Create Item</Header>
                  <ItemForm formState={formState} onFormChange={onFormChange} />
                  <Button name="create" onClick={onButtonClick}>
                    Create
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShippingItemsPage;
