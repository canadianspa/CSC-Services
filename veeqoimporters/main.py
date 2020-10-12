import csv
import json

from .strategies.customer_strategy import customer_strategy
from .strategies.item_strategy import item_strategy
from .strategies.order_strategy import order_strategy
from .api.postcoder import check_postcode


def convert_data_to_json(vendor, csv_input):
    order_list = []
    previous_customer = None

    for row in csv_input:
        customer = customer_strategy(vendor, row)
        item = item_strategy(vendor, row)

        if previous_customer is not None and previous_customer == customer:
            order_list[-1].line_items_attributes.append(item)

        else:
            previous_customer = customer
            items = [item]
            order = order_strategy(vendor, row, customer, items)

            order_list.append(order)

    json_string_order_list = json.dumps(
        order_list, default=lambda o: o.__dict__)
    return json.loads(json_string_order_list)


def handle_postcode_check(order):
    postcode = order.customer.postcode
    address1 = order.customer.address1

    address_array = check_postcode(postcode, address1)

    # If there is not one returned address, checks whole postcode
    if len(address_array) != 1:
        address_array = check_postcode(postcode, "")

    return address_array
