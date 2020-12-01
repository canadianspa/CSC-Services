import re
import dateutil.parser

def format_bandq_order(order):
    items = ['','','']
    for index, item in enumerate(order['line_items']):
        if index > 2:
            items[2] = items[2] + ' & ' + item['sellable']['product_title'].upper()
        else:
            items[index] = item['sellable']['product_title'].upper()
        
    po_nums1 = re.findall(r"\d{9}", order['customer_note']['text'])
    po_nums2 = re.findall(r"\d{4}", order['customer_note']['text'])
        
    return [
        '',
        '',
        order['total_price'],
        order['number'],
        po_nums1[0] if len(po_nums1) > 0 else 'Missing PO number',
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
        po_nums2[0] if len(po_nums2) > 0 else 'Missing PO number',
        order['subtotal_price']
    ]
                