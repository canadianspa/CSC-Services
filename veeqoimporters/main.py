import csv
import json
import io

from .strategies.customer_strategy import customer_strategy
from .strategies.item_strategy import item_strategy
from .strategies.order_strategy import order_strategy
from .api.postcoder import check_postcode
from .api.range_api import get_range_orders, get_range_stock
from .vendors.range import get_range_item_price


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
    return "HANDLE XML TODO"


def handle_range(vendor):
    #orders = get_range_orders()
    stock = get_range_stock()

    orders = json.loads("""[{"page_id":null,"PRODUCTION":"true","order_details":{"order_id":11848471,"order_disp":"TESTING IGNORE","order_placed_date":"2020-10-13 01:46:10","delivery_services":"UKmail \/ XDP \/ Prestige \/ DX","customer_name":"TESTING JASPER","email":"jasper.haward@canadianspacompany.com","telephone":"07799112492","building_name_number":"10","organisation":"","street":"Priory Drive","town":"Reigate","county":"null","country":"United Kingdom","postcode":"RH2 8AF","authorised":1},"item_arr":[{"id":30813121,"despatch_date":"2020-10-13 11:21:38","tracking_reference":"41431530027430 ","quantity":1,"status":"F","title":"Hot Tub Waterproof Playing Cards","sku":315890,"delivery_service":"UKmail \/ XDP \/ Prestige \/ DX","supplier_ref":"KA-10035","earliest_delivery":"2020-10-14","latest_delivery":"2020-10-16","courier_name":"UK MAIL","replace_note":null}]}]""")
    
    order_list = []

    for order in orders:
        customer = customer_strategy(vendor, order)

        items = []
        for item in order['item_arr']:
            item_price = get_range_item_price(stock, item)
            item['price_per_unit'] = item_price

            item = item_strategy(vendor, item)
            items.append(item)
        
        order = order_strategy(vendor, order, customer, items)
        order_list.append(order)

    json_string_order_list = json.dumps(
        order_list, default=lambda o: o.__dict__)

    return json.loads(json_string_order_list)


# FOR CHECKING PROPERTIES IN CLASS
# attrs = vars(class)
# print(', '.join("%s: %s" % item for item in attrs.items()))
