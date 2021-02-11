import React, { useEffect, useState, useReducer } from "react";

import { toast } from "react-toastify";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { Jumbotron, Spinner } from "../Shared";
import InitialView from "./InitialView";
import OrdersView from "./OrdersView";
import ShipmentView from "./ShipmentView";
import BulkShippingPageModal from "./BulkShippingPageModal";

const initialFormState = {
  width: "",
  length: "",
  height: "",
  weight: "",
  file: null,
  service: null,
  parcels: [],
};

function BulkShippingPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("initial");
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useReducer(reducer, initialFormState);

  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    api.getQuotes().then((response) => {
      setQuotes(response);
      setLoading(false);
    });
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function onResponse(response, onSuccess) {
    if (response.error) {
      toast.dark(response.message);
    } else {
      onSuccess(response);
    }
  }

  function onFileSubmit(file) {
    setLoading(true);

    var params = {
      file: file,
    };

    const onSuccess = (response) => {
      setFormState({ file: file });
      setOrders(response);
      setView("orders");
    };

    api.convertVeeqoCSVFile(params).then((response) => {
      setLoading(false);
      onResponse(response, onSuccess);
    });
  }

  function onClick(event) {
    const { name, id } = event.currentTarget;

    if (name === "continue") {
      setView("shipment");
    } else if (name === "ship") {
      onCreateShipments();
    } else if (name === "cancel") {
      setFormState(initialFormState);
      setView("initial");
    } else if (name === "openModal") {
      toggle();
    } else if (name === "addParcel") {
      onAddParcel();
    } else if (name === "deleteParcel") {
      onDeleteParcel(id);
    }
  }

  function onCreateShipments() {
    const { parcels, service } = formState;

    if (parcels.length > 0) {
      setLoading(true);

      var params = {
        orders: orders,
        service: service,
        parcels: parcels,
      };

      const onSuccess = (response) => {
        toast.dark("Created " + response.length + " shipments");
        setFormState(initialFormState);
        setView("initial");
      };

      api.createShipments(params).then((response) => {
        setLoading(false);
        onResponse(response, onSuccess);
      });
    } else {
      toast.dark("Shipment must contain at least one parcel");
    }
  }

  function onAddParcel() {
    const { height, width, length, weight } = formState;

    if (height && width && length && weight) {
      var parcel = {
        dimensions: {
          height: height,
          width: width,
          length: length,
          unit: "cm",
        },
        weight_in_grams: weight,
      };

      setFormState({
        width: "",
        length: "",
        height: "",
        weight: "",
        parcels: [...formState.parcels, parcel],
      });
      toggle();
    }
  }

  function onDeleteParcel(id) {
    var parcels = formState.parcels.filter(
      (parcel, index) => index !== parseInt(id)
    );
    setFormState({ parcels: parcels });
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
    <>
      <Jumbotron>Bulk Shipping</Jumbotron>
      {loading ? (
        <Spinner />
      ) : view === "initial" ? (
        <InitialView onFileSubmit={onFileSubmit} />
      ) : view === "orders" ? (
        <OrdersView orders={orders} formState={formState} onClick={onClick} />
      ) : (
        <ShipmentView
          quotes={quotes}
          formState={formState}
          onFormChange={onFormChange}
          onClick={onClick}
        />
      )}
      <BulkShippingPageModal
        isOpen={isOpen}
        toggle={toggle}
        formState={formState}
        onFormChange={onFormChange}
        onClick={onClick}
      />
    </>
  );
}

export default BulkShippingPage;
