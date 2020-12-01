import React from "react";
import "./Shared.css";

import { Spinner as ReactStrapSpinner } from "reactstrap";

function Spinner({ style }) {
	return <ReactStrapSpinner color="dark" className="spinner" style={style} />;
}

export default Spinner;
