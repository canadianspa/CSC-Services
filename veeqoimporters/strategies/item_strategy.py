from ..vendors.bandq import bandq_csv_to_item
from ..vendors.argos import argos_csv_to_item
from ..vendors.range import range_json_to_item

def item_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_item(data)
    elif vendor == "argos":
        return argos_csv_to_item(data)
    elif vendor == "range":
        return range_json_to_item(data)
    elif vendor == "homebase":
        return homebase_xml_to_item(data)
        
    raise Exception("Invalid vendor.")


def homebase_xml_to_item(xml):
    print('err')
