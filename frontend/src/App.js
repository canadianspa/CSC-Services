import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUpload,
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ImportPage from "./components/import/ImportPage";
import UpdatePage from "./components/update/UpdatePage";
import CalendarPage from "./components/calendar/CalendarPage";
import TurnoverPage from "./components/bandq/turnover/TurnoverPage";
import OrderWellPage from "./components/bandq/orderwell/OrderWellPage";
import ComparisonPage from "./components/bandq/comparison/ComparisonPage";
import ShippingCreatePage from "./components/shipping/create/ShippingCreatePage";
import ShippingItemsPage from "./components/shipping/items/ShippingItemsPage";
import PageNotFound from "./components/PageNotFound";

library.add({
  faUpload,
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faTimes,
  faChevronDown,
});

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <ToastContainer hideProgressBar={true} autoClose={3000} />

        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/update" component={UpdatePage} />
            <Route path="/import/" component={ImportPage} />
            <Route path="/calendar/" component={CalendarPage} />

            <Route path="/bandq/turnover" component={TurnoverPage} />
            <Route path="/bandq/orderwell" component={OrderWellPage} />
            <Route path="/bandq/comparison" component={ComparisonPage} />

            <Route path="/shipping/create" component={ShippingCreatePage} />
            <Route path="/shipping/items" component={ShippingItemsPage} />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
