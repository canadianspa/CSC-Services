import re

from common.config import (
    RANGE_CHANNEL_ID,
    RANGE_BILLING_ID,
    TAX_RATE,
    UK_POSTCODE_REGEX,
)

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def range_store_csv_to_customer(csv_row):
    address = csv_row[5].splitlines()

    first_name = ""
    last_name = address[0]
    address1 = address[1]
    address2 = address[2]
    city = ""
    county = ""
    postcode = ""
    country = ""
    phone = ""
    email = ""

    for index, line in enumerate(address):
        if "Tel:" in line:
            phone = line.replace("Tel:", "")
        if re.findall(UK_POSTCODE_REGEX, line):
            city = address[index - 1]
            postcode = line

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


def range_store_csv_to_item(csv_row):
    sku = csv_row[6]
    sellable_id = get_sellable_id(sku)

    quantity = csv_row[12]
    net_cost_price = csv_row[16].replace(",", "")

    price_per_unit = str(
        float(net_cost_price) / float(quantity),
    )

    return Item(
        sellable_id,
        quantity,
        price_per_unit,
        TAX_RATE,
    )


def range_store_csv_to_order(csv_row, customer, items):
    order_no = csv_row[6]
    address = csv_row[5].splitlines()

    notes = "Order Number: " + order_no + " " + address[-1]

    return Order(
        customer,
        RANGE_CHANNEL_ID,
        RANGE_BILLING_ID,
        items,
        notes,
    )
