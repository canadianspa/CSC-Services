from ..vendors.bandq import bandq_csv_to_customer
from ..vendors.argos import argos_csv_to_customer
from ..vendors.range import range_json_to_customer
from ..vendors.range_store import range_store_csv_to_customer
from ..vendors.wayfair import wayfair_csv_to_customer
from ..vendors.homebase import homebase_xml_to_customer
from ..vendors.robert_dyas import robert_dyas_csv_to_customer
from ..vendors.shop_direct import shop_direct_csv_to_customer
from ..vendors.globus import globus_xml_to_customer
from ..vendors.hornbach import hornbach_pdf_to_customer
from ..vendors.robert_dyas_edge import robert_dyas_edge_csv_to_customer
from ..vendors.home_bargains import home_bargains_csv_to_customer


def customer_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_customer(data)
    elif vendor == "argos":
        return argos_csv_to_customer(data)
    elif vendor == "range":
        return range_json_to_customer(data)
    elif vendor == "range_store":
        return range_store_csv_to_customer(data)
    elif vendor == "wayfair":
        return wayfair_csv_to_customer(data)
    elif vendor == "homebase":
        return homebase_xml_to_customer(data)
    elif vendor == "robert_dyas":
        return robert_dyas_csv_to_customer(data)
    elif vendor == "shop_direct":
        return shop_direct_csv_to_customer(data)
    elif vendor == "globus":
        return globus_xml_to_customer(data)
    elif vendor == "hornbach":
        return hornbach_pdf_to_customer(data)
    elif vendor == "robert_dyas_edge":
        return robert_dyas_edge_csv_to_customer(data)
    elif vendor == "home_bargains":
        return home_bargains_csv_to_customer(data)
    else:
        raise ValueError(vendor)
