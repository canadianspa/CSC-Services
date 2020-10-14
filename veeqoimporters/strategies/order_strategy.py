from ..vendors.bandq import bandq_csv_to_order
from ..vendors.argos import argos_csv_to_order
from ..vendors.range import range_json_to_order

def order_strategy(vendor, data, customer, items):
    if vendor == "bandq":
        return bandq_csv_to_order(data, customer, items)
    elif vendor == "argos":
        return argos_csv_to_order(data, customer, items)
    elif vendor == "range":
        return range_json_to_order(data, customer, items)
    elif vendor == "homebase":
        return homebase_xml_to_order(data, customer, items)
        
    raise Exception("Invalid vendor.")


def homebase_xml_to_order(xml, customer, items):
    print('err')
