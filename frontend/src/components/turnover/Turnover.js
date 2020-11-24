import React, { useState } from "react";
import "./Turnover.css";

import * as api from "../../api/BackendApi";

import moment from "moment";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import Jumbotron from "../shared/Jumbotron";
import Spinner from "../shared/Spinner";

function Turnover() {
  const [loading, setLoading] = useState(false);
  const [turnover, setTurnover] = useState(null);

  let currentMonth = moment().format("YYYY-MM");

  function handleDateSelect(event) {
    event.preventDefault();

    const { value } = event.target.elements.date;

    if (value) {
      let monthYearString = moment(value).format("MM/YYYY");

      setTurnover(null);
      setLoading(true);

      var params = {
        date: monthYearString,
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
    <div className="container">
      <Jumbotron>
        <span>{"Turnover for B&Q"}</span>
      </Jumbotron>
      <h5>Select Month</h5>
      <form onSubmit={handleDateSelect} className="date-form">
        <input type="month" name="date" min="2017-04" max={currentMonth} />
        <Button type="submit">Calculate</Button>
      </form>
      {loading && <Spinner style={{ marginTop: "50px" }} />}
      {turnover && (
        <div className="totals-wrapper">
          <div className="info-card">
            <label>Total excluding VAT</label>
            <span>£{turnover.total_ex_vat}</span>
          </div>
          <div className="info-card">
            <label>Total including VAT</label>
            <span>£{turnover.total_with_vat}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Turnover;
