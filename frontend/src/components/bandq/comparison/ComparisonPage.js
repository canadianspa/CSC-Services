import React, { useReducer, useState } from "react";
import styles from "./ComparisonPage.module.css";

import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

import * as api from "../../../api/BackendApi";
import { reducer } from "../../utils";
import { Jumbotron, Header, Spinner, Card } from "../../Shared";

const intialDatesState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function ComparisonPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useReducer(reducer, intialDatesState);

  const [sales, setSales] = useState(null);
  const [previousSales, setPreviousSales] = useState(null);

  const setFocusedInput = (focusedInput) => setDates({ focusedInput: focusedInput });

  async function fetchData(params, previousParams) {
    await api.getTurnover(params).then((json) => {
      setSales(json);
    });
    await api.getTurnover(previousParams).then((json) => {
      setPreviousSales(json);
    });
  }

  async function onSubmit() {
    const { startDate, endDate } = dates;

    if (startDate && endDate) {
      setSales(null);
      setPreviousSales(null);
      setLoading(true);

      var params = {
        start: startDate.format("YYYY/MM/DD"),
        end: endDate.format("YYYY/MM/DD"),
      };

      var previousParams = {
        start: startDate.clone().subtract(1, "years").format("YYYY/MM/DD"),
        end: endDate.clone().subtract(1, "years").format("YYYY/MM/DD"),
      };

      await fetchData(params, previousParams);

      setLoading(false);
    } else {
      toast.dark("Please select both dates");
    }
  }

  return (
    <>
      <Jumbotron>Sales Comparison</Jumbotron>
      <Header>Select Date Range</Header>
      <DateRangePicker
        startDate={dates.startDate}
        startDateId="1"
        endDate={dates.endDate}
        endDateId="2"
        onDatesChange={setDates}
        focusedInput={dates.focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={(day) =>
          day.isBefore(moment("04/2018", "MM/YYYY")) || day.isAfter(moment())
        }
        displayFormat="DD/MM/YYYY"
      />
      <Button onClick={onSubmit} className={styles.calcButton}>
        Calculate
      </Button>

      {loading && <Spinner />}
      {sales && previousSales && (
        <div className={styles.totalsWrapper}>
          <Card
            header={"Previous Year"}
            text={previousSales.total_with_vat}
            description={"*With VAT"}
          />
          <Card
            header={"Selected Year"}
            text={sales.total_with_vat}
            description={"*With VAT"}
          />
        </div>
      )}
    </>
  );
}

export default ComparisonPage;
