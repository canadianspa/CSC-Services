import React, { useReducer, useState } from "react";
import "./ComparisonPage.css";

import * as api from "../../../api/BackendApi";
import { reducer } from "../../utils";

import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { Jumbotron, Header, Spinner, Card } from "../../Shared";

const intialDatesState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function ComparisonPage() {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState(null);

  const [dates, setDates] = useReducer(reducer, intialDatesState);

  function onSubmit() {
    const { startDate, endDate } = dates;

    if (startDate && endDate) {
      setSales(null);
      setLoading(true);

      var params = {
        dateFrom: startDate.format("DD/MM/YYYY"),
        dateTo: endDate.format("DD/MM/YYYY"),
        previousDateFrom: startDate.subtract(1, "years").format("DD/MM/YYYY"),
        previousDateTo: endDate.subtract(1, "years").format("DD/MM/YYYY"),
      };

      console.log(params);
      setLoading(false);
    } else {
      toast.dark("Please select both dates");
    }
  }

  return (
    <div className="container">
      <Jumbotron>Sales Comparison</Jumbotron>
      <Header>Select Date Range</Header>
      <DateRangePicker
        startDate={dates.startDate}
        startDateId="1"
        endDate={dates.endDate}
        endDateId="2"
        onDatesChange={setDates}
        focusedInput={dates.focusedInput}
        onFocusChange={(focusedInput) => setDates({ focusedInput: focusedInput })}
        isOutsideRange={(day) =>
          day.isBefore(moment("04/2018", "MM/YYYY")) || day.isAfter(moment())
        }
        displayFormat="DD/MM/YYYY"
      />
      <Button onClick={onSubmit} className="calc-button">
        Calculate
      </Button>

      {loading && <Spinner style={{ marginTop: "50px" }} />}
      {sales && (
        <div className="totals-wrapper">
          <Card header="Previous Year" text="PREVIOUS" />
          <Card header="Selected Year" text="CURRENT" />
        </div>
      )}
    </div>
  );
}

export default ComparisonPage;
