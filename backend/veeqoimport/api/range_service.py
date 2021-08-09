import requests

from common.credentials.logins import RANGE_USERNAME, RANGE_PASSWORD
from common.config import (
    RANGE_PORTAL_LOGIN_URL, 
    RANGE_PORTAL_ORDERS_URL, 
    RANGE_PORTAL_STOCK_URL
)
from common.utils import handle_response

class RangeService:
    def __init__(self):
        # Login
        session = requests.Session()
        login_url = RANGE_PORTAL_LOGIN_URL

        login_body = {
            "user": RANGE_USERNAME,
            "pass": RANGE_PASSWORD
        }

        session.post(login_url, data=login_body)

        self.session = session


    def get_stock(self):
        url = RANGE_PORTAL_STOCK_URL

        params = {
            "start": 0,
            "length": 200
        }

        stock_response = self.session.post(url, data=params)
        stock = handle_response(stock_response)

        return stock['data']


    def get_orders(self):
        pending_orders_url = RANGE_PORTAL_ORDERS_URL+"?type=pending&supplier=5778"

        orders_response = self.session.post(pending_orders_url)
        orders = handle_response(orders_response)

        orders_list = []
    
        for order in orders['data']:
            order_url = f"{RANGE_PORTAL_ORDERS_URL}?id={order['order_id']}&supplier=5778"

            order_response = self.session.post(order_url)
            order = handle_response(order_response)
            orders_list.append(order)

        return orders_list
        