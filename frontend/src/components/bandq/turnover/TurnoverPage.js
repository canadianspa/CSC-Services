import React, { useState } from "react";
import styles from "./TurnoverPage.module.css";

import * as api from "../../../api/BackendApi";

import moment from "moment";
import { toast } from "react-toastify";
import { Button, Form, Input } from "reactstrap";
import { Jumbotron, Spinner, Card, Header } from "../../Shared";

function TurnoverPage() {
  const [loading, setLoading] = useState(false);
  const [turnover, setTurnover] = useState(null);

  let currentMonth = moment().format("YYYY-MM");

  function onSubmit(event) {
    event.preventDefault();

    const { value } = event.target.elements.date;

    if (value) {
      setTurnover(null);
      setLoading(true);

      var params = {
        start: moment(value).startOf("month").format("YYYY/MM/DD"),
        end: moment(value).endOf("month").format("YYYY/MM/DD"),
      };

      api.getTurnover(params).then((json) => {
        setTurnover(json);
        setLoading(false);
      });
    } else {
      toast.dark("Please select a date");
    }
  }

  return (
    <>
      <Jumbotron>Turnover</Jumbotron>

      <Form onSubmit={onSubmit} className={styles.dateForm}>
        <Header>Select Month</Header>
        <Input type="month" name="date" min="2017-04" max={currentMonth} />
        <Button type="submit">Calculate</Button>
      </Form>

      {loading && <Spinner />}
      {turnover && (
        <div className={styles.totalsWrapper}>
          <Card header="Total excluding VAT" text={`£${turnover.total_ex_vat}`} />
          <Card header="Total including VAT" text={`£${turnover.total_with_vat}`} />
        </div>
      )}
    </>
  );
}

export default TurnoverPage;
