import React, { useEffect, useState, useReducer } from "react";

import { toast } from "react-toastify";

import * as api from "../../api/BackendApi";
import { reducer } from "../utils";
import { Jumbotron, Spinner, FileUploadArea, Header } from "../Shared";
import ShipmentForm from "./ShipmentForm";

const initialFormState = {
  width: "",
  length: "",
  height: "",
  weight: "",
  service: null,
  parcels: [],
};

function BulkShippingPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("initial");
  const [formState, setFormState] = useReducer(reducer, initialFormState);

  const [file, setFile] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function fetchData() {
    api.getQuotes().then(handleQuotes);
  }

  function handleQuotes(quotes) {
    setFormState({ service: quotes[0] });
    setQuotes(quotes);
    setLoading(false);
  }

  function onFormChange(event) {
    const { name, value } = event.target;
    setFormState({ [name]: value });
  }

  function onFileSubmit(file) {
    setLoading(true);

    var params = {
      file: file,
    };

    api.convertVeeqoCSVFile(params).then((response) => {
      if (response.error) {
        toast.dark(response.message);
      } else {
        setFile(file);
        setView("shipment");
        setOrders(response);
        console.log(response);
      }

      setLoading(false);
    });
  }

  return (
    <>
      <Jumbotron>Bulk Shipping</Jumbotron>
      {loading ? (
        <Spinner style={{ marginTop: "120px" }} />
      ) : view === "initial" ? (
        <>
          <Header>Select Veeqo CSV</Header>
          <FileUploadArea type=".csv" onSubmit={onFileSubmit} />
        </>
      ) : (
        <>
          <ShipmentForm
            onFormChange={onFormChange}
            file={file}
            orders={orders}
            quotes={quotes}
          />
        </>
      )}
    </>
  );
}

export default BulkShippingPage;
