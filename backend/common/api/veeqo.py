import requests
import json

from ..credentials.apikeys import VEEQO_APIKEY
from ..utils import handle_response
from ..config import (
    VEEQO_API_ORDERS_URL,
    VEEQO_API_PRODUCTS_URL,
    VEEQO_API_SHIPMENTS_URL,
)

headers = {
    "Content-Type": "application/json",
    "x-api-key": VEEQO_APIKEY,
}


def get_orders():
    url = f"{VEEQO_API_ORDERS_URL}?page_size=100&status=awaiting_payment"

    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders


def get_order_details(order_id):
    url = f"{VEEQO_API_ORDERS_URL}/{order_id}"

    response = requests.get(url, headers=headers)
    updated_order = handle_response(response)

    return updated_order


def update_order_details(order_id, order):
    url = f"{VEEQO_API_ORDERS_URL}/{order_id}"

    data = json.dumps({"order": order})

    response = requests.put(url, headers=headers, data=data)
    order = handle_response(response)

    return order


def create_order_note(order_id, text):
    url = f"{VEEQO_API_ORDERS_URL}/{order_id}/notes"

    data = json.dumps({"note": {"text": text}})

    response = requests.post(url, headers=headers, data=data)
    response_json = handle_response(response)

    return response_json


def create_order(order):
    url = VEEQO_API_ORDERS_URL

    data = json.dumps({"order": order})

    response = requests.post(url, headers=headers, data=data)
    response_json = handle_response(response)

    return response_json["number"]


def create_shipment(order_id, allocation_id, tracking_number):
    url = VEEQO_API_SHIPMENTS_URL

    body = json.dumps(
        {
            "shipment": {
                "tracking_number_attributes": {"tracking_number": tracking_number},
                "carrier_id": 3,
                "notify_customer": False,
                "update_remote_order": False,
            },
            "allocation_id": allocation_id,
            "order_id": order_id,
        }
    )

    response = requests.post(url, headers=headers, data=body)
    response_json = handle_response(response)

    return response_json["order_id"]


def get_sellable_id(sku):
    url = f"{VEEQO_API_PRODUCTS_URL}?query={sku}"

    response = requests.get(url, headers=headers)
    response_json = handle_response(response)

    for product in response_json:
        for sellable in product["sellables"]:
            if sellable["sku_code"] == sku:
                return sellable["stock_entries"][0]["sellable_id"]

    raise ValueError(f"SKU: {sku} not found")
