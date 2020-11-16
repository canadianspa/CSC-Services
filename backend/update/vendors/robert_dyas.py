import re
import dateutil.parser

def format_robert_dyas_order(order):
    items = ['','','']
    for index, item in enumerate(order['line_items']):
        if index > 2:
            items[2] = items[2] + ' & ' + item['sellable']['product_title'].upper()
        else:
            items[index] = item['sellable']['product_title'].upper()  

    po_num = re.findall(r"^[A-Z]\d{10}", order['customer_note']['text'])
    
    return [
        '',
        '',
        '',
        '',
        po_num[0] if len(po_num) > 0 else 'Missing PO number',
        order['number'],
        '',
        '',
        '',
        dateutil.parser.parse(order['created_at']).strftime(r"%d/%m/%yyyy"),
        '',
        items[0],
        items[1],
        items[2],
        order['deliver_to']['first_name'].upper(),
        order['deliver_to']['last_name'].upper(),
        order['deliver_to']['zip'].upper(),
        order['deliver_to']['address1'].upper(),
        '38091',
        order['subtotal_price'],
    ]
                