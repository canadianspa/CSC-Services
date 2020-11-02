from common.config import CSC_GMBH_CHANNEL_ID ,GLOBUS_BILLING_ID, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from common.api.veeqo import get_sellable_id


def globus_xml_to_customer(xml):
    details_element = xml.find('.//Details[@function="ScheduleLines"]')
    address_elements = details_element.findall('.//AddressLine')
    country_element = details_element.find('.//ISOCountry')

    first_name = ""
    last_name = ""

    first_name = address_elements[0].text + ' ' + address_elements[1].text
    last_name = address_elements[2].text

    address1 = address_elements[3].text
    address2 = ""
    city = address_elements[4].text
    county = ""
    postcode = address_elements[5].text
    country = country_element.text
    phone = "xxxxx"
    email = ""

    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def globus_xml_to_items(xml):
    items = []
    products_element = xml.findall('.//Product[@xrefMode="Target"]')

    for product_element in products_element:
        sku_element = product_element.find(
            './/Identifier[@function="ProductCode"][@owner="Company"]')
        sku = sku_element.text
        sellable_id = get_sellable_id(sku)

        #quantity_element = product_element.find('.//UnitQuantity')
        #quantity = quantity_element.text
        quantity = 1

        price_element = product_element.find('.//Value')
        price_per_unit = price_element.text

        item = Item(sellable_id, quantity, price_per_unit, TAX_RATE)
        items.append(item)

    return items


def globus_xml_to_order(xml, customer, items):
    references_element = xml.find('.//Reference[@function="OrderNumber"]')
    globus_order_number = references_element.text

    identifier_element = xml.find('.//Identifier[@function="AccountCode"]')
    account_code = identifier_element.text

    notes = globus_order_number + " " + account_code

    return Order(customer, CSC_GMBH_CHANNEL_ID, GLOBUS_BILLING_ID, items, notes)
