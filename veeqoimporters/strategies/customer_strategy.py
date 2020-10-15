from ..vendors.bandq import bandq_csv_to_customer
from ..vendors.argos import argos_csv_to_customer
from ..vendors.range import range_json_to_customer
from ..vendors.wayfair import wayfair_csv_to_customer
from ..vendors.homebase import homebase_xml_to_customer

def customer_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_customer(data)
    elif vendor == "argos":
        return argos_csv_to_customer(data)
    elif vendor == "range":
        return range_json_to_customer(data)
    elif vendor == "wayfair":
        return wayfair_csv_to_customer(data)
    elif vendor == "homebase":
        return homebase_xml_to_customer(data)

    raise Exception("Invalid vendor.")
