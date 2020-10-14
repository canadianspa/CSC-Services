import requests
import json

from ..config import VEEQO_ORDERS_URL, VEEQO_PRODUCTS_URL
from ..credentials.apikeys import VEEQO_APIKEY
from ..api.utils import handle_response
from ..api.postcoder import check_postcode

headers = {"Content-Type": "application/json", "x-api-key": VEEQO_APIKEY}


def upload_order(order_json):
    url = VEEQO_ORDERS_URL
    order_string = json.dumps({"order": order_json})

    response = requests.post(url, headers=headers, data=order_string)
    response_json = handle_response(response)

    print(response_json)


def get_sellable_id(sku):
    url = f"{VEEQO_PRODUCTS_URL}?query={sku}"

    response = requests.get(url, headers=headers)
    response_json = handle_response(response)

    for product in response_json:
        for sellable in product['sellables']:
            if sellable['sku_code'] == sku:
                return sellable['stock_entries'][0]['sellable_id']

    raise Exception("ERROR SEARCHING PRODUCTS: " + response_json)
