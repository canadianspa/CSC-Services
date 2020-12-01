import re
import dateutil.parser

def format_jtf_order(order):
    items = ['','','']
    for index, item in enumerate(order['line_items']):
        if index > 2:
            items[2] = items[2] + ' & ' + item['sellable']['product_title'].upper()
        else:
            items[index] = item['sellable']['product_title'].upper()    

    po_num = re.findall(r"\d{7}", order['customer_note']['text'])
    
    return [
        '',
        '',
        order['total_price'],
        order['number'],
        po_num[0] if len(po_num) > 0 else 'Missing PO number',
        '',
        '',
        '',
        dateutil.parser.parse(order['created_at']).strftime(r"%d/%m/%Y"),
        '',
        items[0],
        items[1],
        items[2],
        order['deliver_to']['first_name'].upper(),
        order['deliver_to']['last_name'].upper(),
        order['deliver_to']['zip'].upper(),
        order['deliver_to']['address1'].upper(),
        order['subtotal_price']
    ]
                