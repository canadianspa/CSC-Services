import React, { useState, useEffect } from "react";
import "./DeliveriesPage.css";

import * as api from "../../api/BackendApi";

import { Jumbotron } from "../Shared";
import moment from "moment";

function DeliveriesPage() {
  const [days, setDays] = useState([]);

  useEffect(() => {}, []);

  function renderDays() {
    var days = [];
    for (var i = 0; i < 35; i++) {
      days.push(<div key={i}>{i}</div>);
    }
    return days;
  }

  return (
    <div className="container">
      <Jumbotron>
        <span>Deliveries</span>
      </Jumbotron>
      <div className="month-wrapper">
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
        <span>Sunday</span>
        {renderDays()}
      </div>
    </div>
  );
}

export default DeliveriesPage;
