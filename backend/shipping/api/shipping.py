import requests
import json

from common.utils import handle_response
from common.config import SHIPPING_API_URL
from common.credentials.tokens import SHIPPING_API_TOKEN

headers = {
    "Content-Type": "application/json",
    "Authentication": SHIPPING_API_TOKEN,
}


def get_quotes():
    url = f"{SHIPPING_API_URL}/quotes"

    response = requests.post(url, headers=headers)
    quotes = handle_response(response)

    return quotes

def create_shipment(body):
    url = f"{SHIPPING_API_URL}/shipments"

    data = json.dumps(body)

    response = requests.post(url, headers=headers, data=data)
    quotes = handle_response(response)

    return quotes