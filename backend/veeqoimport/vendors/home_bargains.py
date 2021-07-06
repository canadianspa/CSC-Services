import csv
import pathlib

from common.config import (
    HOME_BARGAINS_CHANNEL_ID,
    HOME_BARGAINS_BILLING_ID,
    TAX_RATE,
)

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id

file_path = pathlib.Path(__file__)

HOME_BARGAINS_STOCK_PATH = f"{file_path.parent}\\stock\\home_bargains_stock.csv"


def home_bargains_csv_to_customer(csv_row):
    first_name = csv_row[2]
    last_name = csv_row[3]
    address1 = csv_row[7]
    address2 = ""
    city = csv_row[9]
    county = csv_row[10]
    postcode = csv_row[11]
    country = "GB"
    phone = csv_row[5]
    email = csv_row[4]

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


def home_bargains_csv_to_item(csv_row):
    sku = csv_row[13]
    sellable_id = get_sellable_id(sku)
    price_per_unit = get_price(sku)
    quantity = csv_row[15]

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def home_bargains_csv_to_order(csv_row, customer, items):
    order_no = csv_row[0]

    notes = order_no + " " + customer.email

    return Order(
        customer,
        HOME_BARGAINS_CHANNEL_ID,
        HOME_BARGAINS_BILLING_ID,
        items,
        notes,
    )


def get_price(sku):
    with open(HOME_BARGAINS_STOCK_PATH) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")

        for row in csv_reader:
            if row[0] == sku:
                return row[1]

    raise Exception(f"Could not find {sku} in Argos stock")
