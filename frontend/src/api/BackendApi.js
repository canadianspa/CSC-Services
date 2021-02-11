import { handleResponse } from "./ApiUtils";
import { API_BASE_URL } from "../config";

export function convertImportFile(params) {
  const { vendor, file } = params;

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

export function importOrders(params) {
  const { orders } = params;

  let url = `${API_BASE_URL}/import/orders`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(orders),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getPostcodeAddresses(params) {
  const { postcode } = params;

  let url = `${API_BASE_URL}/postcoder?postcode=${postcode}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function updateSpreadsheet(params) {
  const { vendor } = params;

  let url = `${API_BASE_URL}/update/${vendor}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getTurnover(params) {
  const { start, end } = params;

  let url = `${API_BASE_URL}/bandq/turnover?start=${start}&end=${end}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getOrderWell() {
  let url = `${API_BASE_URL}/bandq/orderwell`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getVeeqoOrder(params) {
  const { orderUrl } = params;

  let url = `${API_BASE_URL}/veeqo?url=${orderUrl}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getCalendars() {
  let url = `${API_BASE_URL}/calendar/calendars`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function createEvent(params) {
  const { event } = params;

  let url = `${API_BASE_URL}/calendar/create`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function dbRead(params) {
  const { database, collection } = params;

  let url = `${API_BASE_URL}/database/${database}/${collection}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function dbCreate(params) {
  const { database, collection, body } = params;

  let url = `${API_BASE_URL}/database/${database}/${collection}`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function dbUpdate(params) {
  const { database, collection, body, _id } = params;

  let url = `${API_BASE_URL}/database/${database}/${collection}/${_id}`;

  let options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function dbDelete(params) {
  const { database, collection, _id } = params;

  let url = `${API_BASE_URL}/database/${database}/${collection}/${_id}`;

  let options = {
    method: "DELETE",
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function convertVeeqoCSVFile(params) {
  const { file } = params;

  let url = `${API_BASE_URL}/shipping/convert`;

  let formData = new FormData();
  formData.append("file", file);

  let options = {
    method: "POST",
    body: formData,
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getQuotes() {
  let url = `${API_BASE_URL}/shipping/quotes`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function createShipments(params) {
  const { orders, service, parcels } = params;

  let url = `${API_BASE_URL}/shipping/create`;

  var body = {
    orders: orders,
    service_code: service.service_code,
    parcels: parcels,
  };

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}
