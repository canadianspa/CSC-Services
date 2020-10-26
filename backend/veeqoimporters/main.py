import csv
import json
import io
import traceback
import xml.etree.ElementTree as ET

from .strategies.customer_strategy import customer_strategy
from .strategies.item_strategy import item_strategy
from .strategies.order_strategy import order_strategy

from common.api.veeqo import import_order
from .api.range_service import RangeService


def handle_import_request(orders):
    imported_orders = []
    for order in orders:
        imported_order = import_order(order)
        imported_orders.append(imported_order)

    return imported_orders


def handle_orders_request(vendor, request):
    try:
        if 'file' in request.files:
            file = request.files['file']
            file_type = file.filename.split('.')[-1]

            if file_type == "csv":
                return handle_csv_file(vendor, file)
            elif file_type == "txt":
                return handle_txt_file(vendor, file)
            elif file_type == "xml":
                return handle_xml_file(vendor, file)

        elif vendor == "range":
            return handle_range(vendor)

    except Exception as e:
        print("Error: " + str(e))
        print(traceback.format_exc())

    return None


################ HANDLE FILES / VENDORS ####################

def handle_csv_file(vendor, file):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.reader(stream)
    next(csv_input)

    order_list = handle_csv_input(vendor, csv_input)

    return class_to_json(order_list)


def handle_txt_file(vendor, file):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.reader(stream, delimiter="|")
    next(csv_input)

    order_list = handle_csv_input(vendor, csv_input)

    return class_to_json(order_list)


def handle_csv_input(vendor, csv_input):
    order_list = []

    for row in csv_input:
        if len(row) != 0:
            customer = customer_strategy(vendor, row)
            item = item_strategy(vendor, row)

            if len(order_list) > 0 and order_list[-1].deliver_to_attributes == customer:
                order_list[-1].line_items_attributes.append(item)

            else:
                items = [item]
                order = order_strategy(vendor, row, customer, items)
                order_list.append(order)

    return order_list


def handle_xml_file(vendor, file):
    stream = file.read()
    tree = ET.fromstring(stream)

    customer = customer_strategy(vendor, tree)
    items = item_strategy(vendor, tree)
    order = order_strategy(vendor, tree, customer, items)

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


def class_to_json(classes):
    json_string = json.dumps(classes, default=lambda o: o.__dict__)

    return json.loads(json_string)
