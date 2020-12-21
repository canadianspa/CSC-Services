from common.config import HOMEBASE_CHANNEL_ID, HOMEBASE_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def homebase_xml_to_customer(xml):
    address_element = xml.find('.//Text[@function="GeneralInstructions"]')

    child_content = []
    for child_element in address_element:
        child_content.append(child_element.text)

    first_name = ""
    last_name = ""

    if len(child_content) == 9:
        first_name = child_content[1]
        last_name = child_content[2]
    if len(child_content) == 8:
        first_name = child_content[2]
        last_name = child_content[1]

    address1 = child_content[3]
    address2 = ""
    city = child_content[4]
    county = ""
    postcode = child_content[6]
    country = "GB"
    phone = child_content[7]
    email = ""

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def homebase_xml_to_items(xml):
    items = []
    products = xml.findall('.//Product[@xrefMode="Target"]')

    for product in products:
        sku = product.find(
            './/Identifier[@function="ProductCode"][@owner="Company"]').text
        sellable_id = get_sellable_id(sku)

        quantity = product.find('.//UnitQuantity').text
        price_per_unit = product.find('.//Value').text

        item = Item(sellable_id, quantity, price_per_unit, TAX_RATE)
        items.append(item)

    return items


def homebase_xml_to_order(xml, customer, items):
    csc_order_no = xml.find(
        './/Reference[@function="OrderNumber"][@owner="Company"]').text
    homebase_order_no = xml.find(
        './/Reference[@function="OrderNumber"][@owner="Partner"]').text

    store_ref_parent = xml.find(
        './/Entity[@function="ShipTo"][@xrefMode="Target"]')
    store_ref = store_ref_parent.find(
        './/Identifier[@function="AccountCode"]').text

    notes = csc_order_no + " " + homebase_order_no + \
        " " + store_ref + " " + customer.email

    return Order(customer, HOMEBASE_CHANNEL_ID, HOMEBASE_BILLING_ID, items, notes)
