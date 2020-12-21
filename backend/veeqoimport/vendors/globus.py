from common.config import CSC_GMBH_CHANNEL_ID, GLOBUS_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def globus_xml_to_customer(xml):
    address = xml.find('.//Entity[@function="EndCustomer"]')

    first_name = ""
    last_name = address.find('.//AddressLine[@function="Name"]').text
    address1 = address.findall('.//AddressLine')[1].text
    address2 = ""
    city = address.find('.//AddressLine[@function="City"]').text
    county = ""
    postcode = address.find('.//AddressLine[@function="PostalCode"]').text
    country = address.find('.//ISOCountry"')
    phone = "Add Phone"
    email = ""

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def globus_xml_to_items(xml):
    items = []
    products = xml.findall('.//Product[@xrefMode="Target"]')

    for product in products:
        sku = product.find('.//Identifier[@function="ProductCode"]').text
        sellable_id = get_sellable_id(sku)

        quantity = 1
        price_per_unit = product.find('.//Value').text

        item = Item(sellable_id, quantity, price_per_unit, TAX_RATE)
        items.append(item)

    return items


def globus_xml_to_order(xml, customer, items):
    order_number = xml.find('.//Reference[@function="OrderNumber"]').text
    account_code = xml.find('.//Identifier[@function="AccountCode"]').text

    notes = order_number + " " + account_code

    return Order(customer, CSC_GMBH_CHANNEL_ID, GLOBUS_BILLING_ID, items, notes)
