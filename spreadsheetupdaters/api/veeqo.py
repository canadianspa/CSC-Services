import requests

from common.config import VEEQO_ORDERS_URL
from common.credentials.apikeys import VEEQO_APIKEY
from common.utils import handle_response

def get_orders():
    headers = {"Content-Type": "application/json", "x-api-key": VEEQO_APIKEY}

    url = f"{VEEQO_ORDERS_URL}?page_size=100&status=awaiting_payment"
    
    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders
