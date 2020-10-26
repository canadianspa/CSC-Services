import React, { useState } from "react";
import "./Turnover.css";

import { getTurnover } from "../../api/BackendApi";
import Jumbotron from "../../shared/Jumbotron";
import Spinner from "../../shared/Spinner";

import moment from "moment";
import { Button } from "reactstrap";

function Turnover() {
	const [loading, setLoading] = useState(false);
	const [turnover, setTurnover] = useState(null);

	let currentMonth = moment().format("YYYY-MM");

	function handleDateSelect(event) {
		const { value } = event.target.elements.date;
		event.preventDefault();

		let monthYearString = moment(value).format("MM/YYYY");

		setTurnover(null);
		setLoading(true);
		getTurnover(monthYearString).then((json) => {
			setTurnover(json);
			setLoading(false);
		});
	}

	return (
		<div className="container">
			<Jumbotron>
				<span>{"Turnover for B&Q"}</span>
			</Jumbotron>
			<form onSubmit={handleDateSelect} className="date-form">
				<input
					type="month"
					name="date"
					min="2017-04"
					max={currentMonth}
					defaultValue={currentMonth}
				/>
				<Button type="submit" color="primary">
					Search
				</Button>
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
