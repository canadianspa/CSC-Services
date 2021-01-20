import re

from common.config import TAX_RATE, WAYFAIR_BILLING_ID, WAYFAIR_CHANNEL_ID
from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def wayfair_csv_to_customer(csv_row):
    first_name = csv_row[14].rsplit(" ", 1)[0]
    last_name = csv_row[14].split()[-1]
    address1 = csv_row[15]
    address2 = ""
    city = csv_row[17]
    county = ""
    postcode = csv_row[19]
    country = csv_row[38]
    phone = csv_row[20]
    email = ""

    return Customer(
        first_name,
        last_name,
        address1,
        address2,
        city,
        county,
        postcode,
        country,
        phone,
        email,
    )


def wayfair_csv_to_item(csv_row):
    # Remove ="#sku#" formatting around sku
    sku = re.findall(r"K[A-Z]-\d{5}", csv_row[7])[0]
    sellable_id = get_sellable_id(sku)
    quantity = csv_row[9]
    price_per_unit = csv_row[10]

    return Item(
        sellable_id,
        quantity,
        price_per_unit,
        TAX_RATE,
    )


def wayfair_csv_to_order(csv_row, customer, items):
    order_no = csv_row[2]
    notes = order_no + " " + customer.email

    return Order(
        customer,
        WAYFAIR_CHANNEL_ID,
        WAYFAIR_BILLING_ID,
        items,
        notes,
    )
