from ..vendors.bandq import bandq_csv_to_order
from ..vendors.argos import argos_csv_to_order
from ..vendors.range import range_json_to_order
from ..vendors.range_store import range_store_csv_to_order
from ..vendors.wayfair import wayfair_csv_to_order
from ..vendors.homebase import homebase_xml_to_order
from ..vendors.robert_dyas import robert_dyas_csv_to_order
from ..vendors.shop_direct import shop_direct_csv_to_order
from ..vendors.globus import globus_xml_to_order
from ..vendors.hornbach import hornbach_pdf_to_order
from ..vendors.robert_dyas_edge import robert_dyas_edge_csv_to_order


def order_strategy(vendor, data, customer, items):
    if vendor == "bandq":
        return bandq_csv_to_order(data, customer, items)
    elif vendor == "argos":
        return argos_csv_to_order(data, customer, items)
    elif vendor == "range":
        return range_json_to_order(data, customer, items)
    elif vendor == "range_store":
        return range_store_csv_to_order(data, customer, items)
    elif vendor == "wayfair":
        return wayfair_csv_to_order(data, customer, items)
    elif vendor == "homebase":
        return homebase_xml_to_order(data, customer, items)
    elif vendor == "robert_dyas":
        return robert_dyas_csv_to_order(data, customer, items)
    elif vendor == "shop_direct":
        return shop_direct_csv_to_order(data, customer, items)
    elif vendor == "globus":
        return globus_xml_to_order(data, customer, items)
    elif vendor == "hornbach":
        return hornbach_pdf_to_order(data, customer, items)
    elif vendor == "robert_dyas_edge":
        return robert_dyas_edge_csv_to_order(data, customer, items)
    else:
        raise ValueError(vendor)
