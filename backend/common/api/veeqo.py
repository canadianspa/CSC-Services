import requests
import json

from ..credentials.apikeys import VEEQO_APIKEY
from ..utils import handle_response
from ..config import VEEQO_API_URL, VEEQO_API_PACKING_URL, TEMP_FOLDER_PATH
 
headers = {
    "Content-Type": "application/json",
    "x-api-key": VEEQO_APIKEY,
}


def get_orders():
    url = f"{VEEQO_API_URL}/orders?page_size=100&status=awaiting_payment"

    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders


def get_cancelled_orders():
    url = f"{VEEQO_API_URL}/orders?page_size=100&status=cancelled"

    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders


def get_order_details(order_id):
    url = f"{VEEQO_API_URL}/orders/{order_id}"

    response = requests.get(url, headers=headers)
    order = handle_response(response)

    return order


def create_order(order):
    url = f"{VEEQO_API_URL}/orders"

    data = json.dumps({"order": order})

    response = requests.post(url, headers=headers, data=data)
    order = handle_response(response)

    return order


def update_order_details(order_id, order):
    url = f"{VEEQO_API_URL}/orders/{order_id}"

    data = json.dumps({"order": order})

    response = requests.put(url, headers=headers, data=data)
    order = handle_response(response)

    return order


def download_packing_slip(order_id):
    url = f"{VEEQO_API_PACKING_URL}{order_id}"

    response = requests.get(url, headers=headers)

    file_path = f"{TEMP_FOLDER_PATH}\\packing_slip.pdf"

    try:
        with open(file_path, "wb") as f:
            f.write(response.content)
            return file_path
    except Exception as e:
        raise Exception("Could not download file ", str(e))


def create_order_note(order_id, text):
    url = f"{VEEQO_API_URL}/orders/{order_id}/notes"

    data = json.dumps({"note": {"text": text}})

    response = requests.post(url, headers=headers, data=data)
    note = handle_response(response)

    return note


def attach_shipment(order_id, allocation_id, tracking_number):
    url = f"{VEEQO_API_URL}/shipments"

    body = json.dumps(
        {
            "shipment": {
                "tracking_number_attributes": {
                    "tracking_number": tracking_number,
                },
                "carrier_id": 3,
                "notify_customer": False,
                "update_remote_order": False,
            },
            "allocation_id": allocation_id,
            "order_id": order_id,
        }
    )

    response = requests.post(url, headers=headers, data=body)
    shipment = handle_response(response)

    return shipment


def get_sellable_id(sku):
    url = f"{VEEQO_API_URL}/products?query={sku}"

    response = requests.get(url, headers=headers)
    results = handle_response(response)

    for product in results:
        for sellable in product["sellables"]:
            if sellable["sku_code"] == sku:
                return sellable["stock_entries"][0]["sellable_id"]

    raise ValueError(f"SKU: {sku} not found")
