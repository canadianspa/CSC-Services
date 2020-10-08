from ..config import BANDQ_CHANNEL_ID, ARGOS_CHANNEL_ID, RANGE_CHANNEL_ID, HOMEBASE_CHANNEL_ID
from ..classes.order import Order


def order_strategy(vendor, data, customer, items):
    if vendor == "bandq":
        return bandq_csv_to_order(data, customer, items)
    elif vendor == "range":
        return range_json_to_order(data, customer, items)
    elif vendor == "argos":
        return argos_csv_to_order(data, customer, items)
    elif vendor == "homebase":
        return homebase_xml_to_order(data, customer, items)


def bandq_csv_to_order(csv_row, customer, items):
    billing_id = get_billing_id(csv_row[8])
    order_no = csv_row[0]
    sales_order_no = csv_row[23]
    site_code = csv_row[13]
    notes = order_no + " " + sales_order_no + " " + site_code

    return Order(customer, BANDQ_CHANNEL_ID, billing_id, items, notes)


def get_billing_id(billing_name):
    if billing_name == "B&Q Limited":
        return "23657440"
    if billing_name == "B&Q Ireland Ltd":
        return "23677719"
    if billing_name == "B&Q (Retail) Jersey Ltd":
        return "23677785"
    if billing_name == "B&Q (Retail) Guernsey Ltd":
        return "23677822"

    raise Exception("Invalid billing name.")


def range_json_to_order(json, customer, items):
    print('err')


def argos_csv_to_order(csv, customer, items):
    print('err')


def homebase_xml_to_order(xml, customer, items):
    print('err')
