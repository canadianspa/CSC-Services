import requests

from ..config import VEEQO_ORDERS_URL, VEEQO_PRODUCTS_URL
from ..credentials.apikeys import VEEQO_APIKEY
from ..api.utils import handle_response
from ..api.postcoder import check_postcode

headers = {"Content-Type": "application/json", "x-api-key": VEEQO_APIKEY}


def upload_order(order):
    url = VEEQO_ORDERS_URL

    address_array = check_postcode(
        order.customer.postcode, order.customer.address1)

    # If there is one returned address, it is a correct address
    if len(address_array) == 1:
        print(address_array)
        order_string = """TEST"""

        #response = requests.post(url, headers=headers, data=order_string)
        #json = handle_response(response)

        # print(json)
    else:
        raise Exception("Handle wrong address")


def get_sellable_id(sku):
    url = f"{VEEQO_PRODUCTS_URL}?query={sku}"

    response = requests.get(url, headers=headers)
    json = handle_response(response)

    return json[0]['sellables'][0]['stock_entries'][0]['sellable_id']
