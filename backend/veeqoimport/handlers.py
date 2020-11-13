import csv
import io
import xml.etree.ElementTree as ET

from .strategies.customer_strategy import customer_strategy
from .strategies.item_strategy import item_strategy
from .strategies.order_strategy import order_strategy

from common.utils import class_to_json, extract_pages
from .api.range_service import RangeService


def handle_limited_input(vendor, file, delimiter):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    delimited_input = csv.reader(stream, delimiter=delimiter)
    # Remove header row
    next(delimited_input)

    order_list = []

    for row in delimited_input:
        if len(row) != 0:
            customer = customer_strategy(vendor, row)
            item = item_strategy(vendor, row)

            if len(order_list) > 0 and order_list[-1].deliver_to_attributes == customer:
                order_list[-1].line_items_attributes.append(item)

            else:
                items = [item]
                order = order_strategy(vendor, row, customer, items)
                order_list.append(order)

    return class_to_json(order_list)


def handle_xml_file(vendor, file):
    tree = ET.fromstring(file.read())

    customer = customer_strategy(vendor, tree)
    items = item_strategy(vendor, tree)
    order = order_strategy(vendor, tree, customer, items)

    orders = [order]

    return class_to_json(orders)


def handle_pdf_file(vendor, file):
    pdf_pages = extract_pages(file.stream)

    customer = customer_strategy(vendor, pdf_pages)
    items = item_strategy(vendor, pdf_pages)
    order = order_strategy(vendor, pdf_pages, customer, items)

    orders = [order]

    return class_to_json(orders)


def handle_range(vendor):
    range_service = RangeService()
    orders = range_service.get_orders()
    stock = range_service.get_stock()

    order_list = []

    for order in orders:
        # Adding stock to order for item_strategy
        order['stock'] = stock

        customer = customer_strategy(vendor, order)
        items = item_strategy(vendor, order)
        order = order_strategy(vendor, order, customer, items)

        order_list.append(order)

    return class_to_json(order_list)
