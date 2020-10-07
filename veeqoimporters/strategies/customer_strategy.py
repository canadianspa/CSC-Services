from ..classes.item import Item
from ..classes.customer import Customer
from ..classes.order import Order


def customer_strategy(vendor, data):
    if vendor == "bandq":
        return bandq_csv_to_customer(data)
    elif vendor == "range":
        return range_json_to_customer(data)
    elif vendor == "argos":
        return argos_csv_to_customer(data)
    elif vendor == "homebase":
        return homebase_xml_to_customer(data)


def bandq_csv_to_customer(csv_row):
    first_name = csv_row[14].rsplit(' ', 1)[0]
    last_name = csv_row[14].split()[-1]
    address1 = csv_row[15]
    city = csv_row[16]
    postcode = csv_row[18]
    country = csv_row[17]

    return Customer(first_name, last_name, address1, "", city, "", postcode, country)


def range_json_to_customer(json):
    print('err')


def argos_csv_to_customer(csv):
    print('err')


def homebase_xml_to_customer(xml):
    print('err')
