from common.config import RANGE_CHANNEL_ID, RANGE_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def range_json_to_customer(json):
    order_details = json["order_details"]

    # Reverse split
    parsed_name = order_details["customer_name"].rsplit(" ", 1)

    first_name = parsed_name[0]
    last_name = parsed_name[1]
    address1 = order_details["building_name_number"] + " " + order_details["street"]
    address2 = ""
    city = order_details["town"]
    county = ""
    postcode = order_details["postcode"]
    country = order_details["country"]
    phone = order_details["telephone"]
    email = order_details["email"]

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


def range_json_to_items(json):
    stock = json["stock"]
    items = []

    for item_json in json["item_arr"]:
        sku = item_json["supplier_ref"]
        sellable_id = get_sellable_id(sku)
        price_per_unit = get_range_item_price(stock, item_json)
        quantity = item_json["quantity"]

        items.append(
            Item(
                sellable_id,
                quantity,
                price_per_unit,
                TAX_RATE,
            )
        )

    return items


def range_json_to_order(json, customer, items):
    order_details = json["order_details"]

    order_disp = order_details["order_disp"]
    order_id = order_details["order_id"]

    notes = order_disp + " " + str(order_id) + " " + customer.email

    return Order(
        customer,
        RANGE_CHANNEL_ID,
        RANGE_BILLING_ID,
        items,
        notes,
    )


def get_range_item_price(stock, item):
    for stock_item in stock:
        if stock_item["sku"] == item["sku"]:
            return stock_item["cost_price"]
