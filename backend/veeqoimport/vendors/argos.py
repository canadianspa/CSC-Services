import csv
import pathlib

from common.config import (
    ARGOS_CHANNEL_ID,
    ARGOS_BILLING_ID,
    TAX_RATE,
)

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id

file_path = pathlib.Path(__file__)

ARGOS_STOCK_PATH = f"{file_path.parent}\\stock\\argos_stock.csv"

def argos_csv_to_customer(csv_row):
    # Reverse split
    parsed_name = csv_row[70].rsplit(" ", 1)

    first_name = parsed_name[0]
    last_name = parsed_name[1]
    address1 = csv_row[13]
    address2 = ""
    city = csv_row[14]
    county = csv_row[15]
    postcode = csv_row[20]
    country = csv_row[24]
    phone = csv_row[26]
    email = csv_row[9]

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


def argos_csv_to_item(csv_row):
    sku = csv_row[42]
    sellable_id = get_sellable_id(sku)
    price_per_unit = get_price(sku)
    quantity = csv_row[47]

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def argos_csv_to_order(csv_row, customer, items):
    order_no = csv_row[0]
    order_ref = csv_row[56]
    customer_sku = csv_row[63]

    notes = order_no + " " + order_ref + " " + customer_sku + " " + customer.email

    return Order(
        customer,
        ARGOS_CHANNEL_ID,
        ARGOS_BILLING_ID,
        items,
        notes,
    )


def get_price(sku):
    with open(ARGOS_STOCK_PATH) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        next(csv_reader)

        for row in csv_reader:
            if row[1] == sku:
                return row[4]

    raise Exception(f"Could not find {sku} in Argos stock")
