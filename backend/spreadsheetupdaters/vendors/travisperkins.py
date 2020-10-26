import re
import dateutil.parser

def format_travisperkins_order(order):
    items = ""
    for sellable in order['line_items']:
        items += sellable['sellable']['product_title'].upper() + " "  

    po_num = re.findall(r"\d{9}", order['customer_note']['text'])
                    
    return [
        order['total_price'],
        '',
        '',
        po_num[0] if len(po_num) > 0 else 'Missing PO number',
        order['number'],
        dateutil.parser.parse(order['created_at']).strftime(r"%d/%m/%y"),
        '',
        '',
        order['deliver_to']['first_name'].upper(),
        order['deliver_to']['last_name'].upper(),
        order['deliver_to']['address1'].upper(),
        order['deliver_to']['zip'].upper(),
        '',
        '',
        items,
        '',
        order['subtotal_price']
    ]
                