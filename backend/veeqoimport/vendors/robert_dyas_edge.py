from common.config import (
    ROBERT_DYAS_CHANNEL_ID,
    ROBERT_DYAS_BILLING_ID,
    TAX_RATE,
)

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def robert_dyas_edge_csv_to_customer(csv_row):
    # Reverse split
    parsed_name = csv_row[32].rsplit(" ", 1)

    first_name = parsed_name[0]
    last_name = parsed_name[1]
    address1 = csv_row[33]
    address2 = ""
    city = csv_row[35]
    county = ""
    postcode = csv_row[36]
    country = csv_row[37]
    phone = csv_row[38]
    email = csv_row[39]

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


def robert_dyas_edge_csv_to_item(csv_row):
    sku = csv_row[11]
    sellable_id = get_sellable_id(sku)
    price_per_unit = csv_row[24]
    quantity = csv_row[12]

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def robert_dyas_edge_csv_to_order(csv_row, customer, items):
    order_no = csv_row[0]
    customer_sku = csv_row[8]

    notes = order_no + " " + customer_sku + " " + customer.email

    return Order(
        customer,
        ROBERT_DYAS_CHANNEL_ID,
        ROBERT_DYAS_BILLING_ID,
        items,
        notes,
    )
