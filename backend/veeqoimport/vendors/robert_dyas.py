from common.config import ROBERT_DYAS_CHANNEL_ID, ROBERT_DYAS_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def robert_dyas_csv_to_customer(csv_row):
    parsed_name = csv_row[2].rsplit(" ", 1)

    first_name = parsed_name[0]
    last_name = parsed_name[1]
    address1 = csv_row[3]
    address2 = ""
    city = csv_row[5]
    county = ""
    postcode = csv_row[7]
    country = "GB"
    phone = csv_row[9]
    email = csv_row[10]

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


def robert_dyas_csv_to_item(csv_row):
    sku = csv_row[15]
    sellable_id = get_sellable_id(sku)
    quantity = csv_row[12]
    price_per_unit = csv_row[16]

    return Item(
        sellable_id,
        quantity,
        price_per_unit,
        TAX_RATE,
    )


def robert_dyas_csv_to_order(csv_row, customer, items):
    notes = csv_row[0]

    return Order(
        customer,
        ROBERT_DYAS_CHANNEL_ID,
        ROBERT_DYAS_BILLING_ID,
        items,
        notes,
    )
