from common.config import HOMEBASE_CHANNEL_ID, HOMEBA, TAX_RATE

from ..classes.customer import Customer
from ..classes.item import Item
from ..classes.order import Order
from ..api.veeqo import get_sellable_id


def homebase_xml_to_customer(xml):
    address_element = tree.find('.//Text[@function="GeneralInstructions"]')

    children_text = []
    for child in address_element:
        children_text.append(child.text)

    first_name, last_name
    if len(children_text) == 9:
	    first_name = children_text[2]
	    last_name = children_text[1]

    if len(children_text) == 8:
	    first_name = children_text[1]
	    last_name = children_text[2]
                    
	address1 = children_text[3]
    address2 = ""
	city = children_text[4]
	county = children_text[5]
	postcode = children_text[6]
    country = "GB"
	phone = children_text[7]
    email = ""
    
    return Customer(first_name, last_name, address1, address2, city, county, postcode, country, phone, email)


def homebase_xml_to_item(xml):
    print('HOMEBASE TODO')


def homebase_xml_to_order(xml, customer, items):
    print('HOMEBASE TODO')
