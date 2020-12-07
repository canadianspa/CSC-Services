import re
import dateutil.parser


def format_homebase_order(order):
    items = ['', '', '']
    for index, item in enumerate(order['line_items']):
        if index > 2:
            items[2] = items[2] + ' & ' + \
                item['sellable']['product_title'].upper()
        else:
            items[index] = item['sellable']['product_title'].upper()

    po_num = re.findall(r"4\d{9}", order['customer_note']['text'])

    return [
        '',
        dateutil.parser.parse(order['created_at']).strftime(r"%d/%m/%Y"),
        '',
        '',
        '',
        order['number'],
        po_num[0] if len(po_num) > 0 else 'Missing PO number',
        '',
        '',
        order['total_price'],
        items[0],
        items[1],
        items[2],
        order['deliver_to']['first_name'].upper(),
        order['deliver_to']['last_name'].upper(),
        order['deliver_to']['zip'].upper(),
    ]
