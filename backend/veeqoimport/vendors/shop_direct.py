from common.config import SHOP_DIRECT_CHANNEL_ID, SHOP_DIRECT_BILLING_ID, TAX_RATE

from common.api.veeqo import get_sellable_id
from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order


def shop_direct_csv_to_customer(csv_row):
    # Reverse split 
    parsed_name = csv_row[2].rsplit(' ', 1)

    first_name = parsed_name[0]
    last_name = parsed_name[1]
    address1 = csv_row[3]
    address2 = ""
    city = csv_row[5]
    county = csv_row[6]
    postcode = csv_row[7]
    country = "GB"
    phone = csv_row[9]
    email = csv_row[25]

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def shop_direct_csv_to_item(csv_row):
    sku = csv_row[27]
    sellable_id = get_sellable_id(sku)
    quantity = csv_row[24]
    price_per_unit = "0"

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def shop_direct_csv_to_order(csv_row, customer, items):
    notes = csv_row[0] + " " + csv_row[8]

    return Order(customer, SHOP_DIRECT_CHANNEL_ID, SHOP_DIRECT_BILLING_ID, items, notes)
