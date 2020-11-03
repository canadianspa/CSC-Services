from ..vendors.bandq import bandq_csv_to_item
from ..vendors.argos import argos_csv_to_item
from ..vendors.range import range_json_to_items
from ..vendors.wayfair import wayfair_csv_to_item
from ..vendors.homebase import homebase_xml_to_items
from ..vendors.robert_dyas import robert_dyas_csv_to_item
from ..vendors.shop_direct import shop_direct_csv_to_item
from ..vendors.globus import globus_xml_to_items
from ..vendors.hornbach import hornbach_pdf_to_items


def item_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_item(data)
    elif vendor == "argos":
        return argos_csv_to_item(data)
    elif vendor == "range":
        return range_json_to_items(data)
    elif vendor == "wayfair":
        return wayfair_csv_to_item(data)
    elif vendor == "homebase":
        return homebase_xml_to_items(data)
    elif vendor == "robert_dyas":
        return robert_dyas_csv_to_item(data)
    elif vendor == "shop_direct":
        return shop_direct_csv_to_item(data)
    elif vendor == "globus":
        return globus_xml_to_items(data)
    elif vendor == "hornbach":
        return hornbach_pdf_to_items(data)
    else:
        raise ValueError(vendor)
