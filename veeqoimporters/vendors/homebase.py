from common.config import HOMEBASE_CHANNEL_ID, HOMEBASE_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from ..api.veeqo import get_sellable_id


def homebase_xml_to_customer(xml):
    address_element = xml.find('.//Text[@function="GeneralInstructions"]')

    child_content = []
    for child_element in address_element:
        child_content.append(child_element.text)

    first_name = ""
    last_name = ""

    if len(child_content) == 9:
        first_name = child_content[2]
        last_name = child_content[1]
    if len(child_content) == 8:
        first_name = child_content[1]
        last_name = child_content[2]

    address1 = child_content[3]
    address2 = ""
    city = child_content[4]
    county = child_content[5]
    postcode = child_content[6]
    country = "GB"
    phone = child_content[7]
    email = ""
    
    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def homebase_xml_to_items(xml):
    items = []
    products_element = xml.findall('.//Product[@xrefMode="Target"]')

    for product_element in products_element:
        sku_element = product_element.find('.//Identifier[@function="ProductCode"][@owner="Company"]')
        sku = sku_element.text
        sellable_id = get_sellable_id(sku)

        quantity_element = product_element.find('.//UnitQuantity')
        quantity = quantity_element.text

        price_element = product_element.find('.//Value')
        price_per_unit = price_element.text

        item = Item(sellable_id, quantity, price_per_unit, TAX_RATE)
        items.append(item)
    
    return items


def homebase_xml_to_order(xml, customer, items):
    references_element = xml.findall('.//Reference[@function="OrderNumber"]')

    csc_order_no = ""
    homebase_order_no = ""

    for ref_element in references_element:
        if ref_element.attrib["owner"] == "Company":
            csc_order_no = ref_element.text
        if ref_element.attrib["owner"] == "Partner":
            homebase_order_no = ref_element.text

    store_ref_parent = xml.find('.//Entity[@function="ShipTo"]')
    store_ref_element = store_ref_parent.find('.//Identifier')
    store_ref = store_ref_element.text

    notes = csc_order_no + " " + homebase_order_no + " " + store_ref

    return Order(customer, HOMEBASE_CHANNEL_ID, HOMEBASE_BILLING_ID, items, notes)
