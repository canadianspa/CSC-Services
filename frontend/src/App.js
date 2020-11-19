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
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ImportPage from "./components/import/ImportPage";
import UpdatePage from "./components/update/UpdatePage";
import Turnover from "./components/turnover/Turnover";
import OrderWell from "./components/orderwell/OrderWell";
import ShippingCreatePage from "./components/shipping/create/ShippingCreatePage";
import ShippingItemsPage from "./components/shipping/items/ShippingItemsPage";
import PageNotFound from "./components/PageNotFound";

library.add(faUpload);
library.add(faPlus);
library.add(faPencilAlt);
library.add(faTrashAlt);
library.add(faTimes);

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
            <Route path="/turnover" component={Turnover} />
            <Route path="/orderwell/" component={OrderWell} />
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
