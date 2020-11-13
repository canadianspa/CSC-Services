import { handleResponse } from "./ApiUtils";
import { API_BASE_URL } from "../config";

export function getOrdersJson(vendor, file) {
  let url = `${API_BASE_URL}/import/convert/${vendor}`;

  let options = {
    method: "POST",
  };

  if (file) {
    let formData = new FormData();
    formData.append("file", file);
    options.body = formData;
  }

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function importOrders(orders) {
  let url = `${API_BASE_URL}/import/orders`;

  let options = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(orders),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getPostcodeAddresses(postcode) {
  let url = `${API_BASE_URL}/postcoder?postcode=${postcode}`;

  return fetch(url, {
    method: "GET",
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function updateSpreadsheet(vendor) {
  let url = `${API_BASE_URL}/update/${vendor}`;

  return fetch(url, {
    method: "GET",
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getTurnover(date) {
  let url = `${API_BASE_URL}/turnover?date=${date}`;

  return fetch(url, {
    method: "GET",
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getOrderWell() {
  let url = `${API_BASE_URL}/orderwell`;

  return fetch(url, {
    method: "GET",
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}
