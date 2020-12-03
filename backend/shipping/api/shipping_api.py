import requests
import json

from common.utils import handle_response
from common.credentials.tokens import SHIPPING_API_TOKEN
from common.config import SHIPPING_API_URL

headers = {
    "Authentication": SHIPPING_API_TOKEN,
    "content_type": "application/json"
}


def get_quotes(carrier):
    url = f"{SHIPPING_API_URL}/{carrier}/quotes"

    response = requests.post(url, headers=headers)
    quotes = handle_response(response)

    return quotes


def create_consignment(carrier, body):
    url = f"{SHIPPING_API_URL}/{carrier}/shipments"

    data = json.dumps(body)

    response = requests.post(url, data=data, headers=headers)
    consignment = handle_response(response)

    return consignment
