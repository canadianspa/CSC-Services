import csv
import json
import io
import xml.etree.ElementTree as ET

from .strategies.customer_strategy import customer_strategy
from .strategies.item_strategy import item_strategy
from .strategies.order_strategy import order_strategy

from .api.veeqo import upload_order
from .api.postcoder import check_postcode
from .api.range_api import get_range_orders, get_range_stock


def handle_import_request(orders):
    for order in orders:
        upload_order(order)

    response = { "status": "Uploaded " + str(len(orders)) + "orders"}

    return response


def handle_postcoder_request(query):
    return check_postcode(query)


def handle_orders_request(vendor, request):
    if 'file' in request.files:
        file = request.files['file']
        file_type = file.filename.split('.')[-1]

        if file_type == "csv":
            return handle_csv_file(vendor, file)
        
        elif file_type == "xml":
            return handle_xml_file(vendor, file)
        
    elif vendor == "range":
        return handle_range(vendor)
        
    else:
        return "No file supplied or incorrect vendor.", 400


################ HANDLE FILES / VENDORS ####################

def handle_csv_file(vendor, file):
    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.reader(stream)
    next(csv_input)
    
    order_list = []

    for row in csv_input:
        customer = customer_strategy(vendor, row)
        item = item_strategy(vendor, row)

        if len(order_list) > 0 and order_list[-1].deliver_to_attributes == customer:
            order_list[-1].line_items_attributes.append(item)

        else:
            items = [item]
            order = order_strategy(vendor, row, customer, items)
            order_list.append(order)

    return classes_to_json(order_list)


def handle_xml_file(vendor, file):
    stream = file.read()
    tree = ET.fromstring(stream)
    
    customer = customer_strategy(vendor, tree)
    items = item_strategy(vendor, tree)
    order = order_strategy(vendor, tree, customer, items)

    orders = [order]

    return classes_to_json(orders)   


def handle_range(vendor):
    orders = get_range_orders()
    stock = get_range_stock()
    
    order_list = []

    for order in orders:
        #Adding stock to order for item_strategy
        order['stock'] = stock

        customer = customer_strategy(vendor, order)
        items = item_strategy(vendor, order)
        order = order_strategy(vendor, order, customer, items)

        order_list.append(order)

    return classes_to_json(order_list)


def classes_to_json(classes):
    json_string = json.dumps(classes, default=lambda o: o.__dict__)

    return json.loads(json_string)
