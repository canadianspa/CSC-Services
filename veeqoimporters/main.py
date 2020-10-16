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
from .vendors.range import get_range_item_price


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


def handle_xml_file(vendor, file):
    stream = file.read()
    tree = ET.fromstring(stream)
    

    for element in address_element:
        print(element.text)


    return []


def handle_range(vendor):
    orders = get_range_orders()
    stock = get_range_stock()
    
    order_list = []

    for order in orders:
        customer = customer_strategy(vendor, order)

        items = []
        for item in order['item_arr']:
            item['price_per_unit'] = get_range_item_price(stock, item)

            item = item_strategy(vendor, item)
            items.append(item)
        
        order = order_strategy(vendor, order, customer, items)
        order_list.append(order)

    json_string_order_list = json.dumps(
        order_list, default=lambda o: o.__dict__)

    return json.loads(json_string_order_list)
