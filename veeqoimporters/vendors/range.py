from ..config import RANGE_CHANNEL_ID, RANGE_BILLING_ID, TAX_RATE
from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from ..api.veeqo import get_sellable_id


def range_json_to_customer(json):
    order_details = json['order_details']

    first_name = order_details['customer_name'].rsplit(' ', 1)[0]
    last_name = order_details['customer_name'].split()[-1]
    address1 = order_details['building_name_number'] + " " + order_details['street']
    city = order_details['town']
    county = ""
    postcode = order_details['postcode']
    country = order_details['country']
    phone = order_details['telephone']
    email = order_details['email']

    return Customer(first_name, last_name, address1, "", city, county, postcode, country, phone, email)


def range_json_to_item(json_item):
    sku = json_item['supplier_ref']
    sellable_id = get_sellable_id(sku)
    price_per_unit = json_item['price_per_unit']
    quantity = json_item['quantity']

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def range_json_to_order(json, customer, items):
    order_details = json['order_details']

    order_disp = order_details['order_disp']
    order_id = order_details['order_id']
    notes = f'{order_disp} {order_id}'

    return Order(customer, RANGE_CHANNEL_ID, RANGE_BILLING_ID, items, notes)


def get_range_item_price(stock, item):
    for stock_item in stock:
        if stock_item['sku'] == item['sku']:
            return stock_item['cost_price']