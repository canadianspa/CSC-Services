import React, { useState, useReducer, useEffect } from "react";

import * as api from "../../../api/BackendApi";
import { reducer } from "../../utils";

import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Jumbotron, Spinner } from "../../Shared";
import ParcelsSelect from "./ParcelsSelect";
import CreateShipmentForm from "./CreateShipmentForm";

const intialFormState = {
  orderUrl: "",
  carrier: null,
  service: null,
  parcels: [],
};

function ShippingCreatePage() {
  const [loading, setLoading] = useState(true);
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
      setInitialState(carriers);
    });

    setLoading(false);
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function updateFormState(value, name) {
    setFormState({ [name]: value });
  }

  function handleCreateShipment() {
    var params = {
      shipment: {
        order_url: formState.orderUrl,
        carrier: formState.carrier.code,
        service: formState.service.code,
        parcels: formState.parcels,
      },
    };

    var valid = validateShipment();

    if (valid) {
      toast.dark("Creating shipment...");

      api.createShipment(params).then((reponse) => {
        if (reponse.error) {
          toast.dark(reponse.message);
        } else {
          toast.dark("Created shipment");

          setInitialState();
          buildLabelWindow(reponse.label);
        }
      });
    } else {
      toast.dark("Parcels & Veeqo URL cannot be empty");
    }
  }

  function validateShipment() {
    const { parcels, orderUrl } = formState;

    return parcels.length > 0 && orderUrl !== "" ? true : false;
  }

  function setInitialState(carriers) {
    setFormState(
      carriers
        ? {
            ...intialFormState,
            carrier: carriers[0],
            service: carriers[0].services[0],
          }
        : {
            orderUrl: "",
            parcels: [],
          }
    );
  }

  // prettier-ignore
  function calculateWeight() {
    return formState.parcels.reduce(
      (a, b) => a + b.quantity * b.weight, 0
    );
  }

  function buildLabelWindow(label) {
    let pdfWindow = window.open("");

    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(label) +
        "'></iframe>"
    );
  }

  return (
    <div className="container">
      <Jumbotron>Create Shipment</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : (
        <>
          <CreateShipmentForm
            carriers={carriers}
            formState={formState}
            updateFormState={updateFormState}
            onFormChange={onFormChange}
          />
          <ParcelsSelect
            items={items}
            parcels={formState.parcels}
            updateFormState={updateFormState}
          />
          <h6>Total weight: {calculateWeight()} kg</h6>
          <Button onClick={handleCreateShipment}>Create</Button>
        </>
      )}
    </div>
  );
}

export default ShippingCreatePage;
