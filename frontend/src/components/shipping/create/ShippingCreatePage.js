import React, { useState, useReducer, useEffect } from "react";
import "./ShippingCreatePage.css";

import * as api from "../../../api/BackendApi";
import { reducer } from "../../utils";

import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Jumbotron, Spinner } from "../../Shared";
import InitialView from "./InitialView";
import ItemsView from "./ItemsView";

const intialFormState = {
  orderUrl: "",
  carrier: null,
  account: null,
  items: [],
};

function ShippingCreatePage() {
  const [loading, setLoading] = useState(true);
  const [initialView, setInitialView] = useState(true);
  const [formState, setFormState] = useReducer(reducer, intialFormState);

  const [carriers, setCarriers] = useState([]);
  const [items, setItems] = useState([]);

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
    } else if (name === "items") {
      setFormState({
        items: data,
      });
    }
  }

  function handleCreateShipment() {
    toast.dark("Creating shipment...");

    var params = {
      shipment: {
        orderUrl: formState.orderUrl,
        carrier: formState.carrier.name,
        account: formState.account,
        items: formState.items,
      },
    };

    api.createShipment(params).then((reponse) => {
      if (reponse.error) {
        toast.dark(reponse.message);
      } else {
        toast.dark("Created");

        setInitialView(true);
        setFormState({
          ...intialFormState,
          carrier: carriers[0],
          account: carriers[0].accounts,
        });
      }
    });
  }

  function updateView() {
    setInitialView(!initialView);
  }

  return (
    <div className="container">
      <Jumbotron>Create Shipment</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : initialView ? (
        <>
          <InitialView
            carriers={carriers}
            formState={formState}
            updateFormState={updateFormState}
            onFormChange={onFormChange}
          />
          <Button onClick={updateView}>Next</Button>
        </>
      ) : (
        <>
          <ItemsView
            items={items}
            formState={formState}
            updateFormState={updateFormState}
          />
          <div className="centered-parent">
            <Button color="danger" onClick={updateView}>
              Back
            </Button>
            <Button onClick={handleCreateShipment}>Create</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShippingCreatePage;
