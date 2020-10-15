import requests
from datetime import datetime

from common.config import VEEQO_ORDERS_URL
from common.credentials.apikeys import VEEQO_APIKEY

from common.utils import handle_response

def get_orders():
    headers = {"Content-Type": "application/json", "x-api-key": VEEQO_APIKEY}

    now = datetime.now()
    url = '{VEEQO_ORDERS_URL}?created_at_min=%s&page_size=100' % now.strftime("%Y-%m-%d")

    response = requests.get(url, headers=headers)
    orders = handle_response(response)

    return orders
