from ..config import TAX_RATE
from ..classes.item import Item
from ..api.veeqo import get_sellable_id


def item_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_item(data)
    elif vendor == "range":
        return range_json_to_item(data)
    elif vendor == "argos":
        return argos_csv_to_item(data)
    elif vendor == "homebase":
        return homebase_xml_to_item(data)


def bandq_csv_to_item(csv_row):
    sku = csv_row[29]
    sellable_id = get_sellable_id(sku)
    quantity = csv_row[31]
    price_per_unit = csv_row[35]

    return Item(sellable_id, quantity, price_per_unit, TAX_RATE)


def range_json_to_item(json):
    print('err')


def argos_csv_to_item(csv):
    print('err')


def homebase_xml_to_item(xml):
    print('err')
