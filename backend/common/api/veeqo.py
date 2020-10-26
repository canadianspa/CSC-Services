import requests
import json

from ..config import VEEQO_API_ORDERS_URL, VEEQO_API_PRODUCTS_URL
from ..credentials.apikeys import VEEQO_APIKEY
from ..utils import handle_response


headers = {"Content-Type": "application/json", "x-api-key": VEEQO_APIKEY}


def get_orders():
    url = f"{VEEQO_API_ORDERS_URL}?page_size=100&status=awaiting_payment"

    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders


def import_order(order_json):
    url = VEEQO_API_ORDERS_URL

    order_string = json.dumps({"order": order_json})

    response = requests.post(url, headers=headers, data=order_string)
    response_json = handle_response(response)

    return response_json['number']


def get_sellable_id(sku):
    url = f"{VEEQO_API_PRODUCTS_URL}?query={sku}"

    response = requests.get(url, headers=headers)
    response_json = handle_response(response)

    for product in response_json:
        for sellable in product['sellables']:
            if sellable['sku_code'] == sku:
                return sellable['stock_entries'][0]['sellable_id']

    raise ValueError(f"{sku} not found")
